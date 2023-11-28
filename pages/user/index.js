import { useEffect } from "react"
import { useRouter } from "next/router"

export default function User() {
  const router = useRouter()

  useEffect(() => {
    router.push("/user/profile")
  }, [])

  return null
}
