import { Flex } from "@chakra-ui/react"
import { useCart } from "../../hooks/contexts/CartContext"
import { CartIcon } from "../Icons/CartIcon"
import { FavoriteIcon } from "../Icons/FavoriteIcon"
import { SearchMovieInput } from "../SearchMovieInput"

export const Header = () => {
  return (
    <Flex
      bg='red.500'
      h='3.5rem'
      w='full'
      as='header'
      px='1rem'
      py='1.5rem'
      alignItems='center'
      justifyContent='end'
    >
      <Flex
        alignItems='center'
      >
        <SearchMovieInput />
        <CartIcon />
        <FavoriteIcon />
      </Flex>
    </Flex>
  )
}


