import { GoogleGenerativeAI } from "@google/generative-ai";
import cloudinary from "../lib/cloudinary.js";
import User from "../models/User.js";
import Message from '../models/Message.js'
import { io, userSocketMap } from "../server.js"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const AI_USER_ID = "689d621b7287ac7ffb781ac3";

// Get all Users except Logged in user
export const getUsersForSidebar = async (req, res) => {

    try {

        const userId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password").lean();

        // Count number of unseen Messages
        const unseenMessages = {}

        const usersWithLastMsg = await Promise.all(
            filteredUsers.map(async (user) => {
                const messages = await Message.find({
                    senderId: user._id,
                    recieverId: userId,
                    seen: false
                });

                if (messages.length > 0) {
                    unseenMessages[user._id] = messages.length;
                }

                const lastMessage = await Message.findOne({
                    $or: [
                        { senderId: user._id, recieverId: userId },
                        { senderId: userId, recieverId: user._id }
                    ]
                }).sort({ createdAt: -1 });

                return {
                    ...user,
                    lastMessage: lastMessage ? lastMessage.text : null,
                    lastMessageImage: lastMessage ? lastMessage.image : null,
                    lastMessageDate: lastMessage ? lastMessage.createdAt : null
                };
            })
        );

        res.json({ success: true, users: usersWithLastMsg, unseenMessages })

    }

    catch (error) {

        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}

// Get all messages for selected users
export const getMessages = async (req, res) => {

    try {

        const { id: selectedUserId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            
            $or: [
                {senderId: myId, recieverId: selectedUserId},
                {senderId: selectedUserId, recieverId: myId},
            ]

        })

        await Message.updateMany({ senderId: selectedUserId, recieverId: myId }, { seen: true })

        res.json({ success: true, messages })

    }
    catch (error) {

        console.log(error.message);
        res.json({ success: false, message: error.message })

    }

}

// Mark message as seen using message id
export const markMessageAsSeen = async (req, res) => {
    
    try {

        const { id } = req.params;
        await Message.findByIdAndUpdate(id, {seen: true})

        res.json({ success: true })

    }
    catch (error) {

        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}

// Send Message to selected user
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const recieverId = req.params.id;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        // Create and send user's message immediately
        const newMessage = await Message.create({
            senderId,
            recieverId,
            text,
            image: imageUrl
        });

        const recieverSocketId = userSocketMap[recieverId];
        const senderSocketId = userSocketMap[senderId];

        if (recieverSocketId) io.to(recieverSocketId).emit("newMessage", newMessage);
        if (senderSocketId) io.to(senderSocketId).emit("newMessage", newMessage);

        // Respond immediately to client
        res.json({ success: true, newMessage });

        // Process AI reply in background
        if (recieverId === AI_USER_ID) {
            setTimeout(async () => {
                try {
                    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                    const result = await model.generateContent(text || "Hello");
                    const aiReply = result.response.text();

                    const aiMessage = await Message.create({
                        senderId: AI_USER_ID,
                        recieverId: senderId,
                        text: aiReply,
                        createdAt: new Date(Date.now() + 1000)
                    });

                    if (senderSocketId) io.to(senderSocketId).emit("newMessage", aiMessage);
                } catch (err) {
                    console.error("AI reply error:", err.message);
                }
            }, 0);
        }

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};