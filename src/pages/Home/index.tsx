import { useEffect, useState } from 'react';
import { Box, Flex, Grid, Icon, Image, Button, Stack, Text, VStack, Circle, useToast } from '@chakra-ui/react'
import { useMoviesFetch } from '../../hooks/contexts/MoviesContext/index';
import { api } from './../../services/api';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa'
import { useCart } from '../../hooks/contexts/CartContext';

interface MovieProps {
  title: string
  id: string
  poster_path: string
  release_date: string
  vote_average: string
}

const { img } = api

export const Home = () => {
  const { popularMovies } = useMoviesFetch()

  const { moviesCart, setMoviesCart, favoriteMovies, setFavoriteMovies } = useCart()

  const toast = useToast({
    duration: 2000,
    isClosable: true,
    position: 'bottom',

  })

  const filteredCartMoviesID = moviesCart.map((movie: MovieProps) => movie.id)
  const filteredFavoritestMoviesID = favoriteMovies.map((movie: MovieProps) => movie.id)


  const handleAddToFavorites = ({ id, title, poster_path }: MovieProps) => {
    filteredFavoritestMoviesID.includes(id) == false &&
      popularMovies.filter((movie: MovieProps) => movie.id !== id &&
        setFavoriteMovies([...favoriteMovies,
        {
          id: id,
          title: title,
          img: poster_path
        }
        ]))
    toast({
      title: 'Filme adicionado aos favoritos!',
      status: 'success',

    })
  }

  const handleDeleteMovieFromFavorites = ({ id }: MovieProps) => {
    const removeMovieFromCart = favoriteMovies.map((movie: MovieProps) => movie).filter((movie: MovieProps) => movie.id !== id && movie)
    setFavoriteMovies(removeMovieFromCart)
    toast({
      title: 'Filme removido dos favoritos!',
      status: 'info',
    })
  }

  const handleAddToCart = ({ id, title, poster_path }: MovieProps) => {
    filteredCartMoviesID.includes(id) == false &&
      popularMovies.filter((movie: MovieProps) => movie.id !== id &&
        setMoviesCart([...moviesCart,
        {
          id: id,
          title: title,
          img: poster_path
        }
        ]))
    toast({
      title: 'Filme adicionado ao carrinho!',
      status: 'success',

    })

  }

  const handleDeleteMovieFromCart = ({ id }: MovieProps) => {
    const removeMovieFromCart = moviesCart.map((movie: MovieProps) => movie).filter((movie: MovieProps) => movie.id !== id && movie)
    setMoviesCart(removeMovieFromCart)
    toast({
      title: 'Filme removido do carrinho!',
      status: 'info',
    })
  }

  return (
    <>

      <Grid templateColumns='repeat(1)' color='white' gap={4} >
        {popularMovies &&
          popularMovies.map((movie: MovieProps) => (
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
                src={img + movie.poster_path}
              />

              <Button
                bg={filteredFavoritestMoviesID.includes(movie.id) ? 'red.500' : 'gray.500'}
                color='black'
                onClick={filteredFavoritestMoviesID.includes(movie.id) ? () => handleDeleteMovieFromFavorites(movie) : () => handleAddToFavorites(movie)}
              >
                Favorite
              </Button>
              <Button
                bg={filteredCartMoviesID.includes(movie.id) ? 'red.500' : 'gray.500'}
                color='black'
                onClick={filteredCartMoviesID.includes(movie.id) ? () => handleDeleteMovieFromCart(movie) : () => handleAddToCart(movie)}
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

