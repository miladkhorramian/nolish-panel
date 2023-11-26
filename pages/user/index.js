import { useRouter } from "next/router"

const User = () => {
  const router = useRouter()

  React.useEffect(() => {
    router.push("/user/profile")
  }, [])

  return null
}

export default User
