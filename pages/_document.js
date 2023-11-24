import { Html, Head, Main, NextScript } from "next/document"
import { ColorModeScript } from "@chakra-ui/system"
import theme from "@/app/theme"

export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head>
        <link rel="stylesheet" href="/fonts/font.css" />
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
