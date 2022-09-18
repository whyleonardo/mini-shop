import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Search } from '../../pages/Search'
import { Home } from '../../pages/Home/index'
import { Movie } from '../../pages/Movie'
import { NotFound } from '../../pages/NotFound'

export const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/movie/:movieID' element={<Movie />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}
