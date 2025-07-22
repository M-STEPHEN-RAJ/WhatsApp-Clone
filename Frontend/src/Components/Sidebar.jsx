import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import menu from '../assets/menu.png'
import chat from '../assets/chat.png'
import calls from '../assets/calls.png'
import status from '../assets/status.png'
import mata_ai from '../assets/meta-ai.gif'
import settings from '../assets/settings.png'
import profile from '../assets/profile.jpg'
import archive from '../assets/archive.png'
import star from '../assets/star.png'
import { useSidebar } from '../Context/SidebarContext'

const Sidebar = () => {

    const navigate = useNavigate();
    const sidebarRef = useRef();

    const { isSidebarOpen, setIsSidebarOpen, activeTab, setActiveTab } = useSidebar()

    useEffect(() => {
      const handleClickOutside = (event) => {
        if(
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target)
        ){
          setIsSidebarOpen(false);
        }
      }

      if (isSidebarOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isSidebarOpen])

  return (
    <div ref={sidebarRef} className={`fixed flex flex-col justify-between bg-[#282828] p-2 h-screen z-50 ${isSidebarOpen ? 'w-[17%]' : 'w-[4.2%]'}`}>

        {/* Top */}
        <div className="flex flex-col gap-1">

            <div className={`p-2.5 hover:bg-[#3A3A3A] w-fit rounded cursor-pointer mb-2`} onClick={() => setIsSidebarOpen(prev => !prev)}>
                <img width="20px" src={menu} alt="" />
            </div>

            <div className={`relative flex items-center gap-5 p-2.5 hover:bg-[#3A3A3A] cursor-pointer rounded 
              ${activeTab === 'chat' ? 'bg-[#3A3A3A] hover:bg-[#373737] after:content-[""] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-[3px] after:h-4 after:bg-[#1DAA61] after:rounded-full' : 'bg-transparent'}`}
              onClick={ () => {setActiveTab('chat'); navigate('/chat')} }
            >
                <img width="20px" src={chat} alt="" />
                {isSidebarOpen && <p className='text-white text-sm'>Chats</p>}
            </div>
            <div className={`relative flex items-center gap-5 p-2.5 hover:bg-[#3A3A3A] cursor-pointer rounded 
              ${activeTab === 'calls' ? 'bg-[#3A3A3A] hover:bg-[#373737] after:content-[""] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-[3px] after:h-4 after:bg-[#1DAA61] after:rounded-full' : 'bg-transparent'}`}
              onClick={ () => {setActiveTab('calls')} }
            >
                <img width="20px" src={calls} alt="" />
                {isSidebarOpen && <p className='text-white text-sm'>Calls</p>}
            </div>
            <div className={`relative flex items-center gap-5 p-2.5 hover:bg-[#3A3A3A] cursor-pointer rounded
              ${activeTab === 'status' ? 'bg-[#3A3A3A] hover:bg-[#373737] after:content-[""] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-[3px] after:h-4 after:bg-[#1DAA61] after:rounded-full' : 'bg-transparent'}`} 
              onClick={ () => {setActiveTab('status')} }
            >
                <img width="20px" src={status} alt="" />
                {isSidebarOpen && <p className='text-white text-sm'>Status</p>}
            </div>
            <div className={`relative flex items-center gap-5 p-2.5 hover:bg-[#3A3A3A] cursor-pointer rounded 
              ${activeTab === 'meta' ? 'bg-[#3A3A3A] hover:bg-[#373737] after:content-[""] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-[3px] after:h-4 after:bg-[#1DAA61] after:rounded-full' : 'bg-transparent'}`} 
              onClick={ () => {setActiveTab('meta')} }
            >
                <img width="20px" src={mata_ai} alt="" />
                {isSidebarOpen && <p className='text-white text-sm'>Meta AI</p>}
            </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-1">

            <div className={`relative flex items-center gap-5 p-2.5 hover:bg-[#3A3A3A] cursor-pointer rounded 
              ${activeTab === 'starred' ? 'bg-[#3A3A3A] hover:bg-[#373737] after:content-[""] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-[3px] after:h-4 after:bg-[#1DAA61] after:rounded-full' : 'bg-transparent'}`} 
              onClick={ () => {setActiveTab('starred')} }
            >
                <img width="20px" src={star} alt="" />
                {isSidebarOpen && <p className='text-white text-sm'>Starred messages</p>}
            </div>
            <div className={`relative flex items-center gap-5 p-2.5 hover:bg-[#3A3A3A] cursor-pointer rounded 
              ${activeTab === 'archive' ? 'bg-[#3A3A3A] hover:bg-[#373737] after:content-[""] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-[3px] after:h-4 after:bg-[#1DAA61] after:rounded-full' : 'bg-transparent'}`} 
              onClick={ () => {setActiveTab('archive')} }
            >
                <img width="20px" src={archive} alt="" />
                {isSidebarOpen && <p className='text-white text-sm'>Archived chats</p>}
            </div>
            <div className={`relative flex items-center gap-5 p-2.5 hover:bg-[#3A3A3A] cursor-pointer rounded 
              ${activeTab === 'settings' ? 'bg-[#3A3A3A] hover:bg-[#373737] after:content-[""] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-[3px] after:h-4 after:bg-[#1DAA61] after:rounded-full' : 'bg-transparent'}`} 
              onClick={ () => {setActiveTab('settings')} }
            >
                <img width="20px" src={settings} alt="" />
                {isSidebarOpen && <p className='text-white text-sm'>Settings</p>}
            </div>
            <div className={`relative flex items-center gap-5 p-2.5 hover:bg-[#3A3A3A] cursor-pointer rounded 
              ${activeTab === 'profile' ? 'bg-[#3A3A3A] hover:bg-[#373737] after:content-[""] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-[3px] after:h-4 after:bg-[#1DAA61] after:rounded-full' : 'bg-transparent'}`} 
              onClick={ () => {{setActiveTab('profile')}; navigate('/profile')} }
            >
                <img width="20px" className='rounded-full' src={profile} alt="" />
                {isSidebarOpen && <p className='text-white text-sm'>Profile</p>}
            </div>

        </div>

    </div>
  )
}

export default Sidebar