import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {

    const location = useLocation();

    const [activeTab, setActiveTab] = useState('chat');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        
        const path = location.pathname;

        if(path.startsWith('/chat')) {
            setActiveTab('chat')
        }
        else if (path.startsWith('/profile')) {
            setActiveTab('profile')
        }

    }, [location.pathname])

    return (
        <SidebarContext.Provider value={{
            isSidebarOpen,
            setIsSidebarOpen,
            activeTab,
            setActiveTab
        }}>
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebar = () => useContext(SidebarContext)