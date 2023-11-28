import { NextLink } from "next/link"
import { Card, Heading, HStack, Icon, Text, Link } from "@chakra-ui/react"

import { CiDollar, CiClock2 } from "react-icons/ci"

export const ServiceItem = ({ service, admin = false }) => {
  return (
    <Link
      as={NextLink}
      href={admin ? `/admin/services/${service.id}` : `/services/${service.id}`}
      _hover={{ textDecoration: "none" }}
    >
      <Card bg="pink.100" p={6} minW="240px">
        <Heading size="sm" noOfLines={3} mb={4}>
          {service.name}
        </Heading>
        <HStack w="full" justifyContent="space-between">
          <HStack spacing={2}>
            <Icon as={CiDollar} />
            <Text>{service.money_cost}</Text>
          </HStack>
          <HStack spacing={2}>
            <Icon as={CiClock2} />
            <Text>{service.time_cost}</Text>
          </HStack>
        </HStack>
      </Card>
    </Link>
  )
}
