import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

const theme = extendTheme({
  colors: {
    brand: {
      100: "#EDF2FB",
      200: "#E2EAFC",
      300: "#D7E3FC",
      400: "#CCDBFD",
      500: "#C1D3FE",
      600: "#B6CCFE",
      700: "#ABC4FF"
    }
  },

  styles: {
    global: {
      body: {
        backgroundColor: 'brand.100',
        fontFamily: 'Inter, sans- serif',
        '&::-webkit-scrollbar': { display: 'none' }
      }
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
