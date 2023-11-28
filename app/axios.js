import a from "axios"
import { getCookie } from "cookies-next"

export const axios = a.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

axios.interceptors.request.use(config => {
  const token = getCookie("token")

  if (token && !config.url.includes("login") && !config.url.includes("register"))
    config.headers.Authorization = `Bearer ${token}`

  return config
})

// axios.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     if (error.response.status === 401) location.href = "/user/login"
//     console.log(error)
//     return Promise.reject(error)
//   },
// )
