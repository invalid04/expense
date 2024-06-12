import { createFileRoute } from '@tanstack/react-router'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const Route = createFileRoute('/expenses')({
  component: Expenses,
})

async function getAllExpenses() {
  const res = await api.expenses.$get()

  if (!res.ok) {
    throw new Error("server error")
  }

  const data = await res.json()
  return data
}

function Expenses() {

  const { isPending, error, data } = useQuery({ 
    queryKey: ['get-all-expenses'], 
    queryFn: getAllExpenses 
  })

  if (error) return 'Error occurred: ' + error.message 

  return (
    <div className='p-2 max-w-3xl m-auto'>
      <Table>
        <TableCaption>A list of all your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
          ? "..."
          : data?.expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.id}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell>{expense.amount}</TableCell>
              </TableRow>
            ))} 
        </TableBody>
      </Table>
    </div>
  )
}