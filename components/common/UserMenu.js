import { NextLink } from "next/link"
import { useRef, useEffect } from "react"
import { getCookie } from "cookies-next"
import { useSelector, useDispatch } from "react-redux"
import {
  Avatar,
  Text,
  HStack,
  Button,
  useDisclosure,
  Box,
  Icon,
  VStack,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react"
import { toggleMenu, closeMenu, getUserData } from "@/features/user/userSlice"
import { CiLogout, CiUser, CiViewList } from "react-icons/ci"
import logout from "@/utils/functions/logout"
import isObjEmpty from "@/utils/validation/isObjEmpty.js"

const UserMenu = ({ menuOpen, menuToggle, menuIsOpen, menuClose }) => {
  const { isOpen, onToggle } = useDisclosure()
  const { show, data } = useSelector(state => state.user)

  const menuRef = useRef(null)
  const dispatch = useDispatch()

  const token = getCookie("token")

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        if (!event.target.classList.contains("user-menu")) {
          dispatch(closeMenu())
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuRef])

  useEffect(() => {
    if (isObjEmpty(data)) {
      dispatch(getUserData())
    }
  }, [])

  return (
    <>
      <HStack
        ref={menuRef}
        as={Button}
        variant="ghost"
        _hover={{ background: "transparent" }}
        color="white"
        onClick={() => dispatch(toggleMenu())}
        position="relative"
      >
        <Text>{data?.first_name}</Text>
        <Avatar src={data?.avatar} name={data?.first_name + " " + data?.last_name} />
      </HStack>
      {show ? (
        <Box
          bg="white"
          position="absolute"
          top="4.5rem"
          borderRadius="0 0 12px 12px"
          left="0"
          minW="160px"
          display={show ? "block" : "none"}
          color="gray.800"
          shadow="md"
          opacity={show ? 1 : 0}
          transition="all .3s ease-in"
          zIndex={999}
        >
          <VStack alignItems="flex-start" spacing={0}>
            <ChakraLink
              as={NextLink}
              href="/user/profile"
              p={2}
              _hover={{ textDecoration: "none" }}
              className="user-menu"
            >
              <Icon as={CiUser} ml={2} mb={-1} />
              پروفایل
            </ChakraLink>
            <ChakraLink
              as={NextLink}
              href="/reserves"
              p={2}
              _hover={{ textDecoration: "none" }}
              className="user-menu"
            >
              <Icon as={CiViewList} ml={2} mb={-1} />
              رزروها
            </ChakraLink>
            <Button
              leftIcon={<CiLogout mt={2} />}
              w="full"
              px={4}
              py={2}
              borderRadius="0 0 12px 12px"
              className="user-menu"
              onClick={() => logout()}
            >
              خروج
            </Button>
          </VStack>
        </Box>
      ) : null}
    </>
  )
}

export default UserMenu
