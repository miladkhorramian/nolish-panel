import { NextLink } from "next/link"
import { Flex, Icon, Link, Text } from "@chakra-ui/react"
import { PiAddressBook, PiUsersThree, PiMarkerCircle, PiListChecks, PiTag } from "react-icons/pi"

const linkProps = {
  p: 4,
  _hover: { textDecoration: "none" },
}

export const AdminOptions = () => {
  return (
    <>
      <Link as={NextLink} href="/admin/reserves" {...linkProps}>
        <Flex align="center">
          <Icon as={PiListChecks} ml={2} boxSize={6} />
          <Text>رزرو‌ها</Text>
        </Flex>
      </Link>
      <Link as={NextLink} href="/admin/services" {...linkProps}>
        <Flex align="center">
          <Icon as={PiMarkerCircle} ml={2} boxSize={6} />
          <Text>سرویس‌ها</Text>
        </Flex>
      </Link>
      <Link as={NextLink} href="/admin/operators" {...linkProps}>
        <Flex align="center">
          <Icon as={PiUsersThree} ml={2} boxSize={6} />
          <Text>آرایشگران</Text>
        </Flex>
      </Link>
      <Link as={NextLink} href="/admin/users" {...linkProps}>
        <Flex align="center">
          <Icon as={PiAddressBook} ml={2} boxSize={6} />
          <Text>کاربران</Text>
        </Flex>
      </Link>
      <Link as={NextLink} href="/admin/tags" {...linkProps}>
        <Flex align="center">
          <Icon as={PiTag} ml={2} boxSize={6} />
          <Text>برچسب</Text>
        </Flex>
      </Link>
    </>
  )
}
