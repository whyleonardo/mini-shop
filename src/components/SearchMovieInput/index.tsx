import { Button, Flex, Icon, Input, useDisclosure, keyframes, Show, Hide } from "@chakra-ui/react"
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

const animation = `${animationKeyframes} 600ms ease-in-out`

export const SearchMovieInput = () => {

  const [searchValue, setSearchValue] = useState('')
  const { isOpen, onClose, onOpen } = useDisclosure()
  const navigate = useNavigate()

  const handleSearchMovieEnter = ({ keyCode }: any) => {
    keyCode === 13 && navigate(`/search?q=${searchValue}`)
  }

  const handleSearchMovie = () => {
    navigate(`/search?q=${searchValue}`)
  }

  return (
    <>
      {/* <Show above='md'> */}
      <Flex
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

        {isOpen &&
          <>
            <Button
              onClick={handleSearchMovie}
              position='absolute'
              w='1rem'
              h='2rem'
              ml='.5rem'
              bg='none'
              zIndex='2'
            >
              <Icon
                as={FaSearch}
              />
            </Button>
            <Input
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => handleSearchMovieEnter(e)}

              value={searchValue}
              as={motion.input}
              animation={animation}
              pl='3.5rem'
            />
          </>
        }
      </Flex>
      {/* </Show> */}
    </>
  )
}


