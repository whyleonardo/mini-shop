import { MovieCard } from '../../components/MovieCard'
import { Flex, Grid, chakra, shouldForwardProp } from '@chakra-ui/react'
import { useMovies } from '../../hooks/contexts/MoviesContext/index'
import { motion, isValidMotionProp } from 'framer-motion'
import { SpinnerLoading } from '../../components/SpinnerLoading'
import { useEffect, useState } from 'react'

interface PopularMovies {
  id: string
  genre_ids: any
  poster_path: string
  release_date: Date
  title: string
  vote_average: number
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

export const Home = () => {
  const [loading, setLoading] = useState(true)

  const { popularMovies } = useMovies()

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
              Filmes Mais Populares
            </TextChakra>

            <Grid
              gridTemplateColumns={{ sm: 'repeat(1, 25rem)', md: 'repeat(3, 20rem)', xl: 'repeat(4, 20rem)', '2xl': 'repeat(10, 20rem)' }}
              color='white'
              justifyContent='center'
              mt='2rem'
              gap={5}
            >
              {popularMovies &&
                popularMovies.map((movie: PopularMovies) => (
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

