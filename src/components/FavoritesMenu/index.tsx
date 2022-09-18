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
import { GrClose } from 'react-icons/gr'
import { MovieProps } from '../../hooks/contexts/MoviesContext'


interface CartMenuProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const { img } = api

export const FavoritesMenu = ({ isOpen, onClose }: CartMenuProps) => {

  const { favoriteMovies, handleDeleteMovieFromFavorites } = useCart()

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
          <DrawerHeader>Favoritos</DrawerHeader>

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
              {favoriteMovies && favoriteMovies.map((movie: MovieProps) => (
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
                    onClick={() => handleDeleteMovieFromFavorites(movie)}
                  >
                    <Icon as={GrClose}
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
            <Flex>
              {/* <Button
                colorScheme='red'
                onClick={onClose}
              >
                Voltar
              </Button> */}
              {/* <Button
                mr={1}
                colorScheme='red'
                disabled={!moviesCart.length}
                onClick={handleClearAllCart}
              >
                Limpar Carrinho
              </Button> */}
              <Button
                colorScheme='blue'
                onClick={onClose}
              >
                Fechar
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
