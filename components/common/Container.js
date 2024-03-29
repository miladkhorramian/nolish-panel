import { Box } from "@chakra-ui/react"

const Container = props => (
  <Box
    as={props.as}
    w={{ base: "full", lg: "90vw", xl: "80vw" }}
    mx={{ base: "0", md: "auto" }}
    px={6}
    overflowY="hidden"
    {...props}
  >
    {props.children}
  </Box>
)

export default Container
