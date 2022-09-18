import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { api } from './../../services/api'
import axios from 'axios'
import { Button, Flex, Image, VStack, Text, Link, chakra, shouldForwardProp } from '@chakra-ui/react'
import { isValidMotionProp, motion } from 'framer-motion'
import { SpinnerLoading } from '../../components/SpinnerLoading'

const { url, key, img } = api

interface ProductionCompanies {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

interface MovieInfoProps {
  title: string
  poster_path: string
  homepage: string
  genres: Array<number>
  overview: string
  production_companies: Array<ProductionCompanies>
  release_date: Date
  revenue: number
  status: string
  vote_average: number
}

const FlexChakra = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

const variants = {
  hidden: {
    opacity: 0,
    translateX: -25,
    transition: {
      duration: 2
    }
  },

  visible: {
    opacity: 1,
    translateX: 0,
    transition: {
      duration: 2
    }
  },

  exit: {
    opacity: 0,
    translateX: -50,
    transition: {
      duration: 0.7
    }
  }
}

export const Movie = () => {

  const [movieInfo, setMovieInfo] = useState({} as MovieInfoProps)
  const { movieID } = useParams()
  const navigate = useNavigate()

  const movieOverview = movieInfo.overview
  const movieRevenue = movieInfo.revenue
  const movieOverviewIndex = movieOverview?.indexOf('Servidor')
  const filteredMovieOverview = movieOverview?.slice(0, movieOverviewIndex)

  useEffect(() => {
    setTimeout(() => {
      axios.get(`${url}/3/movie/${movieID}?${key}&language=pt-BR`)
        .then(res => setMovieInfo(res.data))
    }, 100);
  }, [])

  return (
    <FlexChakra
      display='flex'
      border='2px'
      mx='2rem'
      h={{ md: 'calc(100vh - 6rem)' }}
      variants={variants}
      initial='hidden'
      animate='visible'
      exit='exit'
      // justifyContent='center'
      mt={'4.5rem'}
    >
      {
        movieInfo
          ?
          <Flex
            border='2px'
            borderColor='yellow'
            p='.5rem'
            w='100%'
            justifyContent='space-around'
            flexDirection={{ base: 'column', sm: 'column', md: 'row' }}
            gap='1rem'
          >
            <VStack
              border='2px'
              borderColor='red'
              p='0'
            >
              <Image
                w='22rem'
                rounded='5px'
                src={img + movieInfo.poster_path}
              />
            </VStack>

            <VStack
              border='2px'
              borderColor='blue'
              maxW={{ base: '100%', sm: '100%', md: '50%' }}
              px='1rem'
            >
              <Text
                fontSize='24px'
                as='strong'
              >
                {movieInfo.title}
              </Text>

              <Link
                href={movieInfo.homepage}
                target='_blank'
              >
                Página Oficial
              </Link>

              <Text
                fontSize='16px'
                as='p'
              >
                {filteredMovieOverview}
              </Text>

              <Text
                fontSize='24px'
                as='strong'
              >
                {movieRevenue?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Text>

              <Text
                fontSize='24px'
                as='strong'
              >
                {movieInfo.vote_average}
              </Text>

            </VStack>
          </Flex >

          : <SpinnerLoading />
      }
    </FlexChakra >
  )
}
