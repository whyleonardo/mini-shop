import { Icon, Image, Button, ButtonGroup, Text, VStack, Box, HStack, AspectRatio, chakra, shouldForwardProp } from '@chakra-ui/react'
import { FaStar, FaHeart, FaRegCalendarAlt } from 'react-icons/fa'
import { useCart } from '../../hooks/contexts/CartContext'
import { api } from '../../services/api'
import { moviesGenre } from '../../hooks/contexts/MoviesContext'
import { isValidMotionProp, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'


const { img } = api
const { genres } = moviesGenre

const ImageChakra = chakra(motion.img, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

export interface MovieCardProps {
  movie: {
    id: string
    genre_ids: Array<number>
    poster_path: string
    release_date: Date
    title: string
    vote_average: number
  }
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { filteredFavoritestMoviesID, filteredCartMoviesID, handleDeleteMovieFromCart, handleDeleteMovieFromFavorites, handleAddMovieToCart, handleAddMovieToFavorites } = useCart()

  const navigate = useNavigate()

  const handleNavigateToMoviePage = (id: string) => {
    navigate(`/movie/${id}`)
  }

  const movieGenresID = movie.genre_ids[0]
  const movieReleaseDate = new Date(movie.release_date)

  return (
    <VStack
      position='relative'
      textAlign='center'
      border='2px'
      rounded='5px'
      key={movie.id}
    >

      <Box position='relative'>
        <AspectRatio
          minW='300px'
          ratio={14 / 21}
        >
          <Button
            onClick={() => handleNavigateToMoviePage(movie.id)}
            as={motion.button}
            role="group"
            bg='none'
            p='2'
            _hover={{ bg: 'none' }}
            _focus={{ outline: 'none' }}
            outline='none'
          >
            <ImageChakra
              initial={{ opacity: 0, translateY: -50 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0 }}
              // @ts-ignore
              whileHover={{ scale: 1.025 }}
              transform='auto'
              rounded='5px'
              src={img + movie.poster_path}
            />
          </Button>
        </AspectRatio>

        <HStack
          position='absolute'
          bottom='0'
          w='full'
          h='2rem'
          bg='black'
          opacity='0.6'
          justifyContent='center'
        >
          <Icon as={FaRegCalendarAlt} />
          <Text
            as='p'
            bottom='1'
            left='10%'
            right='10%'
            color='white'
          >
            {movieReleaseDate.toLocaleDateString("pt-BR")}
          </Text>
        </HStack>
      </Box>

      <Text
        as='strong'
        fontSize='15px'
      >
        {movie.title}
      </Text>

      <HStack>
        <Text
          fontSize='15px'
          display='flex'
          gap='1'
          as='p'
        >
          <Icon
            as={FaStar}
            w={5}
            h={5}
            color='yellow.500'
          />
          {movie.vote_average.toFixed(1)}
        </Text>

        <HStack>
          {
            genres && genres.map((genre) => (
              <>
                {movieGenresID == genre.id &&
                  <Text fontSize='15px' as='span'>{genre.name}</Text>}
              </>
            ))
          }
        </HStack>
      </HStack>

      <Text as='p'>
        R$ 19,99
      </Text>

      <Button
        position='absolute'
        right='5'
        top='2'
        p='1'
        bg='none'
        _focus={{ bg: 'none' }}
        _hover={{ bg: 'none' }}
        onClick={filteredFavoritestMoviesID.includes(movie.id) ? () => handleDeleteMovieFromFavorites(movie) : () => handleAddMovieToFavorites(movie)}
      >
        <Icon
          as={FaHeart}
          _hover={{ color: 'red.500' }}
          w={6}
          h={6}
          color={filteredFavoritestMoviesID.includes(movie.id) ? 'red.500' : 'gray.500'}
        />

      </Button>

      <Button
        bg={filteredCartMoviesID.includes(movie.id) ? 'red.500' : 'gray.500'}
        color='black'
        rounded='none'
        w='full'
        position='relative'
        bottom='0'
        onClick={filteredCartMoviesID.includes(movie.id)
          ? () => handleDeleteMovieFromCart(movie)
          : () => handleAddMovieToCart(movie)}
      >
        {filteredCartMoviesID.includes(movie.id) ? 'Remover do Carrinho' : 'Adicionar ao Carrinho'}
      </Button>
    </VStack >
  )
}

