import React from 'react'
import search_icon from '../assets/search-icon.png'
import profile from '../assets/profile.jpg'
import { useChat } from '../Context/ChatContext'

const Chats = () => {

  const { selectedUser, setSelectedUser } = useChat();
  const { messages } = useChat();

  const Users = [
    {
      id: 1,
      name: "M STEPHEN RAJ (You)",
      email: "stephen@gmail.com",
      bio: "Hey Everyone, I am using WhatsApp Clone",
      profile: profile,
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@gmail.com",
      bio: "Hey Everyone, I am using WhatsApp Clone",
      profile: profile,
    },
    {
      id: 3,
      name: "Charlie Watson",
      email: "charlie@gmail.com",
      bio: "Hey Everyone, I am using WhatsApp Clone",
      profile: profile,
    },
    {
      id: 4,
      name: "Diana Blake",
      email: "diana@gmail.com",
      bio: "Hey Everyone, I am using WhatsApp Clone",
      profile: profile,
    },
    {
      id: 5,
      name: "Ethan Cooper",
      email: "cooper@gmail.com",
      bio: "Hey Everyone, I am using WhatsApp Clone",
      profile: profile,
    },
    {
      id: 6,
      name: "Alice Johnson",
      email: "johnson@gmail.com",
      bio: "Hey Everyone, I am using WhatsApp Clone",
      profile: profile,
    },
    {
      id: 7,
      name: "Jane",
      email: "jane@gmail.com",
      bio: "Hey Everyone, I am using WhatsApp Clone",
      profile: profile,
    },
    {
      id: 8,
      name: "Anne",
      email: "anne@gmail.com",
      bio: "Hey Everyone, I am using WhatsApp Clone",
      profile: profile,
    }
  ];

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
                <input className='w-full outline-none text-sm text-white' placeholder='Search or start a new chat' type="text" />
            </div>
        </div>

        {/* Contact Body */}
        <div className="mx-2 mt-4 pb-1 overflow-y-auto flex-grow flex flex-col gap-1">

            {Users.map((user) => {

              const lastMsg = messages
                .filter((msg) => msg.senderId === user.id || msg.recieverId === user.id)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

                return (                
                  <div 
                    key={user.id} 
                    onClick={() => setSelectedUser(user)} 
                    className={`flex gap-4 px-4 py-3 rounded-sm hover:bg-[#3A3A3A] cursor-pointer ${selectedUser?.id === user.id ? 'bg-[#454545] hover:bg-[#515151]' : ''}`}
                  >
                      <img width="50px" className='rounded-full aspect-[1/1]' src={user.profile} alt="" />
                      <div className="w-full flex flex-col gap-1 overflow-hidden">
                          <div className="flex justify-between items-start">
                              <h2 className='text-white font-medium text-sm'>{user.name}</h2>
                              <p className='text-gray-300 text-xs'>{lastMsg ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</p>
                          </div>
                          <div className="">
                              <p className='text-gray-300 text-sm truncate'>{lastMsg ? lastMsg.text : ''}</p>
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