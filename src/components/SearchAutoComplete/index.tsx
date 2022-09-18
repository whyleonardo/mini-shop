import { VStack, Flex, Text, Image, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { MovieProps } from "../../hooks/contexts/MoviesContext"
import { api } from "../../services/api"

interface AutoCompleteProps {
  searchedMovies: Array<MovieProps>
  isOpen: boolean
  onClose: () => void
}

const { img } = api

export const SearchAutoComplete = ({ searchedMovies, isOpen, onClose }: AutoCompleteProps) => {

  const navigate = useNavigate()

  const handleNavigateToMoviePage = (id: string) => {
    navigate(`/movie/${id}`)
  }

  return (
    <>
      {isOpen &&
        (
          <Flex
            position='absolute'
            top='40px'
            rounded='5px'
            right='-50px'
            bg='red.500'
            w='25.75rem'
            h='10rem'
            overflowY='scroll'
            overflowX='hidden'
            onMouseLeave={onClose}
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
            <VStack
            >
              {
                searchedMovies.length
                  ? searchedMovies.map((movie: MovieProps) => (
                    <Button
                      justifyContent='start'
                      p='2rem'
                      onClick={() => handleNavigateToMoviePage(movie.id)}
                      display='flex'
                      w='full'
                      h='5rem'
                      _hover={{ bg: 'red.500' }}
                      key={movie.id}
                    >
                      <Image
                        w='50px'
                        src={img + movie.poster_path}
                      />

                      <Text>
                        {movie.title}
                      </Text>
                    </Button>
                  ))
                  :
                  <Text>
                    Nenhum filme encontrado de acordo com os termos de busca!
                  </Text>
              }
            </VStack>


          </Flex >
        )
      }
    </>
  )
}

