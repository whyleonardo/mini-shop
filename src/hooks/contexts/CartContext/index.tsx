import { createContext, useContext, useState, useEffect } from "react"
import { MovieProps, useMovies } from "../MoviesContext"
import { useToast } from "@chakra-ui/react"



interface FavoritesProps {
  title: string
  id: string
  poster_path: string
}

interface CartProps {
  moviesCart: MovieProps[]
  setMoviesCart: any
  favoriteMovies: any
  setFavoriteMovies: any
  handleAddMovieToCart: any
  handleDeleteMovieFromCart: any
  handleAddMovieToFavorites: any
  handleDeleteMovieFromFavorites: any
  filteredCartMoviesID: any
  filteredFavoritestMoviesID: any
  handleClearAllCart: any
  cartSum: any
}

const CartContext = createContext<CartProps>({} as CartProps)

export const useCart = () => {
  return useContext(CartContext)
}

export const CartProvider = ({ children }: any) => {
  const [moviesCart, setMoviesCart] = useState<MovieProps[]>([])
  const [favoriteMovies, setFavoriteMovies] = useState<FavoritesProps[]>([])
  const [avoidCartLocalStorage, setAvoidCartLocalStorage] = useState(true)
  const [avoidFavoritesLocalStorage, setAvoidFavoritesLocalStorage] = useState(true)


  const { popularMovies } = useMovies()

  const toast = useToast({
    duration: 2000,
    isClosable: true,
    position: 'bottom',

  })

  const filteredCartMoviesID = moviesCart.map((movie: MovieProps) => movie.id)

  const filteredFavoritestMoviesID = favoriteMovies.map((movie: FavoritesProps) => movie.id)

  const handleAddMovieToCart = ({ id, title, poster_path }: MovieProps) => {
    setAvoidCartLocalStorage(false)
    filteredCartMoviesID.includes(id) == false &&
      popularMovies.filter((movie: MovieProps) => movie.id !== id &&
        setMoviesCart([...moviesCart,
        {
          id: id,
          title: title,
          poster_path: poster_path,
          price: 19.99
        }
        ]))

    toast({
      title: 'Filme adicionado ao carrinho!',
      status: 'success'
    })
  }

  const handleDeleteMovieFromCart = ({ id }: MovieProps) => {
    setAvoidCartLocalStorage(false)
    const removeMovieFromCart = moviesCart.map((movie: MovieProps) => movie).filter((movie: MovieProps) => movie.id !== id && movie)
    setMoviesCart(removeMovieFromCart)
    toast({
      title: 'Filme removido do carrinho!',
      status: 'info',
    })
  }

  const handleAddMovieToFavorites = ({ id, title, poster_path }: FavoritesProps) => {
    setAvoidFavoritesLocalStorage(false)
    filteredFavoritestMoviesID.includes(id) == false &&
      popularMovies.filter((movie: FavoritesProps) => movie.id !== id &&
        setFavoriteMovies([...favoriteMovies,
        {
          id: id,
          title: title,
          poster_path: poster_path
        }
        ]))
    toast({
      title: 'Filme adicionado aos favoritos!',
      status: 'success',

    })
  }

  const handleDeleteMovieFromFavorites = ({ id }: FavoritesProps) => {
    setAvoidFavoritesLocalStorage(false)
    const removeMovieFromCart = favoriteMovies.map((movie: FavoritesProps) => movie).filter((movie: FavoritesProps) => movie.id !== id && movie)
    setFavoriteMovies(removeMovieFromCart)
    toast({
      title: 'Filme removido dos favoritos!',
      status: 'info',
    })
  }

  const handleClearAllCart = () => {
    const clearedCart: MovieProps[] = []
    setMoviesCart(clearedCart)
  }

  const cartPrices = moviesCart.map(({ price }: MovieProps) => price)

  const cartSum = cartPrices.length > 0 && cartPrices?.reduce((acc, total) => acc + total).toFixed(2)

  const values = {
    moviesCart,
    setMoviesCart,
    favoriteMovies,
    setFavoriteMovies,
    handleAddMovieToCart,
    handleDeleteMovieFromCart,
    handleAddMovieToFavorites,
    handleDeleteMovieFromFavorites,
    filteredCartMoviesID,
    filteredFavoritestMoviesID,
    handleClearAllCart,
    cartSum
  }

  useEffect(() => {
    setAvoidCartLocalStorage(true)
    setAvoidFavoritesLocalStorage(true)

    const cartLocalStorage = JSON.parse(localStorage.getItem('cart') as any)
    cartLocalStorage !== null && setMoviesCart(cartLocalStorage)

    const favoriteLocalStorage = JSON.parse(localStorage.getItem('favorites') as any)
    favoriteLocalStorage !== null && setFavoriteMovies(favoriteLocalStorage)
  }, [])

  useEffect(() => {
    avoidCartLocalStorage === false &&
      localStorage.setItem('cart', JSON.stringify(moviesCart))

    avoidFavoritesLocalStorage === false &&
      localStorage.setItem('favorites', JSON.stringify(favoriteMovies))
  }, [moviesCart, avoidCartLocalStorage, avoidFavoritesLocalStorage, favoriteMovies])

  return (
    <CartContext.Provider value={values}>
      {children}
    </CartContext.Provider>
  )
}