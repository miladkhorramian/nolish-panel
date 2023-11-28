import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import AdminLayout from "@/components/Layouts/AdminLayout"
import { useToast, Grid, GridItem, HStack, Heading, IconButton, Box } from "@chakra-ui/react"
import UserItem from "@/components/admin/UserItem"
import Pagination from "@/components/common/Pagination"
import { AddOperator } from "@/components/admin/AddOperator"
import { PiArrowsCounterClockwise } from "react-icons/pi"

import { axios } from "@/app/axios"
import { setOperators } from "@/features/admin/adminSlice"

export default function AdminOperators() {
  const [pagination, setPagination] = useState({})
  const { operators } = useSelector(state => state.admin)

  const dispatch = useDispatch()
  const toast = useToast()
  const router = useRouter()

  const { page } = router.query

  const getOperators = async () => {
    try {
      const response = await axios.get("/operator", {
        params: {
          page: page || undefined,
        },
      })
      //   const operators = response.data.filter(user => user.role === "operator")
      setPagination(response.data.meta)
      dispatch(setOperators(response.data.data))
    } catch (error) {
      const { message } = error
      toast({
        description: message,
        status: "error",
      })
    }
  }

  const deleteOperator = async id => {
    try {
      await axios.delete(`/operator/${id}`)

      toast({
        description: "اپراتور حذف شده است.",
        status: "success",
      })

      getOperators()
    } catch (error) {
      const { message } = error
      toast({
        description: message,
        status: "error",
      })
    }
  }

  useEffect(() => {
    getOperators()
  }, [page])

  return (
    <AdminLayout>
      <Box p={4}>
        <HStack mb={6} justifyContent="space-between">
          <HStack>
            <Heading size="md" color="gray.700">
              لیست آرایشگران
            </Heading>
            <IconButton
              icon={<PiArrowsCounterClockwise />}
              variant="outline"
              colorScheme="gray"
              isRound={true}
              onClick={() => getOperators()}
            />
          </HStack>
          <AddOperator />
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
          {operators.map(operator => (
            <GridItem key={operator.email}>
              <UserItem
                onDelete={() => deleteOperator(operator.id)}
                firstName={operator.first_name}
                lastName={operator.last_name}
                email={operator.email}
                avatar={operator.avatar}
              />
            </GridItem>
          ))}
        </Grid>
        <Pagination meta={pagination} />
      </Box>
    </AdminLayout>
  )
}
