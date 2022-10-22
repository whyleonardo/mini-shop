import { MovieCard } from '../../components/MovieCard'
import { Flex, Grid, chakra, shouldForwardProp } from '@chakra-ui/react'
import { useMovies } from '../../hooks/contexts/MoviesContext/index'
import { motion, isValidMotionProp } from 'framer-motion'
import { SpinnerLoading } from '../../components/SpinnerLoading'
import { useEffect, useState } from 'react'

interface PopularMovies {
  id: string
  genre_ids: any
  overview: string
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

const variants = {
  hidden: {
    opacity: 0,
    translateY: -50,
    transition: {
      duration: 0.7
    }
  },

  visible: {
    opacity: 1,
    translateY: 0,
    transition: {
      duration: 0.7
    }
  },

  exit: {
    opacity: 0,
    translateX: 50,
    transition: {
      duration: 1.2
    }
  }
}

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
            display='flex'
            px='1rem'
            flexDirection='column'
            variants={variants}
            initial='hidden'
            animate='visible'
            exit='exit'
            mb='2rem'
          >
            <TextChakra
              mt='3rem'
              fontSize='2rem'
              textAlign='center'
              color='black'
            >
              Filmes Mais Populares
            </TextChakra>

            <Grid
              gridTemplateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)', }}
              justifyContent='center'
              mt='2rem'
              gap='8'
              color='black'
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

