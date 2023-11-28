import { useEffect, useState } from "react"
import {
  FormControl,
  FormLabel,
  Stack,
  HStack,
  VStack,
  Input,
  IconButton,
  Tag,
  TagLabel,
  TagCloseButton,
  ScaleFade,
  AspectRatio,
  Button,
  Image,
  Flex,
  useToast,
  Heading,
} from "@chakra-ui/react"

import { AddIcon } from "@chakra-ui/icons"

import { axios } from "@/app/axios"

const inputResponsive = { base: "full", md: "sm" }

export const AddTag = () => {
  const [image, setImage] = useState(null)
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState([])

  const toast = useToast()

  const addTag = () => {
    if (tag !== "") {
      setTags([...tags, tag])
      setTag("")
    }
  }

  const deleteTag = tag => {
    console.log(tag)
    setTags(() => tags.filter(item => item !== tag))
  }

  const tagEnterKeypress = keypress => {
    if (keypress.key === "Enter") {
      keypress.preventDefault()
      addTag()
    }
  }

  const submitTag = async () => {
    if (!image || tags.length === 0) {
      toast({
        description: "ورودی های تگ هارا چک کنید",
        status: "error",
      })
      return
    }

    const formData = new FormData()
    formData.append("photo", image)
    tags.map((tag, index) => formData.append(`tags[${index}]`, tag))

    try {
      await axios.post("/tag", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setImage(null)
      setTags([])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Heading size="md" mb={4}>
        افزودن تگ
      </Heading>
      <Stack
        direction={{ base: "column", lg: "row" }}
        w="full"
        alignItems="center"
        justifyContent={{ base: "center", lg: "space-between" }}
        spacing={4}
      >
        <VStack mb={4} spacing={4}>
          <Image
            src={image && URL.createObjectURL(image)}
            alt
            w="300px"
            h="auto"
            borderRadius={12}
          />
          <HStack as={"form"} spacing={2}>
            <Button as="label" htmlFor="file" variant="outline">
              آپلود عکس
              <Input
                id="file"
                type="file"
                onChange={event => setImage(event.target.files[0])}
                display="none"
              />
            </Button>
            <Button onClick={() => submitTag()}>ثبت</Button>
          </HStack>
        </VStack>
        <FormControl mb={6}>
          <FormLabel fontSize="md">لیست برچسب‌ها</FormLabel>
          <HStack spacing={4} alignItems="flex-end">
            <Input
              placeholder="برچسب (tag) عکس را مشخص کنید"
              type="text"
              w={inputResponsive}
              value={tag}
              onChange={e => setTag(e.target.value)}
              onKeyPress={tagEnterKeypress}
            />
            <IconButton icon={<AddIcon />} isRound onClick={addTag} variant="outline" />
          </HStack>
          <HStack spacing={1} mt={4} wrap="wrap">
            {tags.map((item, index) => (
              <ScaleFade key={`tag-${index}`} initialScale={0.9} in={true}>
                <Tag size="md" key={item} variant="outline">
                  <TagLabel>{item}</TagLabel>
                  <TagCloseButton onClick={() => deleteTag(item)} />
                </Tag>
              </ScaleFade>
            ))}
          </HStack>
        </FormControl>
      </Stack>
    </>
  )
}
