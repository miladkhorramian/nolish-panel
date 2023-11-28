import { useState } from "react"
import { Center, Input, IconButton, Flex, Image, Heading, useToast } from "@chakra-ui/react"
import { PiMagnifyingGlass } from "react-icons/pi"

import { axios } from "@/app/axios"

export const SearchInput = () => {
  const [query, setQuery] = useState("")
  const [images, setImages] = useState([])

  const toast = useToast()

  const searchImages = async () => {
    try {
      const response = await axios.get(`/photos/${query}`)
      setImages(response.data.data)
    } catch (error) {
      console.log(error.response)
      toast({
        description: error.message,
        status: "error",
      })
    }
  }

  return (
    <>
      <Heading size="md" mt={12} mb={8} textAlign="center" color="gray.500">
        میان نمونه‌کارهای ما جستجو کنید...
      </Heading>
      <Center maxW="700px" w="full" mx="auto" mb={8}>
        <Input
          placeholder="جستجو..."
          ml={2}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <IconButton
          icon={<PiMagnifyingGlass />}
          isRound={true}
          colorScheme="gray"
          onClick={() => searchImages()}
        />
      </Center>
      <Flex wrap="wrap">
        {images.map(image => (
          <Image
            key={image.id}
            src={image.file}
            alt={image.file}
            h="200px"
            w="auto"
            borderRadius={12}
          />
        ))}
      </Flex>
    </>
  )
}
