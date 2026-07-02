import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import { WishlistProvider } from './Context/WishlistContext.jsx'
import { CartProvider } from './Context/CartContext.jsx'
import { LocationProvider } from './Context/LocationContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <WishlistProvider>
    <CartProvider>
      <LocationProvider>
    <App />
    </LocationProvider>
    </CartProvider>
    </WishlistProvider>
    </AuthProvider>
  </StrictMode>,
)
