import { MovieCard } from '../../components/MovieCard'
import { Grid } from '@chakra-ui/react'
import { MovieProps, useMovies } from '../../hooks/contexts/MoviesContext/index'

import { api } from './../../services/api'

export const Home = () => {
  const { popularMovies } = useMovies()
  return (
    <Grid templateColumns='repeat(1)' color='white' gap={4} >
      {popularMovies &&
        popularMovies.map((movie: MovieProps) => (
          <MovieCard movie={movie} />
        ))
      }
    </Grid>
  )
}

