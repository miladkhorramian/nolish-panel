import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { CiMenuBurger } from "react-icons/ci"
import {
  Box,
  HStack,
  Button,
  Collapse,
  IconButton,
  Avatar,
  Card,
  Link as ChakraLink,
  Text,
  useDisclosure,
} from "@chakra-ui/react"

import UserMenu from "./UserMenu"

const LinkStyle = {
  textDecoration: "none",
}

const RightPanel = ({ isOpen }) => {
  return (
    <>
      <Collapse in={isOpen} animateOpacity>
        <Box bg="red">some</Box>
      </Collapse>
    </>
  )
}

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure()
  const {
    isOpen: menuIsOpen,
    onToggle: menuToggle,
    onOpen: menuOpen,
    onClose: menuClose,
  } = useDisclosure()
  const { show } = useSelector(state => state.user)

  const router = useRouter()

  return (
    <>
      <HStack
        as={Card}
        w={{ base: "full", lg: "90vw", xl: "80vw" }}
        mx={{ base: "0", md: "auto" }}
        bg="pink.600"
        p={4}
        my={{ base: 0, lg: 2 }}
        color="white"
        justifyContent="space-between"
        // borderRadius={{ base: 0, lg: menuIsOpen ? "12px 12px 12px 0" : 12 }}
        borderRadius={{ base: 0, lg: 12 }}
        transition="all .3s ease-in"
      >
        <HStack spacing={4}>
          {/* Menu Button */}
          <IconButton
            icon={<CiMenuBurger />}
            color="white"
            variant="ghost"
            _hover={{ background: "pink.400" }}
            _active={{ background: "pink.400" }}
            onClick={onToggle}
          />
          {/* Links */}
          <ChakraLink as={NextLink} href="#" textDecoration="none" _hover={{ color: "pink.200" }}>
            خانه
          </ChakraLink>
          <ChakraLink as={NextLink} href="#" textDecoration="none" _hover={{ color: "pink.200" }}>
            خدمات
          </ChakraLink>
          <ChakraLink as={NextLink} href="#" textDecoration="none" _hover={{ color: "pink.200" }}>
            لیست متخصصان
          </ChakraLink>
          <ChakraLink as={NextLink} href="#" textDecoration="none" _hover={{ color: "pink.200" }}>
            درباره ما
          </ChakraLink>
        </HStack>
        <UserMenu
          menuOpen={menuOpen}
          menuToggle={menuToggle}
          menuIsOpen={menuIsOpen}
          menuClose={menuClose}
        />
      </HStack>
      <RightPanel isOpen={isOpen} />
    </>
  )
}

export default Navbar
