import { createContext, useContext, useState } from "react"

interface CartProps {
  moviesCart: any
  setMoviesCart: any
}

interface PropsAny {

}

const CartContext = createContext<CartProps>({} as CartProps)

export const useCart = () => {
  return useContext(CartContext)
}


export const CartProvider = ({ children }: any) => {

  const [moviesCart, setMoviesCart] = useState<PropsAny[]>([])

  const values = {
    moviesCart,
    setMoviesCart
  }

  return (
    <CartContext.Provider value={values}>
      {children}
    </CartContext.Provider>
  )
}

