import { Button, Flex } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../../hooks/contexts/CartContext"
import { CartIcon } from "../Icons/CartIcon"
import { FavoriteIcon } from "../Icons/FavoriteIcon"
import { SearchMovieInput } from "../SearchMovieInput"

export const Header = () => {

  const navigate = useNavigate()
  return (
    <Flex
      bg='red.500'
      h='3.5rem'
      w='full'
      as='header'
      px='1rem'
      py='1.5rem'
      alignItems='center'
      justifyContent='space-between'
    >
      <Link to='/'>Oi</Link>
      < Flex
        alignItems='center'
      >

        <SearchMovieInput />
        <CartIcon />
        <FavoriteIcon />
      </Flex >
    </Flex >
  )
}


