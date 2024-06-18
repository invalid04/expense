import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { type QueryClient } from '@tanstack/react-query'

import { Toaster } from "@/components/ui/sonner"

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
})

function Navbar() {
  return (
    <div className='p-2 flex justify-between max-w-2xl m-auto items-baseline'>
        <Link to="/" className="[&.active]:font-bold">
          <h1>Expense Tracker</h1>
        </Link>
      <div className="flex gap-4">
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold">
          Expenses
        </Link>
        <Link to="/create-expense" className="[&.active]:font-bold">
          Add
        </Link>
        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
      </div>
    </div>
  )
}

function Root() {
  return (
    <>
      <hr />
      <Navbar />
      <div className='p-2 max-w-2xl m-auto'>
        <Outlet />
      </div>
      <Toaster />
    </>
  )
}