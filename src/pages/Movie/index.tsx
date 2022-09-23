import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { api } from './../../services/api'
import axios from 'axios'
import { Flex, Image, VStack, Text, Link, chakra, shouldForwardProp, Icon, Divider, Spacer } from '@chakra-ui/react'
import { isValidMotionProp, motion } from 'framer-motion'
import { SpinnerLoading } from '../../components/SpinnerLoading'
import { FaRegMoneyBillAlt, FaInfoCircle, FaRegCalendarAlt, FaStar, FaExternalLinkAlt } from 'react-icons/fa'

const { url, key, img } = api

interface MovieInfoProps {
  title: string
  poster_path: string
  homepage: string
  overview: string
  status: string
  release_date: Date
  revenue: number
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

  const movieReleaseDate = new Date(movieInfo.release_date)
  const movieOverview = movieInfo.overview
  const movieRevenue = movieInfo.revenue
  const movieOverviewIndex = movieOverview?.indexOf('Servidor')
  const filteredMovieOverview = movieOverview?.slice(0, movieOverviewIndex)

  useEffect(() => {
    setTimeout(() => {
      axios.get(`${url}/3/movie/${movieID}?${key}&language=pt-BR`)
        .then(res => setMovieInfo(res.data))
    }, 0);
  }, [])

  return (
    <FlexChakra

      display='flex'
      mx='2rem'
      h={{ md: 'calc(100vh - 6rem)' }}
      variants={variants}
      initial='hidden'
      animate='visible'
      exit='exit'
      mt={'4.5rem'}
    >
      {
        movieInfo
          ?
          <Flex
            p='.5rem'
            w='100%'
            justifyContent='space-around'
            flexDirection={{ base: 'column', sm: 'column', md: 'row' }}
            gap='1rem'
          >
            <VStack
              alignSelf='center'
              p={{ base: '1rem', sm: '1rem', md: '2rem' }}
            >
              <Image
                w={{ base: '16rem', sm: '16rem', md: '22rem' }}
                rounded='5px'
                src={img + movieInfo.poster_path}
              />
            </VStack>

            <VStack
              maxW={{ base: '100%', sm: '100%', md: '50%' }}
              p={{ base: '1rem', sm: '1rem', md: '2rem' }}
              px='1rem'
              alignSelf='center'
            >
              <Text
                fontSize='24px'
                as='strong'
              >
                {movieInfo.title}
              </Text>

              <Text
                fontSize='16px'
                as='p'
              >
                {filteredMovieOverview}
              </Text>

              <Spacer />

              <Divider
                orientation='horizontal'
              />
              <Spacer />

              <Flex
                gap='.5rem'
                alignItems='center'
                alignSelf='start'
              >
                <Icon
                  size='1rem'
                  as={FaExternalLinkAlt}
                />
                <Link
                  href={movieInfo.homepage}
                  target='_blank'
                >
                  Página Oficial
                </Link>
              </Flex>

              <Flex
                gap='.5rem'
                alignItems='center'
                alignSelf='start'
              >
                <Text
                  fontSize='18px'
                  as='strong'
                >
                  R$ {movieRevenue?.toLocaleString('pt-BR')}
                </Text>
              </Flex>

              <Flex
                gap='.5rem'
                alignItems='center'
                alignSelf='start'
              >
                <Icon
                  size='1rem'
                  as={FaRegCalendarAlt}
                />

                <Text
                  fontSize='18px'
                  as='strong'
                >
                  {movieReleaseDate.toLocaleDateString("pt-BR")}
                </Text>
              </Flex>

              <Flex
                gap='.5rem'
                alignItems='center'
                alignSelf='start'
              >
                <Icon
                  size='1rem'
                  as={FaStar}
                  color='yellow.500'
                />

                <Text
                  fontSize='18px'
                  as='strong'
                >
                  {movieInfo?.vote_average?.toFixed(1)}
                </Text>
              </Flex>
            </VStack>
          </Flex >

          : <SpinnerLoading />
      }
    </FlexChakra >
  )
}
