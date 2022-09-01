import { MoviesProvider } from './hooks/contexts/MoviesContext'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import { Home } from './pages/Home'
import { CartProvider } from './hooks/contexts/CartContext'
import { Header } from './components/Header/index';
import { Search } from './pages/Search';

export const App = () => {
  return (
    <MoviesProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </MoviesProvider>
  )
}