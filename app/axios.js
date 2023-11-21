import a from "axios"

export const axios = a.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${document.cookie["token"]}`
  }
})
