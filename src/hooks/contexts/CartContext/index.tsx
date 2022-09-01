import { createContext, useContext, useState } from "react"

interface CartProps {
  moviesCart: any
  setMoviesCart: any
  favoriteMovies: any
  setFavoriteMovies: any
}

const CartContext = createContext<CartProps>({} as CartProps)

export const useCart = () => {
  return useContext(CartContext)
}


export const CartProvider = ({ children }: any) => {

  const [moviesCart, setMoviesCart] = useState([])
  const [favoriteMovies, setFavoriteMovies] = useState([])


  const values = {
    moviesCart,
    setMoviesCart,
    favoriteMovies,
    setFavoriteMovies
  }

  return (
    <CartContext.Provider value={values}>
      {children}
    </CartContext.Provider>
  )
}

