import { FetchMoviesProvider } from './hooks/contexts/FetchMoviesContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'

export const App = () => {
  return (
    <FetchMoviesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </FetchMoviesProvider>
  )
}