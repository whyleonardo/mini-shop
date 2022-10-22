import { Grid, Icon, Text, Image, Button, VStack, chakra, shouldForwardProp, Flex } from '@chakra-ui/react'
import { isValidMotionProp, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { MovieCard } from '../../components/MovieCard'
import { SpinnerLoading } from '../../components/SpinnerLoading'
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
      duration: 0.3
    }
  }
}

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
            variants={variants}
            initial='hidden'
            animate='visible'
            exit='exit'
            mb='2rem'
          >
            <TextChakra
              mt='6rem'
              fontSize='2rem'
              textAlign='center'
            >
              {!searchedMovies.length
                ? 'Ops, não encontramos nenhum filme'
                : `Resultados de: ${query}`}
            </TextChakra>


            {!searchedMovies.length
              ?
              <Flex alignSelf='center'>
                <Icon w='5rem' h='5rem' as={FaTimes} />
              </Flex>

              :
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
            }
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
