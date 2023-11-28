import { useState } from "react"
import { Card, Text, Heading, Box, HStack } from "@chakra-ui/react"
import Container from "@/components/common/Container"

const bgImg = "/images/samples/1.jpg"

export const ServiceItem = () => {
  const [showContent, setShowContent] = useState(false)

  return (
    <Card
      bg={`linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.4)), url("${bgImg}") center/cover no-repeat`}
      w="full"
      h="250px"
      shadow="sm"
      //   borderRadius={12}
      //   placeItems="center"
      position="relative"
      onMouseEnter={() => setShowContent(true)}
      onMouseLeave={() => setShowContent(false)}
    >
      <Box
        w="full"
        h="auto"
        as={HStack}
        borderRadius="0 0 12px 12px"
        bg="black"
        opacity={showContent ? 1 : 0}
        position="absolute"
        bottom={showContent ? "-1px" : "-2rem"}
        transition="all .3s ease-in"
      >
        <HStack w="full" justifyContent="space-between" p={4}>
          <Heading size="sm" color="gray.200" noOfLines={1}>
            نام سرویس
          </Heading>
          <Text noOfLines={1} color="gray.200">
            کار کی؟
          </Text>
        </HStack>
      </Box>
    </Card>
  )
}

const Services = () => {
  return (
    <>
      <Container>
        <HStack justifyContent="space-between" mb={12}>
          <Heading size="md" color="gray.600">
            آخرین کارامون...
          </Heading>
          {/* <Button p={6}>ثبت رزرو جدید</Button> */}
        </HStack>
      </Container>
      <Container mb={12} overflow="hidden">
        <HStack spacing={4} overflowX="auto" w="auto">
          <ServiceItem />
          <ServiceItem />
          <ServiceItem />
          <ServiceItem />
          <ServiceItem />
          <ServiceItem />
          <ServiceItem />
          <ServiceItem />
        </HStack>
      </Container>
    </>
  )
}

export default Services
