import { useEffect, useState } from 'react';
import { Box, Flex, Grid, Icon, Image, Button, Stack, Text, VStack, Circle, useToast } from '@chakra-ui/react'
import { useMoviesFetch } from '../../hooks/contexts/MoviesContext/index';
import { api } from './../../services/api';
import { FaStar, FaShoppingCart } from 'react-icons/fa'
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
  const { moviesCart, setMoviesCart } = useCart()
  const toast = useToast()

  const filteredCartMoviesID = moviesCart.map((movie: MovieProps) => movie.id)

  const handleAddToFavorites = (movie: MovieProps) => { }

  const handleAddToCart = ({ id, title }: MovieProps) => {
    filteredCartMoviesID.includes(id) == false &&
      popularMovies.filter((movie: MovieProps) => movie.id !== id &&
        setMoviesCart([...moviesCart,
        {
          id: id,
          title: title
        }
        ]))
    toast({
      title: 'Filme adicionado ao carrinho!',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top',
    })

  }

  const handleDeleteMovieFromCart = ({ id }: MovieProps) => {
    const removeMovieFromCart = moviesCart.map((movie: MovieProps) => movie).filter((movie: MovieProps) => movie.id !== id && movie)
    setMoviesCart(removeMovieFromCart)
    toast({
      title: 'Filme removido do carrinho!',
      status: 'info',
      duration: 2000,
      isClosable: true,
      position: 'top',
    })
  }

  return (
    <>
      <Box position='relative'>
        <Icon w='50px' h='50px' as={FaShoppingCart} />
        <Circle position='absolute' bottom='1' size='25px' bg='tomato' color='white'>
          <Text>{moviesCart && moviesCart.length}</Text>
        </Circle>

      </Box>

      <Grid templateColumns='repeat(4, 1fr)' color='white' gap={6} >
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
                bg='gray.500'
                color='black'
                onClick={() => handleAddToFavorites(movie)}
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

