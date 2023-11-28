import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import AdminLayout from "@/components/Layouts/AdminLayout"
import { useToast, Box, Heading, HStack, VStack, IconButton, Grid } from "@chakra-ui/react"
import { PiArrowsCounterClockwise } from "react-icons/pi"
import { AddService } from "@/components/admin/AddService"
import { ServiceItem } from "@/components/services/ServiceItem"

import { axios } from "@/app/axios"
import { setServices } from "@/features/admin/adminSlice"

export default function AdminServices() {
  const { services } = useSelector(state => state.admin)

  const dispatch = useDispatch()
  const toast = useToast()

  const getServices = async () => {
    try {
      const response = await axios.get("/service")
      dispatch(setServices(response.data))
    } catch (error) {
      const { message } = error
      toast({
        description: message,
      })
    }
  }

  useEffect(() => {
    getServices()
  }, [])

  return (
    <>
      <AdminLayout>
        <Box py={4} px={6} w="full">
          <HStack mb={6} justifyContent="space-between">
            <HStack>
              <Heading size="md" color="gray.700">
                لیست سرویس‌ها
              </Heading>
              <IconButton
                icon={<PiArrowsCounterClockwise />}
                variant="outline"
                colorScheme="gray"
                isRound={true}
                onClick={() => getServices()}
              />
            </HStack>
            <AddService />
          </HStack>
          <Grid
            w="full"
            gap={4}
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
          >
            {services.map(service => (
              <ServiceItem service={service} admin={true} />
            ))}
          </Grid>
        </Box>
      </AdminLayout>
    </>
  )
}
