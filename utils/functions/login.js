import { setCookie } from "cookies-next"
import { axios } from "@/app/axios"

export default async function login(data) {
  try {
    const expires = new Date()
    expires.setDate(expires.getDate() + 30)

    const response = await axios.post("/auth/login", data)
    console.log(response)

    setCookie("token", response.data.plainTextToken, { expires })

    const {
      data: { role },
    } = await axios.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${response.data.plainTextToken}`,
      },
    })
    setCookie("role", role, { expires })

    window.location.replace("/")
  } catch (error) {
    const { message, response } = error
    console.log(response)
    throw message
  }
}
