import { Icon, Image, Button, ButtonGroup, Text, VStack, Box, HStack, AspectRatio, chakra, shouldForwardProp, Flex } from '@chakra-ui/react'
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
    overview: string
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


  const movieOverviewLength = movie.overview.length

  const movieTitle = movie.title.slice(0, 15)
  const movieTitleLength = movie.title.length
  const movieTitleResumed = movieTitleLength > 23 ? movieTitle + '...' : movie.title

  const movieGenresID = movie.genre_ids[0]
  const movieReleaseDate = new Date(movie.release_date)

  console.log(movie)


  return (
    // <VStack
    //   position='relative'
    //   textAlign='center'
    //   boxShadow='xl'
    //   bg='brand.100'
    //   rounded='5px'
    //   key={movie.id}
    // >

    //   <Box position='relative'>
    //     <AspectRatio
    //       minW='300px'
    //       ratio={14 / 21}
    //     >
    //       <Button
    //         onClick={() => handleNavigateToMoviePage(movie.id)}
    //         as={motion.button}
    //         role="group"
    //         p='2'
    //         outline='none'
    //         variant='unstyled'
    //       >
    //         <ImageChakra
    //           initial={{ opacity: 0, translateY: -50 }}
    //           animate={{ opacity: 1, translateY: 0 }}
    //           exit={{ opacity: 0 }}
    //           // @ts-ignore
    //           whileHover={{ scale: 1.025 }}
    //           transform='auto'
    //           rounded='5px'
    //           src={img + movie.poster_path}
    //         >
    //         </ImageChakra>


    //       </Button>
    //     </AspectRatio>
    //   </Box>

    //   <HStack
    //     position='absolute'
    //     bottom='23%'
    //     w='100%'
    //     h='2rem'
    //     bg='black'
    //     opacity='0.6'
    //     justifyContent='center'
    //   >
    //     <Icon as={FaRegCalendarAlt} />
    //     <Text
    //       as='p'
    //       right='10%'
    //       color='white'
    //     >
    //       {movieReleaseDate.toLocaleDateString("pt-BR")}
    //     </Text>
    //   </HStack>

    //   <Text
    //     as='strong'
    //     fontSize='15px'
    //   >
    //     {movie.title}
    //   </Text>

    //   <HStack>
    //     <Text
    //       fontSize='15px'
    //       display='flex'
    //       gap='1'
    //       as='p'
    //     >
    //       <Icon
    //         as={FaStar}
    //         w={5}
    //         h={5}
    //         color='yellow.500'
    //       />
    //       {movie.vote_average.toFixed(1)}
    //     </Text>

    //     <HStack>
    //       {
    //         genres && genres.map((genre) => (
    //           <>
    //             {movieGenresID == genre.id &&
    //               <Text fontSize='15px' as='span'>{genre.name}</Text>}
    //           </>
    //         ))
    //       }
    //     </HStack>
    //   </HStack>




    //   <Text as='p'>
    //     R$ 19,99
    //   </Text>


    //   <Button
    //     position='absolute'
    //     right='5'
    //     top='2'
    //     p='1'
    //     bg='none'
    //     _focus={{ bg: 'none' }}
    //     _hover={{ bg: 'none' }}
    //     onClick={filteredFavoritestMoviesID.includes(movie.id) ? () => handleDeleteMovieFromFavorites(movie) : () => handleAddMovieToFavorites(movie)}
    //   >
    //     <Icon
    //       as={FaHeart}
    //       _hover={{ color: 'red.500' }}
    //       w={6}
    //       h={6}
    //       color={filteredFavoritestMoviesID.includes(movie.id) ? 'red.500' : 'gray.500'}
    //     />

    //   </Button>

    // </VStack >



    <>
      {movieOverviewLength > 10 &&
        <Flex
          bg="#edf3f8"
          _dark={{
            bg: "#3e3e3e",
          }
          }

          w="full"
          alignItems="center"
          justifyContent="center"
        >
          <Flex
            minW="md"
            position='relative'

            mx="auto"
            bg="white"
            _dark={{
              bg: "gray.800",
            }}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
          >

            {/*             
            <Box
              w={1 / 3}
              bgSize="cover"
              style={{ backgroundImage: `url(${img + movie.poster_path})` }}
            /> */}

            <Button
              onClick={() => handleNavigateToMoviePage(movie.id)}
              as={motion.button}
              role="group"
              outline='none'
              variant='unstyled'
            >
              <ImageChakra
                initial={{ opacity: 0, translateY: -50 }}
                animate={{ opacity: 1, translateY: 0 }}
                objectFit='contain'
                w='8rem'
                exit={{ opacity: 0 }}
                // @ts-ignore
                whileHover={{ scale: 1.025 }}
                transform='auto'
                rounded='5px 0px 5px 5px'
                src={img + movie.poster_path}
              />
            </Button>

            <Box
              w={2 / 3}
              p={{ base: 4, md: 4 }}
            >
              <chakra.h1
                fontSize="xl"
                fontWeight="bold"
                color="gray.800"
                _dark={{
                  color: "white",
                }}
              >
                {movieTitleResumed}
              </chakra.h1>

              <HStack>
                {genres && genres.map((genre) => (
                  <>
                    {movieGenresID == genre.id &&
                      <Text fontSize='small' as='span'>{genre.name}</Text>}
                  </>
                ))}
              </HStack>

              <HStack spacing={1} display="flex" color='yellow.500' alignItems="center" mt={4}>
                <FaStar />
                <Text>{movie.vote_average}</Text>
              </HStack>

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


              <Flex mt={3} alignItems="center" justifyContent="space-between">

                <Text color="black" fontWeight="bold" fontSize="lg">
                  R$ 19,99
                </Text>

                <Button
                  px={2}
                  py={1}
                  bg={filteredCartMoviesID.includes(movie.id) ? 'red.500' : 'white'}
                  filter='auto'
                  fontSize="xs"
                  color="gray.900"
                  fontWeight="bold"
                  rounded="lg"
                  textTransform="uppercase"
                  _hover={{ bg: "gray.200" }}
                  onClick={filteredCartMoviesID.includes(movie.id)
                    ? () => handleDeleteMovieFromCart(movie)
                    : () => handleAddMovieToCart(movie)}
                >
                  {filteredCartMoviesID.includes(movie.id) ? 'Remover do Carrinho' : 'Adicionar ao Carrinho'}
                </Button>
              </Flex>
            </Box>
          </Flex >
        </Flex >
      }
    </>

  )
}

