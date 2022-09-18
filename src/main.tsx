import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: 'black',
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
