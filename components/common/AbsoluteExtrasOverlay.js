import { Box, IconButton } from "@chakra-ui/react"
import { CiCircleChevDown } from "react-icons/ci"

const AbsoluteExtrasOverlay = () => {
  return (
    <>
      <Box
        h="4rem"
        w="100%"
        backgroundImage="linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))"
        backgroundSize="100% 4rem"
        background-repeat="no-repeat"
        background-position="bottom"
        position={"absolute"}
        bottom="0"
        zIndex={999}
      />
    </>
  )
}

export default AbsoluteExtrasOverlay
