import { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent 
} from "@/components/ui/card"

import { api } from "@/lib/api"

function App() {
  const [totalSpent, setTotalSpent] = useState(0)

  useEffect(() => {
    async function fetchTotal() {
      const res = await api.expenses["total-spent"].$get()
      const data = await res.json()
      setTotalSpent(data.total)
    }
    fetchTotal()
  }, [])

  return (
    <Card className='w-[350px] m-auto'>
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount spent</CardDescription>
      </CardHeader>
      <CardContent>{totalSpent}</CardContent>
    </Card>
  )
}

export default App