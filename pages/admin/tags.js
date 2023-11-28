import AdminLayout from "@/components/Layouts/AdminLayout"
import { Box } from "@chakra-ui/react"

import { AddTag } from "@/components/admin/AddTag"
import { SearchTags } from "@/components/admin/SearchTags"

export default function AdminTags() {
  return (
    <>
      <AdminLayout>
        <Box p={4}>
          <AddTag />
          <SearchTags />
        </Box>
      </AdminLayout>
    </>
  )
}
