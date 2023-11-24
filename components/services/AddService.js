import { useState } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  HStack,
} from "@chakra-ui/react"
import { axios } from "@/app/axios"
import { addService } from "@/features/services/serviceSlice"
import { useDispatch } from "react-redux"

export const AddService = () => {
  const [name, setName] = useState("")
  const [moneyCost, setMoneyCost] = useState("")
  const [timeCost, setTimeCost] = useState("")

  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()

  const handleSubmit = async event => {
    event.preventDefault()

    const data = {
      name: name,
      money_cost: moneyCost,
      time_cost: timeCost,
    }

    try {
      const response = await axios.post("/service", data)
      if (response.status === 201) {
        dispatch(addService(response.data.service))
        onClose()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Button onClick={onOpen}>افزودن</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={12}>
          <ModalHeader>افزودن خدمات</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel>نام</FormLabel>
                <Input type="text" value={name} onChange={event => setName(event.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>هزینه مالی</FormLabel>
                <Input
                  type="number"
                  value={moneyCost}
                  onChange={event => setMoneyCost(event.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>مدت زمان</FormLabel>
                <Input
                  type="number"
                  value={timeCost}
                  onChange={event => setTimeCost(event.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter as={HStack} spacing={2}>
              <Button colorScheme="blue" mr={3} type="submit">
                ذخیره
              </Button>
              <Button colorScheme="red" variant="ghost" onClick={onClose}>
                لغو
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
