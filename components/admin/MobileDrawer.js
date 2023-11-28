import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { NextLink } from "next/link"
import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  Icon,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react"
import { PiList } from "react-icons/pi"
import { AdminOptions } from "./AdminOptions"

export const MobileDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <>
      <IconButton
        ref={btnRef}
        icon={<Icon as={PiList} />}
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
          <DrawerBody py={4} px={6}>
            <AdminOptions />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
