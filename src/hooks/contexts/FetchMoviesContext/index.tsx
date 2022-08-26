import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../../../services/api'

interface MoviesValueProps {
  popularMovies: never[] | []
}

const FetchMoviesContext = createContext<MoviesValueProps>({} as MoviesValueProps)

export const useMoviesFetch = () => {
  return useContext(FetchMoviesContext)
}

export const FetchMoviesProvider = ({ children }: any) => {


  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    axios.get(api.url + api.key)
      .then(res => setPopularMovies(res.data.results))
  }, [])

  const values = {
    popularMovies
  }


  return (
    <FetchMoviesContext.Provider value={values}>
      {children}
    </FetchMoviesContext.Provider>
  )
}

