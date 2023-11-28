import { ChakraProvider } from "@chakra-ui/react"
import theme from "@/app/theme"
import { Fonts } from "@/public/globals"
import { useRouter } from "next/router"
import { store } from "@/app/store"
import { Provider as ReduxProvider } from "react-redux"
import { getCookie } from "cookies-next"

import "@/styles/globals.css"

import Navbar from "@/components/common/Navbar"

const specialRoutes = ["/user/login", "/user/register"]

export default function App({ Component, pageProps }) {
  const { pathname, push } = useRouter()
  const router = useRouter()

  if (specialRoutes.includes(pathname) || pathname.startsWith("/admin"))
    return (
      <ReduxProvider store={store}>
        <ChakraProvider theme={theme}>
          <Fonts />
          <Component {...pageProps} />
        </ChakraProvider>
      </ReduxProvider>
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
