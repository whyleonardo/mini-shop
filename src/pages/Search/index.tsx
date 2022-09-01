import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { api } from "../../services/api"
import { Text } from '@chakra-ui/react'

const { search, key, url } = api

export const Search = () => {
  const [searchedMovies, setSearchedMovies] = useState([])

  const [searchParams] = useSearchParams()

  const query = searchParams.get('q')
  useEffect(() => {
    axios.get(`${url}${search}?${key}&query=${query}`)
      .then(res => setSearchedMovies(res.data.results))
  }, [query])


  return (
    <Text color='white'>
      {searchedMovies && searchedMovies.map((movie) => <p> {movie.title} </p>)}
    </Text>
  )
}
