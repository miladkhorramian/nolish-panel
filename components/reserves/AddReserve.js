import { useState } from "react"
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react"

export const AddReserve = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState("")
  const [clientName, setClientName] = useState("")
  const [operatorName, setOperatorName] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [timeCost, setTimeCost] = useState("")
  const [moneyCost, setMoneyCost] = useState("")

  const handleSubmit = event => {
    event.preventDefault()
    // Add your logic here to save the reserve item
    onClose()
  }

  return (
    <>
      <Button onClick={onOpen}>افزودن</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={12}>
          <ModalHeader>افزودن رزرو</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel>نام</FormLabel>
                <Input type="text" value={name} onChange={event => setName(event.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>نام مشتری</FormLabel>
                <Input
                  type="text"
                  value={clientName}
                  onChange={event => setClientName(event.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>نام اپراتور</FormLabel>
                <Input
                  type="text"
                  value={operatorName}
                  onChange={event => setOperatorName(event.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>تاریخ</FormLabel>
                <Input type="text" value={date} onChange={event => setDate(event.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>زمان</FormLabel>
                <Input type="text" value={time} onChange={event => setTime(event.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>مدت زمان</FormLabel>
                <Input
                  type="text"
                  value={timeCost}
                  onChange={event => setTimeCost(event.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>هزینه مالی</FormLabel>
                <Input
                  type="text"
                  value={moneyCost}
                  onChange={event => setMoneyCost(event.target.value)}
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
