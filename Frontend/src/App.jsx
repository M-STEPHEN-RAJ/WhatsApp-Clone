import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import LoginPage from './Pages/LoginPage'
import ProfilePage from './Pages/ProfilePage'
import ChatPage from './Pages/ChatPage'
import SignUpPage from './Pages/SignUpPage.jsx'
import { ToastContainer, Bounce } from 'react-toastify';
import { AuthContext } from './Context/AuthContext.jsx'
import SettingsPage from './Pages/SettingsPage.jsx'
import NoMobileView from './Components/NoMobileView.jsx'

const App = () => {

  const { authUser, loading } = useContext(AuthContext);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#2C2C2C]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-b-white"></div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={false}
        rtl={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable
        theme="light"
        transition={Bounce}
      />      
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={'/chat'} />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={'/chat'} />} />
        {isMobile ? (
          <Route path='*' element={<NoMobileView />} />
        ) : (
          <>
          <Route path='/chat' element={authUser ? <ChatPage /> : <Navigate to={'/login'} />} />
          <Route path='/settings' element={authUser ? <SettingsPage /> : <Navigate to={'/login'} />} />
          <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to={'/login'} />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default App