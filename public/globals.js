import { Global } from "@emotion/react"
export const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: Estedad;
      src: url('/fonts/estedad.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    `}
  />
)
