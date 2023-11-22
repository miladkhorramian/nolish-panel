import { useState } from "react"
import { Button, HStack, Heading, Card, Box } from "@chakra-ui/react"
import Container from "@/components/main/Container"

export default function Home() {
  return (
    <Box w="100%" overflowY="hidden">
      <Container mt={16} overflowY="hidden">
        <HStack
          justifyContent="space-between"
          mb={12}
          p={{ base: "0 1.5rem", lg: "0 1.5rem 0 0" }}
        >
          <Heading size="md" color="gray.600">
            رزروها
          </Heading>
          <Button p={6}>ثبت رزرو جدید</Button>
        </HStack>
      </Container>
      <ReservesSection />
    </Box>
  )
}

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

import { Grid, GridItem, VStack, IconButton } from "@chakra-ui/react"
import { CiMenuKebab } from "react-icons/ci"

const gridder = "20% 20% 20% 10% 10% 10% 10%"
const ReserveHeaders = () => (
  <Grid templateColumns={gridder} mx={6} my={4} color="gray.500">
    <GridItem as={Grid} placeItems="right">
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
  </Grid>
)

const ReserveItem = () => {
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
          <Heading size="sm">{res.service.name}</Heading>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Heading size="sm">
            {res.customer.first_name} {res.customer.last_name}
          </Heading>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Heading size="sm">ملیحه</Heading>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Heading size="sm">{new Date(res.reserved_at).toLocaleDateString("fa-ir")}</Heading>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Heading size="sm">
            {new Date(res.reserved_at).toLocaleTimeString("fa-ir", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Heading>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Heading size="sm">{res.service.time_cost} دقیقه</Heading>
        </GridItem>
        <GridItem as={HStack} justifyContent="flex-end">
          <Heading size="sm">{res.service.money_cost}</Heading>
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

import { CiCircleChevDown } from "react-icons/ci"
import AbsoluteExtrasOverlay from "@/components/common/AbsoluteExtrasOverlay"

const ReservesSection = () => {
  return (
    <>
      <Container overflowY="auto" minW="918px">
        <ReserveHeaders />
        <VStack w="full" px={{ base: 6, lg: 0 }}>
          <VStack w="full" position="relative">
            <ReserveItem />
            <ReserveItem />
            <ReserveItem />
            <AbsoluteExtrasOverlay />
          </VStack>
          {/* <IconButton
            icon={<CiCircleChevDown />}
            variant="ghost"
            fontSize="24px"
            textAlign="center"
          /> */}
        </VStack>
      </Container>
    </>
  )
}
