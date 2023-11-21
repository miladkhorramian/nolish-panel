/* eslint-disable import/no-anonymous-default-export, react/display-name */

import loginImage from "@/public/images/login.jpg"
import { useState } from "react"
import { setCookie } from "cookies-next"
import NextImage from "next/image"
import NextLink from "next/link"
import {
  Box,
  Grid,
  Stack,
  Card,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  IconButton,
  Button,
  Image,
  InputGroup,
  InputRightElement,
  Link,
  useToast,
} from "@chakra-ui/react"

import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons"
import { CiUnread, CiRead } from "react-icons/ci"

import { axios } from "@/app/axios"

// eslint-disable-next-line react/display-name,import/no-anonymous-default-export
export default function () {
  const isError = false

  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [secondPassword, setSecondPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showSecondPassword, setShowSecondPassword] = useState("")

  const toast = useToast()

  const onSubmit = async e => {
    e.preventDefault()

    if (password !== secondPassword)
      toast({
        status: "error",
        description: "رمز ورود یکسان نیستند.",
        position: "top",
      })
    else {
      const data = {
        first_name: name,
        last_name: lastname,
        email,
        password,
      }
      const response = await axios.post("/auth/register", data)

      if (response.status === 201) login()

      console.log(response)
    }
  }

  const login = async () => {
    const data = { email, password }
    const response = await axios.post("/auth/login", data)

    if (response.status === 200) {
      setCookie("token", response.data.plainTextToken)
      router.push("/")
    }
  }

  return (
    <>
      <Grid w="100vw" h="100vh" placeItems="center" bg="purple.50">
        <Card>
          <Grid
            templateColumns={{ base: "100%", lg: "repeat(2, 1fr)" }}
            w={{ base: "100%", lg: "auto" }}
          >
            <Box
              w="40vw"
              aspectRatio="1/1"
              display={{ base: "none", lg: "block" }}
              bg={` url(${loginImage.src}) center/cover no-repeat`}
              borderRadius=" 0 12px 12px 0"
            >
              {/* <NextImage src={loginImage} width="100%" height="100%" /> */}
            </Box>
            <Grid placeItems="center" bg="purple.300" borderRadius="12px 0 0 12px">
              <Card p={16} shadow="none">
                <form style={{ width: "360px" }} onSubmit={onSubmit}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                    <FormControl isRequired mb={4}>
                      <FormLabel fontSize="md">نام</FormLabel>
                      <Input
                        type="text"
                        placeholder="نام خود را وارد کنید"
                        value={name}
                        onChange={({ target: { value } }) => setName(value)}
                      />
                      {!isError && <FormErrorMessage>نام وارد نشده است</FormErrorMessage>}
                    </FormControl>

                    <FormControl isRequired mb={4}>
                      <FormLabel fontSize="md">نام خانوادگی</FormLabel>
                      <Input
                        type="text"
                        placeholder="نام خانوادگی خود را وارد کنید"
                        value={lastname}
                        onChange={({ target: { value } }) => setLastname(value)}
                      />
                      {!isError && <FormErrorMessage>نام خانوادگی وارد نشده است</FormErrorMessage>}
                    </FormControl>
                  </Grid>
                  {/* Email */}
                  <FormControl isRequired mb={4}>
                    <FormLabel fontSize="md">ایمیل</FormLabel>
                    <Input
                      type="email"
                      placeholder="ایمیل خود را وارد کنید"
                      value={email}
                      onChange={({ target: { value } }) => setEmail(value)}
                      dir={email === "" ? "rtl" : "ltr"}
                    />
                    {!isError && <FormErrorMessage>ایمیل وارد نشده است</FormErrorMessage>}
                  </FormControl>
                  <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                    {/* Password */}
                    <FormControl isRequired mb={4}>
                      <FormLabel fontSize="md">رمز ورود</FormLabel>
                      <InputGroup size="md">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="رمز ورود خود را وارد کنید"
                          value={password}
                          onChange={({ target: { value } }) => setPassword(value)}
                        />
                        <InputRightElement>
                          <IconButton
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowPassword(!showPassword)}
                            icon={showPassword ? <CiRead /> : <CiUnread />}
                            colorScheme="purple"
                          />
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    {/* Repeat Password */}
                    <FormControl isRequired mb={4}>
                      <FormLabel fontSize="md">تکرار رمز ورود</FormLabel>
                      <InputGroup size="md">
                        <Input
                          type={showSecondPassword ? "text" : "password"}
                          placeholder="رمز ورود خود را مجددا وارد کنید"
                          value={secondPassword}
                          onChange={({ target: { value } }) => setSecondPassword(value)}
                        />
                        <InputRightElement>
                          <IconButton
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowSecondPassword(!showPassword)}
                            icon={showPassword ? <CiRead /> : <CiUnread />}
                            colorScheme="purple"
                          />
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  </Grid>
                  <Button type="submit" w="full" colorScheme="purple">
                    ورود
                  </Button>
                </form>
              </Card>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  )
}
