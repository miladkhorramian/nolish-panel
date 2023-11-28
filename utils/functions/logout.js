import { deleteCookie } from "cookies-next"
import { axios } from "@/app/axios"

export default async function logout() {
  try {
    await axios.post("/logout")
    deleteCookie("token")
    deleteCookie("role")

    location.href = "/user/login"
  } catch (error) {
    const { message, response } = error
    console.log(response)
    throw { message }
  }
}
