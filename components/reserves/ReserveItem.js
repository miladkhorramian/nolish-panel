import { useState } from "react"
import { Grid, GridItem, IconButton, Heading, Card, Text, useToast } from "@chakra-ui/react"
import { CiTrash } from "react-icons/ci"
import { replaceWithPersian } from "@/utils/functions/replaceDigits"
import { axios } from "@/app/axios"

const gridder = "20% 20% 20% 10% 10% 10% 9% 1%"

export const ReserveHeaders = () => (
  <Grid templateColumns={gridder} px={6} py={4} w="full" mb={2}>
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

export const ReserveItem = ({ reserve, updater = () => {} }) => {
  const [showExtraMenu, setShowExtraMenu] = useState(false)

  const toast = useToast()

  const onDelete = async () => {
    try {
      await axios.delete(`/reserve/${reserve.id}`)
      updater()
    } catch (error) {
      toast({
        description: "خطا در حذف رزرو",
        duration: 1500,
        position: "top right",
        status: "error",
      })
    }
  }

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
          <Text fontSize="sm">{reserve?.service?.name}</Text>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Text fontSize="sm">
            {reserve.customer
              ? `${reserve?.customer?.first_name} ${reserve?.customer?.last_name}`
              : "خودم"}
          </Text>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Text fontSize="sm">
            {reserve?.operator?.first_name} {reserve?.operator?.last_name}
          </Text>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Text fontSize="sm">{new Date(reserve?.reserved_at).toLocaleDateString("fa-ir")}</Text>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Text fontSize="sm">
            {new Date(reserve?.reserved_at).toLocaleTimeString("fa-ir", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Text fontSize="sm">{reserve?.service?.time_cost} دقیقه</Text>
        </GridItem>
        <GridItem as={Grid} placeItems="center">
          <Text fontSize="sm">{reserve?.service?.money_cost}</Text>
        </GridItem>
        <GridItem placeItems="center">
          <IconButton
            icon={<CiTrash />}
            variant="ghost"
            p={0}
            minW="15px"
            mr={2}
            colorScheme="red"
            opacity={showExtraMenu ? 1 : 0}
            transition="all .3s ease-in-out"
            onClick={onDelete}
          />
        </GridItem>
      </Grid>
    </>
  )
}
