import a from "axios"
import { getCookie } from "cookies-next"

export const axios = a.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Authorization: `Bearer ${getCookie("token")}`,
  },
})

axios.interceptors.request.use(config => {
  const token = getCookie("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  else if (!location.href.includes("register") && !location.href.includes("login"))
    window.location.replace("/user/login")

  return config
})
