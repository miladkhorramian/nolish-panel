import { useState } from "react"
import { Avatar, Box, Flex, Text, IconButton, Button } from "@chakra-ui/react"

import { CiTrash } from "react-icons/ci"

export default function UserItem({ onDelete, firstName, lastName, avatar, email }) {
  const [extras, showExtras] = useState(false)

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      w="full"
      onMouseEnter={() => showExtras(true)}
      onMouseLeave={() => showExtras(false)}
    >
      <Flex alignItems="center" p="4">
        <Avatar name={`${firstName} ${lastName}`} src={avatar} />
        <Box mr="2">
          <Flex alignItems="center">
            <Text fontWeight="bold" ml={2}>
              {firstName} {lastName}
            </Text>
            {/* <IconButton
              icon={<CiTrash />}
              colorScheme="red"
              variant="unstyled"
              p={0}
              opacity={extras ? 1 : 0}
            /> */}
            <Button colorSheme="red" variant="ghost" opacity={extras ? 1 : 0} onClick={onDelete}>
              حذف
            </Button>
          </Flex>
          <Text fontSize="sm" color="gray.500">
            {email}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}
