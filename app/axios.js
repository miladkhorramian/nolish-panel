import a from "axios"
import { getCookie } from "cookies-next"

export const axios = a.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${getCookie("token")}`,
  },
})
