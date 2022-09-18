import { Grid, Icon, Text, Image, Button, VStack } from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'
import { MovieCard } from '../../components/MovieCard'
import { useCart } from '../../hooks/contexts/CartContext'
import { useMovies } from "../../hooks/contexts/MoviesContext"
import { api } from '../../services/api'

const { img } = api

interface SearchedMovies {
  id: string
  genre_ids: any
  poster_path: string
  release_date: Date
  title: string
  vote_average: number
}

export const Search = () => {
  const { searchedMovies } = useMovies()

  const { filteredFavoritestMoviesID, filteredCartMoviesID, handleDeleteMovieFromCart, handleDeleteMovieFromFavorites, handleAddMovieToCart, handleAddMovieToFavorites } = useCart()

  return (
    // <>
    //   <Grid templateColumns='repeat(1)' color='white' gap={4} >
    //     {searchedMovies &&
    //       searchedMovies?.map((movie: MovieProps) => (
    //         <VStack border='1px' key={movie.id}>
    //           <Text as='p'>
    //             {movie.title}
    //           </Text>


    //           <Text as='p'>
    //             <Icon as={FaStar} w={4} h={4} color='yellow.500' />
    //             {movie.vote_average}
    //           </Text>

    //           <Text as='p'>
    //             {movie.release_date}
    //           </Text>

    //           <Image
    //             width='100px'
    //             src={img + movie.poster_path} />

    //           <Button
    //             bg={filteredFavoritestMoviesID.includes(movie.id) ? 'red.500' : 'gray.500'}
    //             color='black'
    //             onClick={filteredFavoritestMoviesID.includes(movie.id) ? () => handleDeleteMovieFromFavorites(movie) : () => handleAddMovieToFavorites(movie)}
    //           >
    //             Favorite
    //           </Button>
    //           <Button
    //             bg={filteredCartMoviesID.includes(movie.id) ? 'red.500' : 'gray.500'}
    //             color='black'
    //             onClick={filteredCartMoviesID.includes(movie.id) ? () => handleDeleteMovieFromCart(movie) : () => handleAddMovieToCart(movie)}
    //           >
    //             {filteredCartMoviesID.includes(movie.id) ? 'Remover do Carrinho' : 'Adicionar ao Carrinho'}
    //           </Button>
    //         </VStack>
    //       ))
    //     }
    //   </Grid>

    // </>
    <>
      <Text
        as='h1'
        mt='6rem'
        fontSize='2rem'
        textAlign='center'
      >
        Filmes Mais Populares
      </Text>

      <Grid
        templateColumns={{ sm: 'repeat(1, 25rem)', md: 'repeat(4, 20rem)' }}
        color='white'
        justifyContent='center'
        mt='2rem'
        gap={4}
      >
        {searchedMovies &&
          searchedMovies.map((movie: SearchedMovies) => (
            <MovieCard movie={movie} />
          ))
        }
      </Grid >
    </>
  )
}
