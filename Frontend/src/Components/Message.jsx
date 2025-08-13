import React, { useContext, useEffect, useRef } from 'react'
import back from '../assets/back.png'
import search_icon from '../assets/search-icon.png'
import calls from '../assets/calls.png'
import video from '../assets/video-call.png'
import background from '../assets/background.jpg'
import emoji from '../assets/emoji.png'
import attachment from '../assets/attachment.png'
import mic from '../assets/mic.png'
import whatsapp from '../assets/whatsapp.png'
import seen from '../assets/double-tick-seen.png'
import sent from '../assets/double-tick-sent.png'
import profile from '../assets/profile.jpg'
import avatar from '../assets/default-profile.png'
import { useChat } from '../Context/ChatContext'
import { AuthContext } from '../Context/AuthContext'
import { useState } from 'react'

const Message = () => {

  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useChat();

  const { authUser, onlineUsers } = useContext(AuthContext)

  const textareaRef = useRef(null);

  const [input, setInput] = useState('');
  
  // send a message
  const handleSendMessage = async(e) => {
    e.preventDefault();

    if(input.trim() === "") return null;

    await sendMessage({text: input.trim()});
    
    setInput("")
  }

  useEffect(() => {
    if(selectedUser) {
        getMessages(selectedUser._id)
    }
  },[selectedUser])

  // status animation
  useEffect(() => {
    if (!selectedUser) return;

    const nameEl = document.querySelector(".user-name");
    const statusEl = document.querySelector(".user-status");

    if (nameEl && statusEl) {
        nameEl.classList.remove("user-name");
        statusEl.classList.remove("user-status");

        void nameEl.offsetWidth;

        nameEl.classList.add("user-name");
        statusEl.classList.add("user-status");
    }
  }, [selectedUser]);

  return (
    <div className="w-[68.6%] h-screen flex flex-col">

        {selectedUser ? (
        <>
            <div className='flex justify-between items-center px-3 py-3 h-fit bg-[#2C2C2C] border-b-[2px] border-b-[#282828]'>
                <div className="flex justify-start items-center gap-3">
                    <div onClick={() => setSelectedUser(null)} className="p-2.5 cursor-pointer hover:bg-[#404040] rounded-full">
                        <img src={back} className='w-3 h-3' alt="" /> 
                    </div> 
                    <img width="40px" className='rounded-full aspect-[1/1]' src={selectedUser.profilePic || avatar} alt="" />
                    <div className="">
                        <p className='text-white font-medium text-sm user-name'>{selectedUser.fullName}</p>
                        {
                            onlineUsers.includes(selectedUser._id)
                            ? <p className='text-white text-xs user-status'>online</p>
                            : <p className='text-white text-xs user-status'>offline</p>
                        }
                    </div>
                </div>

                <div className="flex">
                    <div className="flex mr-1">
                        <div className="py-2.5 px-4 cursor-pointer bg-[#3A3A3A] hover:bg-[#404040] rounded-l-md">
                            <img src={video} className='w-5 h-5' alt="" /> 
                        </div>               
                        <div className="py-2.5 px-4 cursor-pointer bg-[#3A3A3A] hover:bg-[#404040] rounded-r-md">
                            <img src={calls} className='w-5 h-5' alt="" />
                        </div>
                    </div>
                    <div className="flex items-center py-2.5 px-3 hover:bg-[#404040] rounded-md cursor-pointer">
                        <img src={search_icon} className='w-4 h-4' alt="" />
                    </div>
                </div>
            </div>

            
            <div className="flex-grow bg-cover bg-center bg-no-repeat p-5 overflow-y-auto" style={{ backgroundImage: `url(${background})` }}>

                {selectedUser && (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`max-w-[60%] my-1 px-4 py-2 rounded-lg text-sm ${
                                msg.senderId === authUser._id
                                ? 'ml-auto bg-[#035B4B] text-white w-fit'
                                : 'mr-auto bg-[#353535] text-white w-fit'
                            }`}
                        >
                            <p>{msg.text}</p>
                            <div className="flex justify-end items-center gap-2">
                                <p className="text-[10px] text-gray-300 text-right mt-2">
                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                                {msg.senderId === authUser._id && (
                                    <img
                                    src={msg.seen ? seen : sent}
                                    alt={msg.seen ? 'Seen' : 'Sent'}
                                    className="w-3 h-3 mt-1"
                                    />
                                )}                                
                            </div>
                        </div>
                    ))
                )}              
                
            </div>

            <div className="w-full py-1 px-2 flex flex-wrap gap-1 bg-[#2C2C2C] border-t-[2px] border-t-[#282828]">

                <div className="py-2.5 px-3 hover:bg-[#404040] rounded-md cursor-pointer">
                    <img src={emoji} className='w-4 h-4' alt="" />
                </div>
                <div className="py-2.5 px-3 hover:bg-[#404040] rounded-md cursor-pointer">
                    <img src={attachment} className='w-4 h-4' alt="" />
                </div>

                <textarea
                    ref={textareaRef}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    value={input}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                        }
                    }}
                    className="flex-grow outline-none text-white text-sm bg-transparent p-2.5 resize-none"
                    placeholder="Type a message"
                    rows={1}
                />

                <div className="py-2.5 px-3 hover:bg-[#404040] rounded-md cursor-pointer">
                    <img src={mic} className='w-4 h-4' alt="" />
                </div>

            </div>
        </>
        ) : (
            <div className='flex flex-col items-center justify-center gap-3 flex-grow bg-[#2C2C2C] text-sm'>
                <img className='w-20' src={whatsapp} alt="" />
                <h2 className='text-white text-[20px]'>WhatsApp Clone</h2>
                <p className='text-[#838383] text-center'>A real-time chat application inspired by WhatsApp, featuring user selection,<br /> contextual messaging, and a responsive UI built with React.</p>
            </div>
        )}

    </div>
  )
}

export default Message