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
      bg='none'
      _hover={{ bg: 'none' }}
      _active={{ bg: 'none' }}
      p='0'
    >
      <Icon
        w='2rem'
        h='2rem'
        as={FaShoppingCart}
      />
      <Circle
        position='absolute'
        top='0' right='0' size='15px'
        bg='tomato'
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

