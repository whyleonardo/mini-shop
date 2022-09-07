import { Grid, Icon, Text, Image, Button, VStack } from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'
import { MovieProps, useCart } from '../../hooks/contexts/CartContext'
import { useMovies } from "../../hooks/contexts/MoviesContext"
import { api } from '../../services/api'

const { img } = api

export const Search = () => {
  const { searchedMovies } = useMovies()

  const { filteredFavoritestMoviesID, filteredCartMoviesID, handleDeleteMovieFromCart, handleDeleteMovieFromFavorites, handleAddMovieToCart, handleAddMovieToFavorites } = useCart()

  return (
    <>
      <Grid templateColumns='repeat(1)' color='white' gap={4} >
        {searchedMovies &&
          searchedMovies?.map((movie: MovieProps) => (
            <VStack border='1px' key={movie.id}>
              <Text as='p'>
                {movie.title}
              </Text>


              <Text as='p'>
                <Icon as={FaStar} w={4} h={4} color='yellow.500' />
                {movie.vote_average}
              </Text>

              <Text as='p'>
                {movie.release_date}
              </Text>

              <Image
                width='100px'
                src={img + movie.poster_path} />

              <Button
                bg={filteredFavoritestMoviesID.includes(movie.id) ? 'red.500' : 'gray.500'}
                color='black'
                onClick={filteredFavoritestMoviesID.includes(movie.id) ? () => handleDeleteMovieFromFavorites(movie) : () => handleAddMovieToFavorites(movie)}
              >
                Favorite
              </Button>
              <Button
                bg={filteredCartMoviesID.includes(movie.id) ? 'red.500' : 'gray.500'}
                color='black'
                onClick={filteredCartMoviesID.includes(movie.id) ? () => handleDeleteMovieFromCart(movie) : () => handleAddMovieToCart(movie)}
              >
                {filteredCartMoviesID.includes(movie.id) ? 'Remover do Carrinho' : 'Adicionar ao Carrinho'}
              </Button>
            </VStack>
          ))
        }
      </Grid>

    </>
  )
}
