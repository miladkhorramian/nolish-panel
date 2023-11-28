import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Container from "@/components/common/Container"
import { Heading, HStack, Flex, Spacer } from "@chakra-ui/react"
import { Samples } from "@/components/services/Samples"
import { ServiceItem } from "@/components/services/ServiceItem"

import { getServices } from "@/features/services/serviceSlice"

const Services = () => {
  const dispatch = useDispatch()
  const { services } = useSelector(state => state.service)

  useEffect(() => {
    dispatch(getServices())
  }, [])

  return (
    <Container my={12}>
      <Flex alignItems="center" mb={8} wrap="nowrap">
        <Heading size="sm" color="gray.600">
          لیست خدمات‌
        </Heading>
        <Spacer />
      </Flex>
      <HStack overflow="auto" spacing={2} pb={4}>
        {services.map(service => (
          <ServiceItem service={service} />
        ))}
      </HStack>
      <Samples />
    </Container>
  )
}

export default Services
