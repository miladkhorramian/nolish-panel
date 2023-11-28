import { useState } from "react"
import { Input, Button, Image, Flex, VStack, Heading, useToast } from "@chakra-ui/react"

import { axios } from "@/app/axios"

export const SearchTags = () => {
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
      <Heading size="md">جستجو</Heading>
      <VStack>
        <Input
          placeholder="کلمه مورد نظر خود را تایپ نمایید..."
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <Button onClick={searchImages}>جستجو</Button>
      </VStack>
      <Flex wrap="wrap">
        {images.map(image => (
          <Image
            key={image.id}
            src={image.file}
            alt={image.file}
            h="150px"
            w="auto"
            borderRadius={12}
          />
        ))}
      </Flex>
    </>
  )
}
