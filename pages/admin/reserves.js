import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import AdminLayout from "@/components/Layouts/AdminLayout"
import { useToast, Box, Heading, HStack, VStack, IconButton } from "@chakra-ui/react"
import { ReserveHeaders, ReserveItem } from "@/components/reserves/ReserveItem"
import { PiArrowsCounterClockwise } from "react-icons/pi"

import { axios } from "@/app/axios"
import { setReserves } from "@/features/admin/adminSlice"

export default function AdminReserves() {
  const { reserves } = useSelector(state => state.admin)

  const dispatch = useDispatch()
  const toast = useToast()

  const getReserves = async () => {
    try {
      const response = await axios.get("/reserve")
      dispatch(setReserves(response.data.reserves))
    } catch (error) {
      const { message } = error
      toast({
        description: message,
      })
    }
  }

  useEffect(() => {
    getReserves()
  }, [])

  return (
    <>
      <AdminLayout>
        <Box py={4} px={6} w="full">
          <HStack mb={6}>
            <Heading size="md" color="gray.700">
              لیست رزروها
            </Heading>
            <IconButton
              icon={<PiArrowsCounterClockwise />}
              variant="outline"
              colorScheme="gray"
              isRound={true}
              onClick={() => getReserves()}
            />
          </HStack>
          <VStack alignItems="flex-start" w="full">
            <ReserveHeaders />
            {reserves.map(reserve => (
              <ReserveItem
                reserve={reserve}
                updater={() =>
                  dispatch(setReserves(reserves.filter(item => reserve.id !== item.id)))
                }
              />
            ))}
          </VStack>
        </Box>
      </AdminLayout>
    </>
  )
}
