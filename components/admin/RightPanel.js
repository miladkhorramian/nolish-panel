import { Box, Heading } from "@chakra-ui/react"

import { AdminOptions } from "./AdminOptions"

export const RightPanel = () => {
  return (
    <Box
      w={{ base: 0, lg: "25%", xl: "20%" }}
      h="100%"
      py={4}
      position="sticky"
      // right="0"
      top="0"
      display={{ base: "none", lg: "flex" }}
      flexDirection="column"
      bg="pink.50"
      color="gray.700"
    >
      <Heading size="md" mb={4} mr={4}>
        پنل مدیریت
      </Heading>
      <AdminOptions />
    </Box>
  )
}
