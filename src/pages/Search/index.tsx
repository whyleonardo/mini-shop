import { Grid, Icon, Text, Image, Button, VStack, chakra, shouldForwardProp, Flex } from '@chakra-ui/react'
import { isValidMotionProp, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { MovieCard } from '../../components/MovieCard'
import { SpinnerLoading } from '../../components/SpinnerLoading'
import { useCart } from '../../hooks/contexts/CartContext'
import { useMovies } from "../../hooks/contexts/MoviesContext"

interface SearchedMovies {
  genre_ids: any
  poster_path: string
  release_date: Date
  title: string
  vote_average: number
  id: string
}


const FlexChakra = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

const TextChakra = chakra(motion.h2, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})


export const Search = () => {
  const [loading, setLoading] = useState(true)

  const { searchedMovies, query } = useMovies()

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  return (
    <>
      {
        !loading
          ?
          <FlexChakra
            px='1rem'
            display='flex'
            flexDirection='column'
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateX: 50 }}
            // @ts-ignore
            transition={{ duration: 0.7 }}
            mb='2rem'
          >
            <TextChakra
              mt='6rem'
              fontSize='2rem'
              textAlign='center'
            >
              Resultados de: {query}
            </TextChakra>

            <Grid
              gridTemplateColumns={{ sm: 'repeat(1, 25rem)', md: 'repeat(3, 20rem)', xl: 'repeat(4, 20rem)', '2xl': 'repeat(10, 20rem)' }}
              color='white'
              justifyContent='center'
              mt='2rem'
              gap={5}
            >
              {searchedMovies &&
                searchedMovies.map((movie: SearchedMovies) => (
                  <MovieCard
                    movie={movie} />
                ))
              }
            </Grid>
          </FlexChakra>

          :
          <Flex
            justifyContent='center'
            alignItems='center'
            h='100vh'
          >
            <SpinnerLoading />
          </Flex>
      }
    </>
  )
}
