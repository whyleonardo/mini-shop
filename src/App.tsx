import { MoviesProvider } from './hooks/contexts/MoviesContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { CartProvider } from './hooks/contexts/CartContext'

export const App = () => {
  return (

    <MoviesProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </MoviesProvider>
  )
}