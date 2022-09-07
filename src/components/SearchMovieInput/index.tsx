import { Button, Flex, Icon, Input, useDisclosure, keyframes, Show, Hide, useToast } from "@chakra-ui/react"
import { FaSearch } from 'react-icons/fa'
import { motion } from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const animationKeyframes = keyframes`
  0% { transform: scaleX(0); transform-origin:right center;}
  50% { transform: scaleX(0); transform-origin:right center; }
  75% { transform: scaleX(1); transform-origin:right center; }
  100% { transform: scaleX(1); transform-origin:right center;}
`

const animation = `${animationKeyframes} 400ms ease-out`

export const SearchMovieInput = () => {

  const [searchValue, setSearchValue] = useState('')

  const { isOpen, onClose, onOpen } = useDisclosure()
  const navigate = useNavigate()
  const toast = useToast({
    duration: 2000,
    isClosable: true,
    position: 'bottom',

  })

  const handleSearchMovieEnter = ({ keyCode }: any) => {
    if (keyCode === 13) {
      searchValue == ''
        ? toast({
          title: 'O campo de busca não pode estar em branco!',
          status: 'info',
        })
        : navigate(`/search?q=${searchValue}`)
    }
  }

  const handleSearchMovie = () => {
    navigate(`/search?q=${searchValue}`)
  }

  return (
    < Flex
      position='relative'
      cursor='pointer'
      align='center'
      onMouseLeave={onClose}
    >
      {
        !isOpen &&
        <Button
          onMouseEnter={onOpen}
        >
          <Icon
            as={FaSearch}
          />
        </Button>
      }

      {
        isOpen &&
        <>
          <Input
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => handleSearchMovieEnter(e)}
            value={searchValue}
            as={motion.input}
            animation={animation}
            pr='3.5rem'
          />
          <Button
            onClick={handleSearchMovie}
            disabled={searchValue == ''}
            position='absolute'
            right='0'
            w='1rem'
            h='2rem'
            mr='.5rem'
            bg='none'
            zIndex='2'
          >
            <Icon
              as={FaSearch}
            />
          </Button>
        </>
      }
    </Flex >
  )
}


