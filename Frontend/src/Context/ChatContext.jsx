import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const [selectedUser, setSelectedUser] = useState(null);

    const [messages, setMessages] = useState([
        {
        id: 1,
        senderId: 1,
        recieverId: 1,
        text: "To Complete the JSE AI",
        seen: true,
        createdAt: "2025-04-28T10:23:27.844Z",
        },
        {
        id: 2,
        senderId: 2,
        recieverId: 1,
        text: "Hi Stephen! All good here, you?",
        seen: true,
        createdAt: "2025-04-28T10:25:12.000Z",
        },
        {
        id: 3,
        senderId: 3,
        recieverId: 1,
        text: "Hey Stephen, I’ll be late for the meeting.",
        seen: false,
        createdAt: "2025-04-28T10:30:00.000Z",
        },
        {
        id: 4,
        senderId: 1,
        recieverId: 4,
        text: "No problem, Diana. Thanks for letting me know.",
        seen: true,
        createdAt: "2025-04-28T10:31:10.000Z",
        },
        {
        id: 5,
        senderId: 1,
        recieverId: 5,
        text: "Hey Ethan, did you check the update?",
        seen: false,
        createdAt: "2025-04-28T10:35:00.000Z",
        },
        {
        id: 6,
        senderId: 6,
        recieverId: 1,
        text: "Yeah Stephen, I just saw it. Looks great!",
        seen: true,
        createdAt: "2025-04-28T10:36:22.000Z",
        },
        {
        id: 7,
        senderId: 1,
        recieverId: 7,
        text: "Morning Jane! Ready for the task?",
        seen: true,
        createdAt: "2025-04-28T10:40:00.000Z",
        },
        {
        id: 8,
        senderId: 1,
        recieverId: 8,
        text: "Hey Smith, all set. Let’s go!",
        seen: true,
        createdAt: "2025-04-28T10:42:15.000Z",
        },
    ]);    

    return (

        <ChatContext.Provider value={{ selectedUser, setSelectedUser, messages, setMessages }}>
            {children}
        </ChatContext.Provider>

    );

}

export const useChat = () => useContext(ChatContext);