import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext.jsx"
import { DataProvider } from './context/DataContext.jsx'

const theme = extendTheme({
  colors: {
    bodyColor: "linear-gradient(to right, #3b3eed 0%, #85bbfd 100%)",
  }
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme} >
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
