import { createFileRoute } from '@tanstack/react-router'
import { getAllExpensesQueryOptions, loadingCreateExpenseQueryOptions } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/expenses')({
  component: Expenses,
})

function Expenses() {

  const { isPending, error, data } = useQuery(getAllExpensesQueryOptions)
  const { data: loadingCreateExpense } = useQuery(loadingCreateExpenseQueryOptions)

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
            <TableHead>Date</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loadingCreateExpense?.expense && (
              <TableRow>
                <TableCell className="font-medium">
                  <Skeleton className='h-4' />
                </TableCell>
                <TableCell>{loadingCreateExpense?.expense.title}</TableCell>
                <TableCell>{loadingCreateExpense?.expense.amount}</TableCell>
                <TableCell>
                  {loadingCreateExpense?.expense.date.split("T")[0]}
                </TableCell>
                <TableCell><Skeleton className='h-4' /></TableCell>
            </TableRow>
          )}

          {isPending
          ? Array(3) 
            .fill(0)
            .map((__, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium"><Skeleton className='h-4' /></TableCell>
                <TableCell><Skeleton className='h-4' /></TableCell>
                <TableCell><Skeleton className='h-4' /></TableCell>
                <TableCell><Skeleton className='h-4' /></TableCell>
                <TableCell><Skeleton className='h-4' /></TableCell>
              </TableRow>
            ))
          : data?.expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.id}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>
                  <Button variant='outline' size='icon'>
                    <Trash className='h-4 w-4' />
                  </Button>
                </TableCell>
              </TableRow>
            ))} 
        </TableBody>
      </Table>
    </div>
  )
}