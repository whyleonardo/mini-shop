import { MoviesProvider } from './hooks/contexts/MoviesContext'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './hooks/contexts/CartContext'
import { Header } from './components/Header'
import { AnimatedRoutes } from './components/AnimatedRoutes/index';

import './styles/styles.css'

export const App = () => {
  return (
    <BrowserRouter>
      <MoviesProvider>
        <CartProvider>
          <Header />
          <AnimatedRoutes />
        </CartProvider>
      </MoviesProvider>
    </BrowserRouter>
  )
}