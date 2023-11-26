import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Grid,
  GridItem,
  VStack,
  IconButton,
  Heading,
  Card,
  HStack,
  Text,
  Button,
  Box,
} from "@chakra-ui/react"
import { CiMenuKebab } from "react-icons/ci"
import { CiCircleChevDown } from "react-icons/ci"

import Container from "../common/Container"
import AbsoluteExtrasOverlay from "@/components/common/AbsoluteExtrasOverlay"

import { replaceWithPersian } from "@/utils/functions/replaceDigits"
import { axios } from "@/app/axios"
import { getReserves } from "@/features/reserve/reserveSlice"

const gridder = "20% 20% 20% 10% 10% 10% 9% 1%"
const res = {
  id: 1,
  customer_id: 2,
  service_id: 1,
  reserved_at: "2023-09-26 15:06:58",
  created_at: "2023-11-21T16:13:45.000000Z",
  updated_at: "2023-11-21T16:13:45.000000Z",
  deleted_at: null,
  customer: {
    id: 2,
    first_name: "Murl",
    last_name: "Collier",
    email: "tyson.wolf@example.com",
    email_verified_at: "2023-11-21T16:13:44.000000Z",
    role: "customer",
    created_at: "2023-11-21T16:13:44.000000Z",
    updated_at: "2023-11-21T16:13:44.000000Z",
    deleted_at: null,
  },
  service: {
    id: 1,
    name: "Jarred Walk",
    money_cost: 4543247,
    time_cost: 96,
    created_at: "2023-11-21T16:13:45.000000Z",
    updated_at: "2023-11-21T16:13:45.000000Z",
    deleted_at: null,
  },
}

const ReserveHeaders = () => (
  <Grid
    templateColumns={gridder}
    mx={6}
    my={4}
    color="gray.500"
    w="full"
    overflowX="auto"
    overflowY="hidden"
  >
    <GridItem as={Grid} placeItems="center right">
      <Heading size="sm">نام سرویس</Heading>
    </GridItem>
    <GridItem as={Grid} placeItems="center">
      <Heading size="sm">نام‌ مشتری</Heading>
    </GridItem>
    <GridItem as={Grid} placeItems="center">
      <Heading size="sm">نام متخصص</Heading>
    </GridItem>
    <GridItem as={Grid} placeItems="center">
      <Heading size="sm">تاریخ نوبت</Heading>
    </GridItem>
    <GridItem as={Grid} placeItems="center">
      <Heading size="sm">ساعت</Heading>
    </GridItem>
    <GridItem as={Grid} placeItems="center">
      <Heading size="sm">مدت زمان</Heading>
    </GridItem>
    <GridItem as={Grid} placeItems="center">
      <Heading size="sm">هزینه</Heading>
    </GridItem>
    <GridItem />
  </Grid>
)

const ReserveItem = ({ data }) => {
  const [showExtraMenu, setShowExtraMenu] = useState(false)

  return (
    <>
      <Grid
        templateColumns={gridder}
        as={Card}
        px={6}
        py={4}
        w="full"
        bg="red.50"
        mb={2}
        color="gray.600"
        onMouseEnter={() => setShowExtraMenu(true)}
        onMouseLeave={() => setShowExtraMenu(false)}
      >
        <GridItem as={Grid} placeItems="center start">
          <Text fontSize="sm">{res.service.name}</Text>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Text fontSize="sm">
            {res.customer.first_name} {res.customer.last_name}
          </Text>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Text fontSize="sm">ملیحه</Text>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Text fontSize="sm">{new Date(res.reserved_at).toLocaleDateString("fa-ir")}</Text>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Text fontSize="sm">
            {new Date(res.reserved_at).toLocaleTimeString("fa-ir", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Text fontSize="sm">{res.service.time_cost} دقیقه</Text>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Text fontSize="sm">{replaceWithPersian(res.service.money_cost)}</Text>
        </GridItem>
        <GridItem placeItems="center">
          <IconButton
            icon={<CiMenuKebab />}
            variant="unstyled"
            p={0}
            minW="15px"
            mr={2}
            opacity={showExtraMenu ? 1 : 0}
            transition="all .3s ease-in-out"
          />
        </GridItem>
      </Grid>
    </>
  )
}

const Reserves = () => {
  const dispatch = useDispatch()
  const { reserves } = useSelector(state => state.reserve)

  const [error, setError] = useState(false)
  const [loading, isLoading] = useState(true)

  useEffect(() => {
    dispatch(getReserves())
  }, [])

  return (
    <>
      <Container as={HStack} justifyContent="space-between" my={12} px={{ base: 6, lg: 0 }}>
        <Heading size="md" color="gray.600">
          رزروها
        </Heading>
        <Button p={6}>ثبت رزرو جدید</Button>
      </Container>
      <Container as={VStack} position="relative" w="auto" overflowX="auto">
        <VStack w="full">
          <ReserveHeaders />
          <ReserveItem />
          <ReserveItem />
          <ReserveItem />
        </VStack>
        <AbsoluteExtrasOverlay />
      </Container>
      {/* <IconButton
          icon={<CiCircleChevDown />}
          variant="ghost"
          fontSize="24px"
          textAlign="center"
        /> */}
      {/* <Container overflowY="auto" minW="918px">
        <Container mt={16} overflow="hidden"></Container>
        
        <VStack w="full" px={{ base: 6, lg: 0 }}>
          <VStack w="full" position="relative">
            <ReserveItem />
            <ReserveItem />
            <ReserveItem />
            <AbsoluteExtrasOverlay />
          </VStack>
          <IconButton
            icon={<CiCircleChevDown />}
            variant="ghost"
            fontSize="24px"
            textAlign="center"
          />
        </VStack>
      </Container> */}
    </>
  )
}

export default Reserves
