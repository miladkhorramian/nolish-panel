import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Container from "@/components/common/Container"
import AbsoluteExtrasOverlay from "@/components/common/AbsoluteExtrasOverlay"
import { HStack, Text, Heading, Flex, Spacer, VStack } from "@chakra-ui/react"
import { AddReserve } from "@/components/reserves/AddReserve"
import { ReserveItem, ReserveHeaders } from "@/components/reserves/ReserveItem"

import { getReserves } from "@/features/reserve/reserveSlice"

export default function Reserves() {
  const dispatch = useDispatch()
  const { reserves } = useSelector(state => state.reserve)

  useEffect(() => {
    dispatch(getReserves())
  }, [])

  return (
    <>
      <Container my={12}>
        <Flex alignItems="center" mb={8}>
          <Heading size="sm" color="gray.600">
            لیست رزروها
          </Heading>
          <Spacer />
          <AddReserve updater={() => dispatch(getReserves())} />
        </Flex>
      </Container>
      <Container position="relative">
        <VStack w="full" overflowX="auto" pb={4}>
          <ReserveHeaders />
          {reserves.map(reserve => (
            <ReserveItem reserve={reserve} />
          ))}
          {reserves.length === 0 ? <Text>موردی برای نمایش وجود ندارد.</Text> : null}
        </VStack>
      </Container>
    </>
  )
}
