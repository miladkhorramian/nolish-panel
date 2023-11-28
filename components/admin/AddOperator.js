import { useState, useEffect } from "react"
import { axios } from "@/app/axios"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import Select from "react-select"

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "12px",
  }),
}

export const AddOperator = () => {
  const [services, setServices] = useState([])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [selectedServices, setSelectedServices] = useState([])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()

  const getServices = async () => {
    try {
      const response = await axios.get("/service")
      setServices(response.data)
    } catch (error) {
      toast({
        description: "خطا در دریافت اطلاعات سرویس‌ها",
        status: "error",
      })
    }
  }

  const onSubmit = async event => {
    event.preventDefault()

    const requestBody = {
      first_name: firstName,
      last_name: lastName,
      services: selectedServices.map(service => service.value),
    }

    console.log(requestBody)

    try {
      await axios.post("/operator", requestBody)
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getServices()
  }, [])

  return (
    <>
      <Button onClick={onOpen}>افزودن اپراتور جدید</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>فرم افزودن اپراتور جدید</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired={true}>
                <FormLabel>نام</FormLabel>
                <Input placeholder="نام" onChange={event => setFirstName(event.target.value)} />
              </FormControl>

              <FormControl isRequired={true} mt={4}>
                <FormLabel>نام خانوادگی</FormLabel>
                <Input
                  placeholder="نام خانوادگی"
                  onChange={event => setLastName(event.target.value)}
                />
              </FormControl>

              <FormControl isRequired={true} mt={4}>
                <FormLabel>سرویس‌ها</FormLabel>
                <Select
                  isMulti
                  label="انتخاب کنید."
                  styles={customStyles}
                  options={services.map(service => ({ value: service.id, label: service.name }))}
                  onChange={selectedOptions => setSelectedServices(selectedOptions)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                ذخیره
              </Button>
              <Button variant="ghost" onClick={onClose}>
                لغو
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
