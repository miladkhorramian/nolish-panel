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
  Button,
  useDisclosure,
  Input,
  useToast,
} from "@chakra-ui/react"
import DatePicker from "react-datepicker2"
import Select from "react-select"
import { Calendar } from "react-datepicker2"

import jalaali from "moment-jalaali"

export const AddReserve = ({ updater = () => {} }) => {
  const date = new Date()

  const [serviceWorkers, setServiceWorkers] = useState([])
  const [services, setServices] = useState([])
  const [selectedServiceWorker, setSelectedServiceWorker] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [reserveTime, setReserveTime] = useState(new Date().toTimeString("fa-ir"))
  const [reserveDate, setReserveDate] = useState(new Date().toDateString("fa-ir"))
  const [reservedAt, setReservedAt] = useState(jalaali(new Date()))

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  useEffect(() => {
    async function fetchServiceWorkers() {
      const response = await axios.get("/operator")
      setServiceWorkers(response.data.data)
    }

    async function fetchServices() {
      const response = await axios.get("/service")
      setServices(response.data)
    }

    fetchServiceWorkers()
    fetchServices()
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    const str = new Date(reservedAt).toLocaleDateString("en-us").split("/")
    const date = str[2] + "-" + str[0] + "-" + str[1]

    const reserved_at =
      date + " " + new Date(reservedAt).toLocaleTimeString("en-us", { hour12: false })

    const requestBody = {
      service_worker_id: selectedServiceWorker.value,
      service_id: selectedService.value,
      reserved_at: reserved_at,
    }

    try {
      await axios.post("/reserve", requestBody)
      updater()
      onClose()
    } catch (error) {
      const { response, message } = error
      console.log(1)
      toast({
        description: response.data.message,
        status: "error",
        position: "top",
      })
      console.log(message)
      console.log(response)
    }
  }

  useEffect(() => {
    console.log(
      new Date(reservedAt).toLocaleDateString("en-us"),
      new Date(reservedAt).toLocaleTimeString("en-us", { hour12: false }),
      // new Date(reservedAt).toLocaleString("en-us", { hour12: false }),
    )
  }, [reservedAt])

  return (
    <>
      <Button onClick={onOpen}>افزودن</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ایجاد رزرو جدید</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel>متخصص</FormLabel>
                <Select
                  options={serviceWorkers.map(serviceWorker => ({
                    value: serviceWorker.id,
                    label: `${serviceWorker.first_name} ${serviceWorker.last_name}`,
                  }))}
                  value={selectedServiceWorker}
                  onChange={selectedOption => setSelectedServiceWorker(selectedOption)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>سرویس</FormLabel>
                <Select
                  options={services.map(service => ({
                    value: service.id,
                    label: service.name,
                  }))}
                  value={selectedService}
                  onChange={selectedOption => setSelectedService(selectedOption)}
                />
              </FormControl>

              <FormControl mt={4} id="date-time-picker">
                <FormLabel>روز</FormLabel>
                <DatePicker
                  value={reservedAt}
                  isGregorian={false}
                  onChange={val => setReservedAt(val)}
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

/* <FormControl mt={4} id="date-time-picker">
<FormLabel>ساعت</FormLabel>
<Input
  type="time"
  value={reserveTime}
  onChange={e => setReserveTime(e.target.value)}
/>
</FormControl>

<FormControl mt={4} id="date-time-picker">
<FormLabel>روز</FormLabel>
<Calendar
  value={reservedAt}
  isGregorian={false}
  onChange={val => setReservedAt(val)}
/>
</FormControl> */

/*
              <FormControl mt={4} id="date-time-picker">
                <FormLabel>روز</FormLabel>
                <Input
                  type="date"
                  value={reserveDate}
                  onChange={e => setReserveDate(e.target.value)}
                />
              </FormControl>


*/
