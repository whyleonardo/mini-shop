import { Flex } from "@chakra-ui/react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { BackHomepage } from "../Buttons/BackHomepage"
import { CartIcon } from "../Buttons/CartIcon"
import { FavoriteIcon } from "../Buttons/FavoriteIcon"


import { SearchMovieInput } from "../SearchMovieInput"

export const Header = () => {

  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <Flex
      bg='red.500'
      h='3.5rem'
      w='100vw'
      as='header'
      px='1rem'
      py='1.5rem'
      alignItems='center'
      justifyContent='space-between'
      position='fixed'
      zIndex='20'
      top='0'
    >
      {pathname !== '/'

        ? <BackHomepage />
        : <Link to='/' >Oi</Link>
      }

      <SearchMovieInput />

      < Flex
        alignSelf='center'
      >
        <CartIcon />
        <FavoriteIcon />
      </Flex >
    </Flex >
  )
}


