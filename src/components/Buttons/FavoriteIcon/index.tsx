import { Circle, Button, Icon, Text, useDisclosure } from "@chakra-ui/react"
import { FaHeart } from "react-icons/fa"
import { useCart } from "../../../hooks/contexts/CartContext"
import { FavoritesMenu } from "../../FavoritesMenu"


export const FavoriteIcon = () => {
  const { favoriteMovies } = useCart()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (

    <Button
      position='relative'
      onClick={onOpen}
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
      <FavoritesMenu
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </Button>
  )
}

