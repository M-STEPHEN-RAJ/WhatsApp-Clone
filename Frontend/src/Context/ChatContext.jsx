import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const [messages, setMessages] = useState([]); 
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const {socket, axios} = useContext(AuthContext);

    // Get all users
    const getUsers = useCallback(async () => {
        try {
            const { data } = await axios.get("/api/messages/users");

            if (data.success) {
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages);
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    }, [axios]);

    // get selected user messages
    const getMessages = async (userId) => {
        try {
            const { data } = await axios.get(`/api/messages/${userId}`);

            if (data.success) {
                setMessages(Array.isArray(data.messages) ? data.messages : []);
            }
            
        } catch (error) {
            toast.error(error.message);            
        }

    }

    // send message to selected user
    const sendMessage = async (messageData) => {
        try {
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);

            if (data.success) {
                setMessages((prevMessages) => [...prevMessages, data.newMessage]);
            }
            else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);            
        }
    }
    
    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                newMessage.seen = true;
                setMessages(prev => [...prev, newMessage]);
                axios.put(`/api/messages/mark/${newMessage._id}`);
            } else {
                setUnseenMessages(prev => ({
                    ...prev,
                    [newMessage.senderId]: (prev[newMessage.senderId] || 0) + 1
                }));
            }

            getUsers();
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, selectedUser, getUsers]);

    const value = {
        messages, users, selectedUser, getUsers, getMessages, sendMessage, setSelectedUser, unseenMessages, setUnseenMessages
    }

    return (

        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>

    );

}

export const useChat = () => useContext(ChatContext);