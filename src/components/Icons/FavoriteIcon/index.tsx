import { Circle, Button, Icon, Text } from "@chakra-ui/react"
import { FaHeart } from "react-icons/fa"
import { useCart } from "../../../hooks/contexts/CartContext"


export const FavoriteIcon = () => {
  const { favoriteMovies } = useCart()

  return (

    <Button
      position='relative'
      bg='none'
      _hover={{ bg: 'none' }}
      _active={{ bg: 'none' }}
    >
      <Icon
        w='2rem'
        h='2rem'
        as={FaHeart}
        _hover={{ color: 'blue' }}
      />
      <Circle
        position='absolute'
        top='0'
        right='0'
        size='15px'
        bg='tomato'
        color='white'
      >
        <Text
          fontSize='11px'
        >
          {favoriteMovies && favoriteMovies.length}
        </Text>
      </Circle>
    </Button>
  )
}

