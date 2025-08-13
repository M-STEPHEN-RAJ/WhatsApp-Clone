import React, { useContext, useEffect, useState } from 'react'
import search_icon from '../assets/search-icon.png'
import profile from '../assets/profile.jpg'
import avatar from '../assets/default-profile.png'
import { useChat } from '../Context/ChatContext'
import { AuthContext } from '../Context/AuthContext'

const Chats = () => {

  const { messages, getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } = useChat();

  const { onlineUsers } = useContext(AuthContext);

  const [input, setInput] = useState("");

  const filteredUsers = input ? users.filter((user) => user.fullName.toLowerCase().includes(input.toLowerCase())) : (users || []);

  useEffect(() => {
    getUsers();
  }, [onlineUsers])

  return (
    <div className='flex flex-col ml-[4.2%] bg-[#2C2C2C] h-screen w-[27.2%] border-r-[2px] border-r-[#282828]'>

        {/* Head */}
        <div className="p-4">
            <h2 className='text-white text-xl font-medium'>Chats</h2>
        </div>

        {/* Search Bar */}
        <div className="px-4">
            <div className="flex bg-[#3A3A3A] border-b border-b-white/20 focus-within:border-b-[#1DAA61] rounded">
                <div className="p-2 px-3">
                    <img src={search_icon} className='w-4 h-4' alt="" />
                </div>
                <input 
                 onChange={(e) => setInput(e.target.value)}
                 className='w-full outline-none text-sm text-white' placeholder='Search or start a new chat' type="text" 
                />
            </div>
        </div>

        {/* Contact Body */}
        <div className="mx-2 mt-4 pb-1 overflow-y-auto flex-grow flex flex-col gap-1">

            {filteredUsers.map((user) => {

              const lastMsg = (messages || [])
                .filter((msg) => msg.senderId === user._id || msg.recieverId === user._id)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

                return (                
                  <div 
                    key={user._id} 
                    onClick={() => {
                      setSelectedUser(user);
                      setUnseenMessages(prev => ({
                        ...prev, [user._id]: 0
                      }))
                    }} 
                    className={`flex gap-4 px-4 py-2.5 rounded-sm hover:bg-[#3A3A3A] cursor-pointer ${selectedUser?._id === user._id ? 'bg-[#454545] hover:bg-[#515151]' : ''}`}
                  >
                      <div className="relative">
                        <img width="60px" className='rounded-full aspect-[1/1]' src={user.profilePic || avatar} alt="" />
                        {
                          onlineUsers.includes(user._id)
                          ? <span className='absolute w-2.5 h-2.5 bottom-0 right-0 bg-[#1DAA61] rounded-full'></span>
                          : <span></span>
                        }
                      </div>
                      
                      <div className="w-full flex flex-col gap-1 overflow-hidden">
                          <div className="flex justify-between items-start">
                              <h2 className='text-white font-medium text-sm'>{user.fullName}</h2>
                              <p className='text-gray-300 text-xs'>{lastMsg ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</p>
                          </div>
                          <div className="flex justify-between items-center gap-5">
                              <p className='text-gray-300 text-sm truncate'>{lastMsg ? lastMsg.text : ''}</p>
                              {
                                unseenMessages[user._id] > 0 && <span className='w-4 h-4 text-[11px] font-semibold bg-[#1DAA61] rounded-full aspect-square flex items-center justify-center'>{unseenMessages[user._id]}</span>
                              }
                          </div>
                      </div>
                  </div>
                );
            })}

        </div>

    </div>
  )
}

export default Chats