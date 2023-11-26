import { setCookie } from "cookies-next"
import { axios } from "@/app/axios"

export default async function login(data) {
  try {
    const response = await axios.post("/auth/login", data)
    const {
      data: { role },
    } = await axios.get("/user/profile")

    const expires = new Date()
    expires.setDate(expires.getDate() + 30)

    setCookie("token", response.data.plainTextToken, { expires })
    setCookie("role", role, { expires })

    window.location.replace("/")
  } catch (error) {
    const { message, response } = error
    console.log(response)
    throw message
  }
}
