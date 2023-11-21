import { ChakraProvider } from "@chakra-ui/react"
import theme from "@/assets/theme"
import { Fonts } from "@/public/globals"
import { useRouter } from "next/router"
import { store } from "@/app/store"
import { Provider as ReduxProvider } from "react-redux"

import "@/styles/globals.css"

import { Box } from "@chakra-ui/react"

import Navbar from "@/components/common/Navbar"

const specialRoutes = ["/user/login", "/user/register"]

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter()

  if (specialRoutes.includes(pathname))
    return (
      <ChakraProvider theme={theme}>
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
    )

  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
    </ReduxProvider>
  )
}
