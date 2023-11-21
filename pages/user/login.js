import { useRouter } from "next/router"
import { useState } from "react"
import { setCookie } from "cookies-next"
import {
  Box,
  Grid,
  Card,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  IconButton,
  Button,
  InputGroup,
  InputRightElement,
  Link,
  useToast,
} from "@chakra-ui/react"

import { axios } from "@/app/axios"
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons"
import { CiUnread, CiRead } from "react-icons/ci"
import loginImage from "@/public/images/login.jpg"

// eslint-disable-next-line react/display-name,import/no-anonymous-default-export
export default function () {
  const isError = false

  const toast = useToast()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async e => {
    e.preventDefault()

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
        <Card borderRadius="12px">
          <Grid
            templateColumns={{ base: "100%", lg: "repeat(2, 1fr)" }}
            w={{ base: "100%", lg: "auto" }}
          >
            <Grid
              placeItems="center"
              bg="purple.200"
              borderRadius={{ base: "12px", lg: "0 12px 12px 0" }}
            >
              <Card p={16} shadow="none" borderRadius={12}>
                <form onSubmit={onSubmit} style={{ width: "240px" }}>
                  <FormControl isRequired mb={4}>
                    <FormLabel fontSize="md">ایمیل</FormLabel>
                    <Input
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      type="email"
                      placeholder="ایمیل خود را وارد کنید"
                      dir={email === "" ? "rtl" : "ltr"}
                    />
                    {!isError && <FormErrorMessage>ایمیل وارد نشده است</FormErrorMessage>}
                  </FormControl>
                  <FormControl isRequired mb={4}>
                    <FormLabel fontSize="md">رمز ورود</FormLabel>
                    <InputGroup size="md">
                      <Input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder="رمز ورود خود را وارد کنید"
                      />
                      <InputRightElement>
                        <IconButton
                          size="sm"
                          variant="ghost"
                          onClick={() => setShowPassword(!showPassword)}
                          icon={showPassword ? <CiRead /> : <CiUnread />}
                          aria-label="Show Password"
                          colorScheme="purple"
                        />
                      </InputRightElement>
                    </InputGroup>
                    {!isError && <FormErrorMessage>رمز ورود وارد نشده است</FormErrorMessage>}
                    <Link
                      href="#"
                      fontSize="sm"
                      color="facebook.500"
                      noOfLines={1}
                      textAlign="center"
                      mt={2}
                    >
                      فراموشی رمز
                    </Link>
                  </FormControl>
                  <Button type="submit" w="full" colorScheme="purple">
                    ورود
                  </Button>
                </form>
              </Card>
            </Grid>
            <Box
              w="40vw"
              aspectRatio="1/1"
              display={{ base: "none", lg: "block" }}
              bg={` url(${loginImage.src}) center/cover no-repeat`}
              borderRadius="12px 0 0 12px"
            ></Box>
          </Grid>
        </Card>
      </Grid>
    </>
  )
}
