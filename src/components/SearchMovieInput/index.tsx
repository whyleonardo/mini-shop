import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Button, Flex, Icon, Input, useDisclosure, useToast, Show
} from "@chakra-ui/react"
import axios from "axios"
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
    <>
      <Show breakpoint='(min-width: 768px)'>
        <Flex
          position='relative'
          cursor='pointer'
          onMouseLeave={onClose}
        >
          <Input
            borderColor='white'
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
      </Show >

      <Show breakpoint='(max-width: 767px)'>
        <Flex
          position='relative'
          w='13rem'
          zIndex={1000}
          px='.5rem'
        >
          <Input
            borderColor='white'
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => handleSearchMovieEnter(e)}
            onMouseEnter={onOpen}
            value={searchValue}
            w='18.75rem'
            pr='3.5rem'
          />

          <Button
            onClick={handleSearchMovie}
            disabled={searchValue == ''}
            position='absolute'
            right='2'
            w='1rem'
            h='full'
            bg='none'
            zIndex='2'
          >
            <Icon
              as={FaSearch}
            />
          </Button>
        </Flex>
      </Show >
    </>
  )
}


