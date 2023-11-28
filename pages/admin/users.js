import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import AdminLayout from "@/components/Layouts/AdminLayout"
import { useToast, Grid, GridItem, HStack, Heading, IconButton } from "@chakra-ui/react"
import { PiArrowsCounterClockwise } from "react-icons/pi"

import UserItem from "@/components/admin/UserItem"

import { axios } from "@/app/axios"
import { setUsers } from "@/features/admin/adminSlice"

export default function AdminUsers() {
  const { users } = useSelector(state => state.admin)

  const dispatch = useDispatch()
  const toast = useToast()

  const getUsers = async () => {
    try {
      const response = await axios.get("/user")
      const users = response.data.filter(user => user.role === "customer")
      dispatch(setUsers(users))
    } catch (error) {
      const { message } = error
      toast({
        description: message,
      })
    }
  }

  const deleteUser = async id => {
    try {
      await axios.delete(`/user/${id}`)

      toast({
        description: "کاربر حذف شده است.",
        status: "success",
      })
    } catch (error) {
      const { message } = error
      toast({
        description: message,
        status: "error",
      })
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <AdminLayout>
      <HStack mb={6}>
        <Heading size="md" color="gray.700">
          لیست کاربران
        </Heading>
        <IconButton
          icon={<PiArrowsCounterClockwise />}
          variant="outline"
          colorScheme="gray"
          isRound={true}
          onClick={() => getUsers()}
        />
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
        {users.map(user => (
          <GridItem key={user.email}>
            <UserItem
              onDelete={() => deleteUser(user.id)}
              firstName={user.first_name}
              lastName={user.last_name}
              email={user.email}
              avatar={user.avatar}
            />
          </GridItem>
        ))}
      </Grid>
    </AdminLayout>
  )
}
