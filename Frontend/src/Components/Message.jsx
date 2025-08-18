import React, { useState, useContext, useEffect, useRef } from 'react'
import EmojiPicker from 'emoji-picker-react';
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
import arrow_down from '../assets/arrow-right.png'
import send from '../assets/send.png'
import { useChat } from '../Context/ChatContext'
import { AuthContext } from '../Context/AuthContext'
import { t } from '../utils/i18n';
import { toast } from 'react-toastify';

const Message = () => {

  const AI_USER_ID = "689d621b7287ac7ffb781ac3";

  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useChat();

  const { authUser, onlineUsers } = useContext(AuthContext)

  const textareaRef = useRef(null);
  const scrollRef = useRef(null);
  const emojiRef = useRef(null);

  const [input, setInput] = useState('');
  const [showArrow, setShowArrow] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [aiLoading, setAiLoading] = useState(false);
  
  // send a message
  const handleSendMessage = async(e) => {
    e.preventDefault();

    if(input.trim() === "") return null;

    await sendMessage({text: input.trim()});
    
    setInput("")

    if (selectedUser._id === AI_USER_ID) {
        setAiLoading(true);
        setTimeout(() => {
        setAiLoading(false);
        }, 2000);
    }
  }

  // send a Image
  const handleSendImage = async(e) => {

    const file = e.target.files[0]

    if(!file || !file.type.startsWith("image/")) {
      toast.error("select an image file")
      return;
    }

    const MAX_SIZE = 4 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      toast.error("Image size must be less than 4MB");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async() => {
      await sendMessage({ image: reader.result })
      e.target.value = ""
    }

    reader.readAsDataURL(file)
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50; // 50px threshold

    setShowArrow(!isAtBottom);
  };

  const scrollToBottom = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    setShowArrow(false);
  };

  const TypingAnimation = () => (
    <div className="flex gap-1 items-center bg-[#353535] text-white px-3 py-2 rounded-lg w-fit transition-all duration-100">
        <span className="w-1.5 h-1.5 bg-[#868686] rounded-full animate-bounce"></span>
        <span className="w-1.5 h-1.5 bg-[#868686] rounded-full animate-bounce [animation-delay:0.2s]"></span>
        <span className="w-1.5 h-1.5 bg-[#868686] rounded-full animate-bounce [animation-delay:0.4s]"></span>
    </div>
  );

  return (
    <div className="relative w-[68.6%] h-screen flex flex-col">

        {selectedUser ? (
        <>

            {showArrow && (
                <div
                 onClick={scrollToBottom}
                 className="absolute bottom-[70px] right-4.5 rotate-90 bg-[#353535] hover:bg-[#3f3f3f] rounded-md p-2 cursor-pointer"
                >
                    <img src={arrow_down} className="w-6 h-6" alt="Scroll to bottom" />
                </div>
            )}

            <div className='flex justify-between items-center px-3 py-3 h-fit bg-[#2C2C2C] border-b-[2px] border-b-[#282828]'>
                <div className="flex justify-start items-center gap-3">
                    <div onClick={() => setSelectedUser(null)} className="p-2.5 cursor-pointer hover:bg-[#404040] rounded-full">
                        <img src={back} className='w-3 h-3' alt="" /> 
                    </div> 
                    <img width="40px" height="40px" className='rounded-full aspect-[1/1] object-cover' src={selectedUser.profilePic || avatar} alt="" />
                    <div className="">
                        <p
                          className={`text-white font-medium text-sm ${
                            selectedUser._id !== AI_USER_ID ? 'user-name' : ''
                        }`}
                        >
                            {selectedUser.fullName}
                        </p>
                        {selectedUser._id !== AI_USER_ID && (
                        onlineUsers.includes(selectedUser._id)
                            ? <p className='text-white text-xs user-status'>{t("message.status.online")}</p>
                            : <p className='text-white text-xs user-status'>{t("message.status.offline")}</p>
                        )}
                    </div>
                </div>

                <div className="flex">
                    <div className="flex mr-1">
                        <div title={t("common.currently_unavailable")} className="py-2.5 px-4 cursor-not-allowed bg-[#3A3A3A] hover:bg-[#404040] rounded-l-md">
                            <img src={video} className='w-5 h-5' alt="" /> 
                        </div>               
                        <div title={t("common.currently_unavailable")} className="py-2.5 px-4 cursor-not-allowed bg-[#3A3A3A] hover:bg-[#404040] rounded-r-md">
                            <img src={calls} className='w-5 h-5' alt="" />
                        </div>
                    </div>
                    <div title={t("common.currently_unavailable")} className="flex items-center py-2.5 px-3 hover:bg-[#404040] rounded-md cursor-not-allowed">
                        <img src={search_icon} className='w-4 h-4' alt="" />
                    </div>
                </div>
            </div>

            
            <div 
             ref={scrollRef}
             onScroll={handleScroll}
             className="flex-grow bg-cover bg-center bg-no-repeat p-5 overflow-y-auto" 
             style={{ backgroundImage: `url(${background})` }}
            >

              {selectedUser && (
                <>
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`max-w-[60%] my-2 py-2 rounded-lg text-sm
                        ${msg.image ? 'px-1 pt-1' : 'px-4'} 
                        ${msg.senderId === authUser._id
                          ? 'ml-auto bg-[#035B4B] text-white w-fit'
                          : 'mr-auto bg-[#353535] text-white w-fit'
                        }`}
                    >
                      {msg.image ? (
                        <img
                          src={msg.image}
                          alt="sent"
                          className="rounded-md max-w-[250px] max-h-[250px] object-cover"
                        />
                      ) : (
                        <p>{msg.text}</p>
                      )}
                      <div className="flex justify-end items-center gap-2">
                        <p className="text-[10px] text-gray-300 text-right mt-2">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        {msg.senderId === authUser._id && (
                          <img
                            src={msg.seen ? seen : sent}
                            alt={msg.seen ? 'Seen' : 'Sent'}
                            className="w-3 h-3 mt-2"
                          />
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Show typing bubble below all messages */}
                  {aiLoading && selectedUser._id === AI_USER_ID && (
                    <div className="mr-auto my-2">
                      <TypingAnimation />
                    </div>
                  )}
                </>
              )}              
                
            </div>

            <div className="w-full py-1 px-2 flex items-center flex-wrap gap-1 bg-[#2C2C2C] border-t-[2px] border-t-[#282828]">

                <div ref={emojiRef} className="relative">
                    <div 
                        title={t("message.emoji")}
                        className="py-2.5 px-3 hover:bg-[#404040] rounded-md cursor-pointer"
                        onClick={() => setShowEmojiPicker((prev) => !prev)}
                    >
                        <img src={emoji} className='w-4 h-4' alt="emoji" />
                    </div>
                    {showEmojiPicker && (
                        <div className="absolute bottom-12 left-0 z-50">
                        <EmojiPicker
                            onEmojiClick={(emojiData) => {
                            setInput((prev) => prev + emojiData.emoji);
                            setShowEmojiPicker(false);
                            }}
                            theme="dark"
                        />
                        </div>
                    )}
                </div>

                <label 
                  htmlFor="imageUpload"
                  className="py-2.5 px-3 hover:bg-[#404040] rounded-md cursor-pointer flex items-center"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSendImage}
                    id="imageUpload"
                    className="hidden"
                  />
                  <img src={attachment} className="w-4 h-4" alt="attachment" />
                </label>

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
                    placeholder={t("message.placeholder")}
                    rows={1}
                />

                <div 
                 onClick={(e) => handleSendMessage(e)} 
                 className="py-2.5 px-3 hover:bg-[#404040] rounded-md cursor-pointer">
                    <img src={send} className='w-4.5 h-4.5' alt="" />
                </div>

            </div>
        </>
        ) : (
            <div className='flex flex-col items-center justify-center gap-3 flex-grow bg-[#2C2C2C] text-sm'>
                <img className='w-20' src={whatsapp} alt="" />
                <h2 className='text-white text-[20px]'>{t("message.title")}</h2>
                <p className='text-[#838383] text-center'>{t("message.description_1")}<br />{t("message.description_2")}</p>
            </div>
        )}

    </div>
  )
}

export default Message