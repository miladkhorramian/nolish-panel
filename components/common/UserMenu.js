import { useSelector, useDispatch } from "react-redux"
import {
  Avatar,
  Text,
  HStack,
  Button,
  useDisclosure,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react"
import { toggleMenu } from "@/features/user/userSlice"
import { ChevronDownIcon } from "@chakra-ui/icons"

const UserMenu = ({ menuOpen, menuToggle, menuIsOpen, menuClose }) => {
  const { isOpen, onToggle } = useDisclosure()
  const { show } = useSelector(state => state.user)

  console.log(show)
  const dispatch = useDispatch()

  return (
    <>
      <Menu
        position="relative"
        // onOpen={menuOpen}
        // isOpen={menuIsOpen}
        // menuClose={menuClose}
        closeOnBlur={true}
      >
        <MenuButton
          bg="transparent"
          _hover={{ background: "transparent" }}
          color="white"
          // onClick={menuIsOpen ? menuClose : menuOpen}
        >
          <HStack>
            <Text>الی شافعی</Text>
            <Avatar src="" name="الی شافعی" />
          </HStack>
        </MenuButton>
        <MenuList
          color="gray.800"
          // borderRadius="0 0 12px 12px"
          borderRadius={12}
          shadow="md"
          position="absolute"
          right="-5.25rem"
          top=".5rem"
        >
          <MenuItem closeOnSelect={true}>Download</MenuItem>
          <MenuItem closeOnSelect={true}>Create a Copy</MenuItem>
          <MenuItem closeOnSelect={true}>Mark as Draft</MenuItem>
          <MenuItem closeOnSelect={true}>Delete</MenuItem>
          <MenuItem closeOnSelect={true}>Attend a Workshop</MenuItem>
        </MenuList>
      </Menu>
      {/* <HStack
        as={Button}
        variant="ghost"
        _hover={{ background: "transparent" }}
        color="white"
        onClick={() => dispatch(toggleMenu())}
        position="relative"
      >
        <Text>الی شفیعی</Text>
        <Avatar src="" name="الی شفیعی" />
      </HStack>
      <Box
        bg="white"
        position="absolute"
        top="4.5rem"
        p={4}
        borderRadius="0 0 12px 12px"
        left="0"
        minW="200px"
        display={show ? "block" : "none"}
        color="gray.800"
        shadow="md"
        opacity={show ? 1 : 0}
        transition="all .3s ease-in"
      >
        klasjkjad
      </Box> */}
    </>
  )
}

export default UserMenu
