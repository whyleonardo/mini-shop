import { Flex } from "@chakra-ui/react"
import { Link, useLocation } from "react-router-dom"
import { BackHomepage } from "../Buttons/BackHomepage"
import { CartIcon } from "../Buttons/CartIcon"
import { FavoriteIcon } from "../Buttons/FavoriteIcon"


import { SearchMovieInput } from "../SearchMovieInput"

export const Header = () => {
  const { pathname } = useLocation()

  return (
    <Flex
      bg='brand.100'
      boxShadow='xs'
      h='3.5rem'
      w='100vw'
      as='header'
      px='2rem'
      py='1.5rem'
      alignItems='center'
      justifyContent='space-between'
      position='sticky'
      zIndex='20'
      top='0'
    >
      {pathname !== '/'

        ? <BackHomepage />
        : <Link to='/' >Oi</Link>
      }
      < Flex
        alignSelf='center'
        gap='0.5rem'
      >
        <SearchMovieInput />
        <CartIcon />
        <FavoriteIcon />
      </Flex >
    </Flex >
  )
}




