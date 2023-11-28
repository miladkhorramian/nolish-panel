import { useState, useEffect } from "react"
import {
  Card,
  Heading,
  Text,
  Icon,
  HStack,
  Box,
  Grid,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react"
import { CiClock2, CiDollar, CiEdit, CiTrash } from "react-icons/ci"
import { axios } from "@/app/axios"
import Container from "@/components/common/Container"
import { useRouter } from "next/router"
import AdminLayout from "@/components/Layouts/AdminLayout"

export default function ServiceDetail() {
  const [timeCost, setTimeCost] = useState("")
  const [moneyCost, setMoneyCost] = useState("")
  const [name, setName] = useState("")
  const [editting, enableEditting] = useState(false)

  const toast = useToast()
  const router = useRouter()

  console.log(router)
  const { id } = router.query

  const fetchData = async () => {
    try {
      const response = await axios.get(`/service/${id}`)
      setTimeCost(response.data.time_cost)
      setMoneyCost(response.data.money_cost)
      setName(response.data.name)
    } catch (error) {
      console.error(error)
    }
  }

  const onEdit = async event => {
    event.preventDefault()

    try {
      const data = {
        name: name,
        money_cost: moneyCost,
        time_cost: timeCost,
      }

      await axios.put(`/service/${id}`, data)
      fetchData()
    } catch (error) {
      const { message, response } = error
      console.log(response)
      toast({
        description: message,
        status: "error",
        duration: 1500,
        position: "top right",
      })
    }
  }

  const onDelete = async () => {
    try {
      await axios.delete(`/service/${id}`)
      router.back()
    } catch (error) {
      const { message, response } = error
      console.log(response)
      toast({
        description: message,
        status: "error",
        duration: 1500,
        position: "top right",
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  return (
    <>
      <AdminLayout>
        <Box p={4}>
          <Grid gap={4} templateColumns={{ base: "100%", md: "240px auto" }}>
            <VStack as={Grid} justifyContent="space-between" px={6} py={10}>
              <Heading size="sm" mb={8}>
                اطلاعات سرویس
              </Heading>
              <HStack>
                <Button
                  leftIcon={!editting ? <CiEdit /> : null}
                  colorScheme="gray"
                  onClick={() => enableEditting(!editting)}
                >
                  {editting ? "لغو" : "ویرایش"}
                </Button>
                <Button
                  leftIcon={<CiTrash />}
                  colorScheme="red"
                  variant="outline"
                  isDisabled={editting}
                  onClick={onDelete}
                >
                  حذف
                </Button>
              </HStack>
            </VStack>
            <Card bg="gray.50" p={6} minW="240px">
              <form onSubmit={onEdit}>
                <FormControl isRequired isReadOnly={!editting} mb={4}>
                  <FormLabel>نام سرویس</FormLabel>
                  <Input type="text" value={name} onChange={event => setName(event.target.value)} />
                </FormControl>
                <HStack w="full" justifyContent="space-between">
                  <FormControl isRequired isReadOnly={!editting}>
                    <HStack spacing={2}>
                      <Icon as={CiDollar} mt={-1} />
                      <FormLabel>هزینه:</FormLabel>
                    </HStack>
                    <Input
                      type="text"
                      value={moneyCost}
                      onChange={event => setMoneyCost(event.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired isReadOnly={!editting}>
                    <HStack spacing={2}>
                      <Icon as={CiClock2} mt={-1} />
                      <FormLabel>مدت زمان:</FormLabel>
                    </HStack>
                    <Input
                      type="text"
                      value={timeCost}
                      onChange={event => setTimeCost(event.target.value)}
                    />
                  </FormControl>
                </HStack>
                <Button colorScheme="blue" mt={4} type="submit" isDisabled={!editting}>
                  ذخیره
                </Button>
              </form>
            </Card>
          </Grid>
        </Box>
      </AdminLayout>
    </>
  )
}
