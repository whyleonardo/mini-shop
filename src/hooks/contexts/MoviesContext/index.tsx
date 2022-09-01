import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../../../services/api'

interface MoviesValueProps {
  popularMovies: never[]
}

const MoviesContext = createContext<MoviesValueProps>({} as MoviesValueProps)

export const useMoviesFetch = () => {
  return useContext(MoviesContext)
}

export const MoviesProvider = ({ children }: any) => {


  const [popularMovies, setPopularMovies] = useState([])
  const [searchedMovies, setSearchedMovies] = useState([])


  useEffect(() => {
    axios.get(`${api.url}${api.popular}${api.key}`)
      .then(res => setPopularMovies(res.data.results))

  }, [])

  const values = {
    popularMovies
  }


  return (
    <MoviesContext.Provider value={values}>
      {children}
    </MoviesContext.Provider>
  )
}

