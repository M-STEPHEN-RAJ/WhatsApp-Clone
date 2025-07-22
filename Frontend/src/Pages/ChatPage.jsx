import React from 'react'
import Sidebar from '../Components/Sidebar'
import Chats from '../Components/Chats'
import Message from '../Components/Message'

const ChatPage = () => {
  return (
    <div className='flex bg-[#2C2C2C]'>
        <Sidebar />
        <Chats />
        <Message />
    </div>
  )
}

export default ChatPage