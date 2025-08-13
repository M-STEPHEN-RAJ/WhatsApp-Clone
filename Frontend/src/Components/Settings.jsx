import React, { useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import settings_img from '../assets/settings-img.png'
import { AuthContext } from '../Context/AuthContext'
import linkedin from '../assets/linkedin.svg'
import github from '../assets/github.svg'
import portfolio from '../assets/portfolio.png'
import drop_down from '../assets/drop-down.png'

const Settings = () => {

  const { logout } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("English");

  return (
    <div className='bg-white/5 ml-[4.2%] h-screen flex justify-center items-center'>
      
      <div className="h-[590px] w-[500px] flex flex-col justify-center items-center gap-5 px-12 bg-white/5 rounded-xl backdrop-blur-md border border-white/20 shadow-lg z-10">

        <div className="w-full text-center">
          <h2 className='mb-3 text-white font-semibold text-2xl'>Settings</h2>
        </div>

        <div className="w-full flex flex-col items-start text-white gap-3">
          
          <h2 className='mb-3 text-white font-semibold text-xl'>General</h2>

          <div className="w-full flex flex-col justify-center items-start gap-8">

            <div className="relative text-white flex items-center gap-5 pl-10">

              <p className="font-medium whitespace-nowrap">Language</p>

              <div
                onClick={() => setOpen(prev => !prev)}
                className="flex justify-between items-center px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded cursor-pointer w-40"
              >
                {selected}

                <img src={drop_down} className={`w-4 h-4 ${open ? 'rotate-180' : ''} transition-all duration-200`} alt="" />
              </div>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-10 left-[130px] bg-[#2A2A2A] border border-white/20 rounded w-40 shadow-md z-50"
                  >
                    {["English", "Tamil"].map((lang) => (
                      <motion.div
                        key={lang}
                        whileHover={{ backgroundColor: "#444" }}
                        onClick={() => { setSelected(lang); setOpen(false); }}
                        className="px-4 py-2 cursor-pointer"
                      >
                        {lang}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-full flex justify-start px-10">
              <div
                onClick={() => logout()}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded px-5 py-1 font-[500] cursor-pointer text-[#ff7171]"
              >
                Logout
              </div>
            </div>

          </div>
        </div>

        <div className="w-full border-b border-b-white/10"></div>

        {/* Help & Feedback */}
        <div className='flex flex-col gap-5 text-white'>
          <h2 className='text-xl font-semibold mb-2'>Help</h2>
          <p className='text-gray-300 mb-2 text-sm px-5'>We'd love to hear your thoughts and suggestions to improve the app.</p>

          <div className='flex justify-between text-xs text-gray-400 px-10'>
            <div 
             onClick={() => window.open('https://github.com/M-STEPHEN-RAJ/WhatsApp-Clone', '_blank')}
             className="w-[80px] flex flex-col justify-center items-center gap-2 cursor-pointer rounded-md hover:bg-white/10 px-5 py-3"
            >
              <img src={github} className='w-8' alt="" />
              <p className='text-white'>GitHub</p>
            </div>
            <div 
             onClick={() => window.open('https://www.linkedin.com/in/m-stephen-raj/', '_blank')}
             className="w-[80px] flex flex-col justify-center items-center gap-2 cursor-pointer rounded-md hover:bg-white/10 px-5 py-3"
            >
              <img src={linkedin} className='w-8' alt="" />
              <p className='text-white'>LinkedIn</p>
            </div>
            <div 
             onClick={() => window.open('https://stephen-raj-m.web.app/', '_blank')}
             className="w-[80px] flex flex-col justify-center items-center gap-2 cursor-pointer rounded-md hover:bg-white/10 px-5 py-3"
            >
              <img src={portfolio} className='w-8' alt="" />
              <p className='text-white'>Portfolio</p>
            </div>
          </div>

          <p className='text-xs text-gray-200 mt-6 text-center'>© 2025 WhatsApp Clone. All rights reserved.</p>

        </div>


      </div>

      <div className="relative -left-1.5 bg-[#2A2A2A] flex flex-col justify-center items-center gap-10 w-[520px] h-[590px] border border-white/20 border-l-transparent rounded-r-xl">

          <img className='w-80' src={settings_img} alt="" />

          <h2 className='mb-3 text-white font-semibold text-2xl'>Easily manage all your app settings.</h2>

      </div>      
      
    </div>
  )
}

export default Settings