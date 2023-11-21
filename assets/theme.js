import { extendTheme, defineStyleConfig, withDefaultColorScheme } from "@chakra-ui/react"

const theme = extendTheme(
  {
    direction: "rtl",
    initialColorMode: "light",
    useSystemColorMode: true,
    styles: {
      global: {
        html: {
          fontSize: "14px",
        },
        body: {
          bg: "white",
        },
      },
    },
    components: {
      Container: defineStyleConfig({
        baseStyle: {
          marginInline: 0,
          paddingInline: 0,
        },
      }),
      FormLabel: defineStyleConfig({
        baseStyle: {
          fontWeight: "bold",
          fontSize: "sm",
        },
      }),
      FormErrorMessage: defineStyleConfig({
        baseStyle: {
          mt: 0,
          fontSize: "xs",
        },
      }),
      Heading: defineStyleConfig({
        baseStyle: {},
      }),
      Button: defineStyleConfig({
        baseStyle: {
          fontWeight: "light",
          borderRadius: "12px",
        },
      }),
      Card: defineStyleConfig({
        baseStyle: {
          container: {
            borderRadius: "12px",
          },
        },
      }),
      Textarea: defineStyleConfig({
        baseStyle: {
          resize: "none",
          borderRadius: 12,
          minHeight: "80px",
        },
      }),
      Input: defineStyleConfig({
        baseStyle: {
          field: {
            borderRadius: 12,
            height: "40px",
          },
        },
      }),
      Select: defineStyleConfig({
        baseStyle: {
          field: {
            borderRadius: 12,
            height: "40px",
          },
        },
      }),
      Badge: defineStyleConfig({
        baseStyle: {
          borderRadius: 12,
          padding: ".5rem 2rem",
          fontSize: "1rem",
        },
      }),
      Tag: defineStyleConfig({
        baseStyle: {
          container: {
            borderRadius: 16,
            padding: ".5rem 1rem",
          },
        },
      }),
      Avatar: defineStyleConfig({
        baseStyle: {
          group: {
            direction: "ltr",
          },
        },
      }),
    },
    fonts: {
      heading: "Estedad",
      body: "Estedad",
    },
  },
  withDefaultColorScheme({ colorScheme: "pink" }),
)

export default theme
