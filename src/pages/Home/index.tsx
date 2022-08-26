import { useEffect } from 'react';
import { useMoviesFetch } from './../../hooks/contexts/FetchMoviesContext/index';

interface MovieProps {
  title: string
  id: number
}

export const Home = () => {
  const { popularMovies } = useMoviesFetch()

  console.log(popularMovies)

  return (
    <>
      {popularMovies && popularMovies.map((movie: MovieProps) => (
        <p key={movie.id}>
          {movie.title}
        </p>
      ))}
    </>
  )
}

