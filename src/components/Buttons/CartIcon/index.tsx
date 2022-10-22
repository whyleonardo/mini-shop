import { Button, Circle, Icon, Text, useDisclosure } from "@chakra-ui/react"
import { FaShoppingCart } from "react-icons/fa"
import { useCart } from "../../../hooks/contexts/CartContext"
import { CartMenu } from './../../CartMenu/index'

export const CartIcon = () => {

  const { moviesCart } = useCart()
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
        as={FaShoppingCart}
      />
      <Circle
        position='absolute'
        top='0' right='0' size='15px'
        bg='gray.800'
        color='white'
      >
        <Text
          fontSize='11px'
        >
          {moviesCart && moviesCart.length}
        </Text>
      </Circle>
      <CartMenu
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </Button >
  )
}

