import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent 
} from "@/components/ui/card"

import {
  useQuery,
} from '@tanstack/react-query'

import { api } from "@/lib/api"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
})

async function getTotalSpent() {
  const res = await api.expenses["total-spent"].$get()

  if (!res.ok) {
    throw new Error("server error")
  }

  const data = await res.json()
  return data
}

function Index() {

  const { isPending, error, data } = useQuery({ queryKey: ['get-total-spent'], queryFn: getTotalSpent })

  if (error) return 'Error occurred: ' + error.message 

  return (
    <Card className='w-[350px] m-auto'>
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount spent</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? "..." : data.total}</CardContent>
    </Card>
  )
}