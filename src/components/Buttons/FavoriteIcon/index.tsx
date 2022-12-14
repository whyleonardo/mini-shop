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
      p='0'
    >
      <Icon
        w='2rem'
        h='2rem'
        color='brand.700'
        filter='auto'
        _hover={{ brightness: 0.8 }}
        transition='all'
        transitionDuration='300ms'
        as={FaHeart}
      />
      <Circle
        position='absolute'
        top='0'
        right='0'
        size='15px'
        bg='gray.800'
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

