import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { NextLink } from "next/link"

import Container from "@/components/common/Container"
import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  Flex,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
  useDisclosure,
  Card,
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react"
import { FaHome, FaUser, FaCog } from "react-icons/fa"
import {
  PiAddressBookThin,
  PiUsersThreeThin,
  PiGearThin,
  PiMarkerCircleThin,
  PiListChecksThin,
  PiHouseSimpleThin,
} from "react-icons/pi"

const linkProps = {
  p: 4,
  _hover: { textDecoration: "none" },
}

const AdminOptions = () => {
  return (
    <>
      <Link as={NextLink} to="/" {...linkProps}>
        <Flex align="center">
          <Icon as={PiHouseSimpleThin} ml={2} boxSize={6} />
          <Text>خانه</Text>
        </Flex>
      </Link>
      <Link as={NextLink} to="/profile" {...linkProps}>
        <Flex align="center">
          <Icon as={PiListChecksThin} ml={2} boxSize={6} />
          <Text>رزرو‌ها</Text>
        </Flex>
      </Link>
      <Link as={NextLink} to="/settings" {...linkProps}>
        <Flex align="center">
          <Icon as={PiMarkerCircleThin} ml={2} boxSize={6} />
          <Text>سرویس‌ها</Text>
        </Flex>
      </Link>
      <Link as={NextLink} to="/settings" {...linkProps}>
        <Flex align="center">
          <Icon as={PiUsersThreeThin} ml={2} boxSize={6} />
          <Text>آرایشگران</Text>
        </Flex>
      </Link>
      <Link as={NextLink} to="/settings" {...linkProps}>
        <Flex align="center">
          <Icon as={PiAddressBookThin} ml={2} boxSize={6} />
          <Text>کاربران</Text>
        </Flex>
      </Link>
      <Link as={NextLink} to="/settings" {...linkProps}>
        <Flex align="center">
          <Icon as={PiGearThin} ml={2} boxSize={6} />
          <Text>تنظیمات</Text>
        </Flex>
      </Link>
    </>
  )
}

const MobileDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <>
      <IconButton
        ref={btnRef}
        icon={<Icon as={FaCog} />}
        aria-label="Settings"
        onClick={onOpen}
        position="fixed"
        bottom="20px"
        left="20px"
        zIndex="1"
        display={{ base: "block", lg: "none" }}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>پنل مدیریت</DrawerHeader>
          <DrawerBody p={0}>
            <AdminOptions />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

const RightPanel = () => {
  return (
    <Box
      w="25%"
      h="100%"
      py={4}
      position="fixed"
      right="0"
      display={{ base: "none", lg: "flex" }}
      flexDirection="column"
      bg="pink.50"
      color="gray.700"
    >
      <Heading size="md" mb={4} mr={4}>
        پنل مدیریت
      </Heading>
      <AdminOptions />
    </Box>
  )
}

export default function Admin() {
  return (
    <>
      <Flex height="100vh">
          <RightPanel />
      </Flex>
      <MobileDrawer />
    </>
  )
}
