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
  Center,
} from "@chakra-ui/react"
import { CiMenuKebab } from "react-icons/ci"
import { CiCircleChevDown } from "react-icons/ci"

import Container from "../common/Container"
import AbsoluteExtrasOverlay from "@/components/common/AbsoluteExtrasOverlay"

import { replaceWithPersian } from "@/utils/functions/replaceDigits"
import { axios } from "@/app/axios"
import { getReserves } from "@/features/reserve/reserveSlice"
import { useRouter } from "next/router"

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
          <Text fontSize="sm">{data?.service?.name}</Text>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Text fontSize="sm">
            {data?.customer?.first_name} {data?.customer?.last_name}
          </Text>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Text fontSize="sm">ملیحه</Text>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Text fontSize="sm">{new Date(data?.reserved_at).toLocaleDateString("fa-ir")}</Text>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Text fontSize="sm">
            {new Date(data?.reserved_at).toLocaleTimeString("fa-ir", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Text fontSize="sm">{data?.service?.time_cost} دقیقه</Text>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Text fontSize="sm">{data?.service?.money_cost}</Text>
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
  const router = useRouter()
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
          رزروهای آخر شما
        </Heading>
      </Container>
      <Container as={VStack} position="relative" w="auto" overflowX="auto" mb={4}>
        <VStack w="full">
          <ReserveHeaders />
          {reserves.map((reserve, index) => index <= 2 && <ReserveItem data={reserve} />)}
        </VStack>
        <AbsoluteExtrasOverlay />
      </Container>
      <Center maxW="700px" w="full" mx="auto" mb={8}>
        <IconButton
          icon={<CiCircleChevDown />}
          variant="ghost"
          fontSize="24px"
          textAlign="center"
          mb={12}
          onClick={() => router.push("/reserves")}
        />
      </Center>
    </>
  )
}

export default Reserves
