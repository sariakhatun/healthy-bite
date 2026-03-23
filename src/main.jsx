import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider  } from "react-router";
import { router } from './router/router.jsx';
import AuthProvider from './context/AuthContext/AuthProvider.jsx';
import { BMIProvider } from './context/BMIContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <BMIProvider>
       <RouterProvider router={router} />,
    </BMIProvider>
   </AuthProvider>
  </StrictMode>,
)
