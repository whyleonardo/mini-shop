import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Flex, Text, Image, VStack, Icon
} from '@chakra-ui/react'
import { useCart } from '../../hooks/contexts/CartContext'
import { api } from '../../services/api'
import { FaTrash } from 'react-icons/fa'
import { MovieProps } from '../../hooks/contexts/MoviesContext'
import { FormModal } from '../FormModal'


interface CartMenuProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const { img } = api

export const CartMenu = ({ isOpen, onClose }: CartMenuProps) => {

  const { moviesCart, handleDeleteMovieFromCart, handleClearAllCart, cartSum } = useCart()

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='right'
        size='sm'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Carrinho</DrawerHeader>

          <DrawerBody
            sx={{
              '&::-webkit-scrollbar': {
                width: '10px',
                borderRadius: '8px',
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
            }}
          >
            <VStack align='start'>
              {moviesCart && moviesCart.map((movie: MovieProps) => (
                <Flex
                  position='relative'
                  align='center'
                  p='.5rem'
                  gap='1rem'
                  border='2px'
                  w='full'
                >
                  <Image
                    width='70px'
                    src={img + movie.poster_path}
                  />
                  <VStack>
                    <Text
                      alignSelf='start'
                      fontWeight='bold'
                    >
                      {movie.title}
                    </Text>
                    <Text
                      alignSelf='start'
                      fontWeight='light'
                    >
                      {movie.price}
                    </Text>
                  </VStack>

                  <Button
                    position='absolute'
                    right='0'
                    top='0'
                    bg='none'
                    _hover={{ bg: 'none' }}
                    _focus={{ bg: 'none' }}
                    onClick={() => handleDeleteMovieFromCart(movie)}
                  >
                    <Icon as={FaTrash}
                      color='tomato'
                      _hover={{ color: 'red' }}
                    />
                  </Button>

                </Flex>
              ))
              }
            </VStack>
          </DrawerBody>
          <DrawerFooter
            display='flex'
            justifyContent='space-between'
          >
            <Text fontWeight='bold'>
              Total: R${cartSum ? cartSum : 0}
            </Text>
            <Flex>
              <Button
                mr={1}
                colorScheme='red'
                disabled={!moviesCart.length}
                onClick={handleClearAllCart}
              >
                Limpar Carrinho
              </Button>
              <FormModal />
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
