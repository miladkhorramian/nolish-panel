import { useState } from "react"
import { Button, HStack, Heading, Card, Box, Text } from "@chakra-ui/react"
import Container from "@/components/common/Container"

import Services from "@/components/main/Services"
import Reserves from "@/components/main/Reserves"

export default function Home() {
  return (
    <Box maxW="100vw">
      <Reserves />
      {/* <Services /> */}
    </Box>
  )
}
