import { Flex, Box } from "@chakra-ui/react"
import { RightPanel } from "../admin/RightPanel"
import { MobileDrawer } from "../admin/MobileDrawer"

const grids = {
  base: "100%",
  md: "100%",
  lg: "30% 70%",
  xl: "25% 75%",
  "2xl": "20% 80%",
}

const AdminLayout = ({ children }) => {
  return (
    <>
      <Flex height="100vh">
        <RightPanel />
        <Box w={{ base: "100%", lg: "75%", xl: "80%" }} position="sticky" left={0} overflow="auto">
          {children}
        </Box>
      </Flex>
      <MobileDrawer />
    </>
  )
}

export default AdminLayout
