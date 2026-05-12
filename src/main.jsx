import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './Components/CartContext.jsx'
import { AuthProvider } from './Components/AuthContext.jsx'
import { WishlistProvider } from "./Components/WishlistContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <WishlistProvider>
    <CartProvider>
    <App />
    </CartProvider>
    </WishlistProvider>
    </AuthProvider>
  </StrictMode>,
)
