import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../../../services/api'

interface MoviesValueProps {
  popularMovies: never[]
  searchedMovies: never[]
  setSearchedMovies: React.Dispatch<React.SetStateAction<never[]>>
}

export interface MovieProps {
  title: string
  id: string
  poster_path: string
  price: number
  release_date?: string
  vote_average?: string
  genre_ids?: Array<number>
}

export const moviesGenre = {
  "genres": [
    { "id": 28, "name": "Ação" },
    { "id": 12, "name": "Aventura" },
    { "id": 16, "name": "Animação" },
    { "id": 35, "name": "Comédia" },
    { "id": 80, "name": "Crime" },
    { "id": 99, "name": "Documentário" },
    { "id": 18, "name": "Drama" },
    { "id": 10751, "name": "Família" },
    { "id": 14, "name": "Fantasia" },
    { "id": 36, "name": "História" },
    { "id": 27, "name": "Terror" },
    { "id": 10402, "name": "Música" },
    { "id": 9648, "name": "Mistério" },
    { "id": 10749, "name": "Romance" },
    { "id": 878, "name": "Ficção Científica" },
    { "id": 10770, "name": "TV" },
    { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "Guerra" },
    { "id": 37, "name": "Faroeste" }
  ]
}

const { search, key, url } = api

const MoviesContext = createContext<MoviesValueProps>({} as MoviesValueProps)

export const useMovies = () => {
  return useContext(MoviesContext)
}

export const MoviesProvider = ({ children }: any) => {

  const [popularMovies, setPopularMovies] = useState([])
  const [searchedMovies, setSearchedMovies] = useState([])

  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')

  useEffect(() => {
    axios.get(`${api.url}${api.popular}${api.key}&language=pt-BR`)
      .then(res => setPopularMovies(res.data.results))
  }, [])

  useEffect(() => {
    axios.get(`${url}${search}?${key}&query=${query}`)
      .then(res => setSearchedMovies(res.data.results))
  }, [query])

  const values = {
    popularMovies,
    searchedMovies,
    setSearchedMovies
  }

  return (
    <MoviesContext.Provider value={values}>
      {children}
    </MoviesContext.Provider>
  )
}

