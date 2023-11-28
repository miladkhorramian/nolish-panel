import { useState } from "react"
import dynamic from "next/dynamic"
import { getCookie } from "cookies-next"
import { Button, HStack, Heading, Card, Box, Text } from "@chakra-ui/react"
import Container from "@/components/common/Container"

// import Reserves from "@/components/main/Reserves"
import { SearchInput } from "@/components/main/SearchInput"

const Reserves = dynamic(() => import("../components/main/Reserves"))

export default function Home() {
  const token = getCookie("token")

  return (
    <Box maxW="100vw">
      <Container>
        <SearchInput />
      </Container>
      {token ? <Reserves /> : null}
    </Box>
  )
}
