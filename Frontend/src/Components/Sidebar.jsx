import React, { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import menu from '../assets/menu.png'
import chat from '../assets/chat.png'
import calls from '../assets/calls.png'
import status from '../assets/status.png'
import mata_ai from '../assets/meta-ai.gif'
import settings from '../assets/settings.png'
import default_profile from '../assets/default-profile.png'
import archive from '../assets/archive.png'
import star from '../assets/star.png'
import { useSidebar } from '../Context/SidebarContext'
import { AuthContext } from '../Context/AuthContext'
import { useChat } from '../Context/ChatContext'
import { t } from '../utils/i18n';

const Sidebar = () => {

    const { authUser } = useContext(AuthContext);

    const { users, setSelectedUser } = useChat();

    const AI_USER_ID = "689d621b7287ac7ffb781ac3";

    const navigate = useNavigate();
    const sidebarRef = useRef();

    const { isSidebarOpen, setIsSidebarOpen, activeTab, setActiveTab } = useSidebar();

    const handleSelectMetaAI = () => {
      const aiUser = users.find(user => user._id === AI_USER_ID);
      if (aiUser) {
        setSelectedUser(aiUser);
      }
      navigate('/chat')
    };

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
                {isSidebarOpen && <p className='text-white text-sm'>{t("sidebar.chats")}</p>}
            </div>
            <div title={t("common.currently_unavailable")} className={`relative flex items-center gap-5 p-2.5 hover:bg-[#3A3A3A] cursor-not-allowed rounded 
              ${activeTab === 'calls' ? 'bg-[#3A3A3A] hover:bg-[#373737] after:content-[""] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-[3px] after:h-4 after:bg-[#1DAA61] after:rounded-full' : 'bg-transparent'}`}
            >
                <img width="20px" src={calls} alt="" />
                {isSidebarOpen && <p className='text-white text-sm'>{t("sidebar.calls")}</p>}
            </div>
            <div title={t("common.currently_unavailable")} className={`relative flex items-center gap-5 p-2.5 hover:bg-[#3A3A3A] cursor-not-allowed rounded
              ${activeTab === 'status' ? 'bg-[#3A3A3A] hover:bg-[#373737] after:content-[""] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-[3px] after:h-4 after:bg-[#1DAA61] after:rounded-full' : 'bg-transparent'}`} 
            >
                <img width="20px" src={status} alt="" />
                {isSidebarOpen && <p className='text-white text-sm'>{t("sidebar.status")}</p>}
            </div>
            <div className={`relative flex items-center gap-5 p-2.5 hover:bg-[#3A3A3A] cursor-pointer rounded 
              ${activeTab === 'meta' ? 'bg-[#3A3A3A] hover:bg-[#373737] after:content-[""] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-[3px] after:h-4 after:bg-[#1DAA61] after:rounded-full' : 'bg-transparent'}`} 
              onClick={handleSelectMetaAI}
            >
                <img width="20px" src={mata_ai} alt="" />
                {isSidebarOpen && <p className='text-white text-sm'>{t("sidebar.metaAI")}</p>}
            </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-1">

            <div title={t("common.currently_unavailable")} className={`relative flex items-center gap-5 p-2.5 hover:bg-[#3A3A3A] cursor-not-allowed rounded 
              ${activeTab === 'starred' ? 'bg-[#3A3A3A] hover:bg-[#373737] after:content-[""] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-[3px] after:h-4 after:bg-[#1DAA61] after:rounded-full' : 'bg-transparent'}`} 
            >
                <img width="20px" src={star} alt="" />
                {isSidebarOpen && <p className='text-white text-sm'>{t("sidebar.starred")}</p>}
            </div>

            <div title={t("common.currently_unavailable")} className={`relative flex items-center gap-5 p-2.5 hover:bg-[#3A3A3A] cursor-not-allowed rounded 
              ${activeTab === 'archive' ? 'bg-[#3A3A3A] hover:bg-[#373737] after:content-[""] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-[3px] after:h-4 after:bg-[#1DAA61] after:rounded-full' : 'bg-transparent'}`} 
            >
                <img width="20px" src={archive} alt="" />
                {isSidebarOpen && <p className='text-white text-sm'>{t("sidebar.archive")}</p>}
            </div>

            <div className={`relative flex items-center gap-5 p-2.5 hover:bg-[#3A3A3A] cursor-pointer rounded 
              ${activeTab === 'settings' ? 'bg-[#3A3A3A] hover:bg-[#373737] after:content-[""] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-[3px] after:h-4 after:bg-[#1DAA61] after:rounded-full' : 'bg-transparent'}`} 
              onClick={ () => {setActiveTab('settings'); navigate('/settings')} }
            >
                <img width="20px" src={settings} alt="" />
                {isSidebarOpen && <p className='text-white text-sm'>{t("sidebar.settings")}</p>}
            </div>
            <div className={`relative flex items-center gap-5 p-2.5 hover:bg-[rgb(58,58,58)] cursor-pointer rounded 
              ${activeTab === 'profile' ? 'bg-[#3A3A3A] hover:bg-[#373737] after:content-[""] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-[3px] after:h-4 after:bg-[#1DAA61] after:rounded-full' : 'bg-transparent'}`} 
              onClick={ () => {setActiveTab('profile'); navigate('/profile')} }
            >
                <img className='w-5 h-5 rounded-full aspect-[1/1] object-cover flex-shrink-0' src={authUser?.profilePic || default_profile} alt="" />
                {isSidebarOpen && <p className='text-white text-sm'>{t("sidebar.profile")}</p>}
            </div>

        </div>

    </div>
  )
}

export default Sidebar