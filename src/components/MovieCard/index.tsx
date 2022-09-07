import { Icon, Image, Button, Stack, Text, VStack, Box, HStack } from '@chakra-ui/react'
import { FaStar, FaHeart } from 'react-icons/fa'
import { useCart } from '../../hooks/contexts/CartContext'
import { api } from '../../services/api'
import { MovieProps, moviesGenre } from '../../hooks/contexts/MoviesContext'
import { useEffect } from 'react';

const { img } = api

const { genres } = moviesGenre

interface MovieCardProps {
  movie: MovieProps
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { filteredFavoritestMoviesID, filteredCartMoviesID, handleDeleteMovieFromCart, handleDeleteMovieFromFavorites, handleAddMovieToCart, handleAddMovieToFavorites } = useCart()


  const movieGenresID = movie.genre_ids
  const filteredMoviesGenreID = genres.map(genre => genre.id)
  const filteredMoviesGenreName = genres.map(genre => genre.name)


  // console.log(filteredMoviesGenre)

  // const zaza = () => {
  // }

  // useEffect(() => {
  //   zaza()
  // }, [])



  return (
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



      <VStack>
        {

          genres && genres.map((genre) => (
            <>
              {movieGenresID?.includes(genre.id) && <Text as='span'>{genre.name}</Text>}
            </>
          ))
        }
      </VStack>

      <Image
        width='100px'
        src={img + movie.poster_path}
      />

      <Button
        bg='none'
        onClick={filteredFavoritestMoviesID.includes(movie.id) ? () => handleDeleteMovieFromFavorites(movie) : () => handleAddMovieToFavorites(movie)}
      >
        <Icon
          as={FaHeart}
          w={4}
          h={4}
          color={filteredFavoritestMoviesID.includes(movie.id) ? 'red.500' : 'gray.500'}
        />
      </Button>
      <Button
        bg={filteredCartMoviesID.includes(movie.id) ? 'red.500' : 'gray.500'}
        color='black'
        onClick={filteredCartMoviesID.includes(movie.id)
          ? () => handleDeleteMovieFromCart(movie)
          : () => handleAddMovieToCart(movie)}
      >
        {filteredCartMoviesID.includes(movie.id) ? 'Remover do Carrinho' : 'Adicionar ao Carrinho'}
      </Button>
    </VStack >
  )
}

