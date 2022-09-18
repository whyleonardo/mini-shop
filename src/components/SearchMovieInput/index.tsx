import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Flex, Icon, Input, useDisclosure, keyframes, useToast } from "@chakra-ui/react"
import axios from "axios"

import { useMovies } from "../../hooks/contexts/MoviesContext"
import { SearchAutoComplete } from './../SearchAutoComplete/index';

import { FaSearch } from 'react-icons/fa'
import { api } from "../../services/api"

const { search, key, url } = api

export const SearchMovieInput = () => {

  const [searchValue, setSearchValue] = useState('')
  const [searchAutoCompleteValue, setSearchAutoCompleteValue] = useState([])

  const { isOpen, onClose, onOpen } = useDisclosure()
  const navigate = useNavigate()
  const toast = useToast({
    duration: 2000,
    isClosable: true,
    position: 'bottom',
  })

  const { searchedMovies } = useMovies()

  const handleSearchMovieEnter = ({ keyCode }: any) => {
    if (keyCode === 13) {
      searchValue == ''
        ? toast({
          title: 'O campo de busca não pode estar em branco!',
          status: 'info',
        })
        : navigate(`/search?q=${searchValue}`)
    }
    onClose()
  }

  const handleSearchMovie = () => {
    navigate(`/search?q=${searchValue}`)
    onClose()
  }

  useEffect(() => {
    searchValue.length > 2 &&
      axios.get(`${url}${search}?${key}&query=${searchValue}&language=pt-BR`)
        .then(res => setSearchAutoCompleteValue(res.data.results))
  }, [searchValue])

  useEffect(() => {
    searchValue.length > 2 && onOpen()
  }, [searchValue])

  return (

    < Flex
      position='relative'
      right='-50'
      cursor='pointer'
      onMouseLeave={onClose}
    >

      <Input
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => handleSearchMovieEnter(e)}
        onMouseEnter={onOpen}
        value={searchValue}
        w='18.75rem'
        pr='3.5rem'
      />

      {
        searchValue.length > 1 && (
          <SearchAutoComplete
            isOpen={isOpen}
            onClose={onClose}
            searchedMovies={searchAutoCompleteValue}
          />
        )
      }

      <Button
        onClick={handleSearchMovie}
        disabled={searchValue == ''}
        position='absolute'
        right='0'
        w='1rem'
        h='full'
        bg='none'
        zIndex='2'
      >
        <Icon
          as={FaSearch}
        />
      </Button>
    </Flex >
  )
}

  // < Flex
    //   position='relative'
    //   cursor='pointer'
    //   align='center'
    //   onMouseLeave={onClose}
    // >
    //   {
    //     !isOpen &&
    //     <Button
    //       onMouseEnter={onOpen}
    //     >
    //       <Icon
    //         as={FaSearch}
    //       />
    //     </Button>
    //   }

    //   {
    //     isOpen &&
    //     <>
    //       <Input
    //         onChange={(e) => setSearchValue(e.target.value)}
    //         onKeyDown={(e) => handleSearchMovieEnter(e)}
    //         value={searchValue}
    //         as={motion.input}
    //         animation={animation}
    //         pr='3.5rem'
    //       />
    //       <Button
    //         onClick={handleSearchMovie}
    //         disabled={searchValue == ''}
    //         position='absolute'
    //         right='0'
    //         w='1rem'
    //         h='2rem'
    //         mr='.5rem'
    //         bg='none'
    //         zIndex='2'
    //       >
    //         <Icon
    //           as={FaSearch}
    //         />
    //       </Button>
    //     </>
    //   }
    // </Flex >


