import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ChatProvider } from './Context/ChatContext.jsx'
import { SidebarProvider } from './Context/SidebarContext.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <SidebarProvider>
        <ChatProvider>
            <App />
        </ChatProvider>
      </SidebarProvider>
    </AuthProvider>
  </BrowserRouter>,
)
