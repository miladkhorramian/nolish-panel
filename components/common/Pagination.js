import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { HStack, Button, Input } from "@chakra-ui/react"
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons"

export default function Pagination({ meta }) {
  const { current_page, last_page, links, from, to, per_page } = meta

  const [current, setCurrent] = useState(current_page || 1)

  const router = useRouter()

  const pageNumbers = []
  for (let i = 1; i <= last_page; i++) {
    pageNumbers.push(i)
  }

  const handlePrevClick = () => {
    if (current > 1) {
      setCurrent(current - 1)
    }
  }

  const handleNextClick = () => {
    if (current < last_page) {
      setCurrent(current + 1)
    }
  }

  useEffect(() => {
    console.log(router)
    router.push(`/admin/operators?page=${current}`)
  }, [current])

  return (
    <HStack m={4} justifyContent="left">
      <Button w={5} borderRadius="50%" onClick={() => setCurrent(1)}>
        «
      </Button>
      <Button w="5px" borderRadius="50%" onClick={handlePrevClick}>
        <ChevronRightIcon />
      </Button>
      {pageNumbers.map(number => (
        <Button
          key={number}
          w={5}
          borderRadius="50%"
          bg={current === number ? "blue.500" : "gray.200"}
          color={current === number ? "white" : "black"}
          onClick={() => setCurrent(number)}
        >
          {number}
        </Button>
      ))}
      <Button w="5px" borderRadius="50%" onClick={handleNextClick}>
        <ChevronLeftIcon />
      </Button>
      <Button w={5} borderRadius="50%" onClick={() => setCurrent(last_page)}>
        »
      </Button>
    </HStack>
  )
}
