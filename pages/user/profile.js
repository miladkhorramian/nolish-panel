import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Container from "@/components/common/Container"
import {
  AspectRatio,
  Avatar,
  Button,
  Input,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  VStack,
  Box,
  Heading,
  useToast,
} from "@chakra-ui/react"
import { CiEdit, CiCircleRemove, CiLock } from "react-icons/ci"

import { getUserData } from "@/features/user/userSlice"
import { axios } from "@/app/axios"

const Profile = () => {
  const { data } = useSelector(state => state.user)

  // states
  const [avatar, setAvatar] = useState("")
  const [image, setImage] = useState(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch()
  const toast = useToast()

  const handleSubmit = async submit => {
    submit.preventDefault()

    if (oldPassword !== "" && oldPassword === newPassword) {
      toast({
        description: "از پسورد قدیمی خود نمیتوانید اصتفاده کنید.",
        status: "error",
        timeout: 1500,
        position: "top right",
      })
      return
    }

    if (oldPassword !== "" && newPassword !== confirmPassword) {
      toast({
        description: "پسورد‌های وارد شده یکسان نیستند.",
        status: "error",
        timeout: 1500,
        position: "top right",
      })
      return
    }

    let d = {}

    if (firstName !== data.first_name) d.first_name = firstName
    if (lastName !== data.last_name) d.last_name = lastName
    if (newPassword === confirmPassword && newPassword !== oldPassword) d.password = newPassword
    try {
      const response = await axios.post("/user/update")

      dispatch(getUserData())
    } catch (error) {
      console.log(error.response)
    }
  }

  const uploadPicture = async () => {
    // event.preventDefault()

    const formData = new FormData()
    formData.append("photo", image)

    try {
      await axios.post("/user/profile/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      dispatch(getUserData())
    } catch (error) {
      console.log(error)
      toast({
        description: error.message,
        status: "error",
        timeout: 1500,
        position: "top right",
      })
    }
  }

  useEffect(() => {
    dispatch(getUserData())
  }, [])

  useEffect(() => {
    setFirstName(data.first_name)
    setLastName(data.last_name)
    setEmail(data.email)
    setAvatar(data.avatar)
  }, [data])

  useEffect(() => {
    uploadPicture()
  }, [image])

  return (
    <>
      <Container my={12}>
        <Grid gap={6} templateColumns={{ base: "100%" }}>
          <Box>
            <AspectRatio ratio={1} maxW="300px">
              <Avatar src={avatar} name={firstName + " " + lastName} alt w="full" />
            </AspectRatio>
            <form as={HStack}>
              <Button as="label" htmlFor="file" variant="ghost" colorScheme="gray">
                تغییر عکس
                <Input
                  id="file"
                  type="file"
                  onChange={event => setImage(event.target.files[0])}
                  display="none"
                />
              </Button>
            </form>
          </Box>
          <ProfileForm
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
          />
          <PasswordForm
            oldPassword={oldPassword}
            setOldPassword={setOldPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
          <Button colorScheme="blue" mt={4} onClick={handleSubmit}>
            ثبت تغییرات
          </Button>
        </Grid>
      </Container>
    </>
  )
}

const ProfileForm = ({ firstName, setFirstName, lastName, setLastName, email, setEmail }) => {
  const [editting, enableEditting] = useState(false)

  return (
    <VStack as="form" alignItems="start" w="full">
      <HStack w="full" justifyContent={{ base: "space-between" }} alignItems="center">
        <HStack spacing={2} justifyContent="space-between" w="full" color="gray.700">
          <Heading size="sm">اطلاعات کاربری</Heading>
          <Button
            leftIcon={<CiEdit />}
            colorScheme="gray"
            variant="ghost"
            onClick={() => enableEditting(!editting)}
          >
            ویرایش
          </Button>
        </HStack>
      </HStack>
      <Grid w="full" templateColumns="repeat(2, 1fr)" gap={4}>
        <FormControl isDisabled={!editting} isRequired={editting}>
          <FormLabel>نام</FormLabel>
          <Input
            type="text"
            placeholder="نام خود را وارد کنید"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </FormControl>
        <FormControl isDisabled={!editting} isRequired={editting}>
          <FormLabel>نام خانوادگی</FormLabel>
          <Input
            type="text"
            placeholder="نام خانوادگی خود را وارد کنید"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </FormControl>
      </Grid>
      <FormControl isReadOnly={true}>
        <FormLabel>آدرس ایمیل</FormLabel>
        <Input
          type="email"
          placeholder="آدرس ایمیل خود را وارد کنید"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FormControl>
    </VStack>
  )
}

const PasswordForm = ({
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  const [editting, enableEditting] = useState(false)

  return (
    <>
      <HStack spacing={2} justifyContent="space-between" w="full" color="gray.700">
        <Heading size="sm">رمز عبور</Heading>
        <Button
          leftIcon={<CiEdit />}
          colorScheme="gray"
          variant="ghost"
          onClick={() => enableEditting(!editting)}
        >
          ویرایش
        </Button>
      </HStack>
      <VStack as="form" alignItems="start" w="full">
        <FormControl isDisabled={!editting} isRequired={editting}>
          <FormLabel>رمز عبور فعلی</FormLabel>
          <Input
            type="password"
            placeholder="رمز عبور فعلی خود را وارد کنید"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
          />
        </FormControl>
        <FormControl isDisabled={!editting} isRequired={editting}>
          <FormLabel>رمز عبور جدید</FormLabel>
          <Input
            type="password"
            placeholder="رمز عبور جدید خود را وارد کنید"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </FormControl>
        <FormControl isDisabled={!editting} isRequired={editting}>
          <FormLabel>تکرار رمز عبور جدید</FormLabel>
          <Input
            type="password"
            placeholder="رمز عبور جدید خود را دوباره وارد کنید"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </FormControl>
      </VStack>
    </>
  )
}

export default Profile
