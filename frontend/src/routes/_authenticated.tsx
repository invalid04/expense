import { createFileRoute, Outlet } from '@tanstack/react-router'

import { userQueryOptions } from '@/lib/api'

const Login = () => {
  return <div>Login</div>
}

const Component = () => {
  const { user } = Route.useRouteContext()
  if (!user) {
    return <Login />
  }
  return <Outlet />
}

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient 

    queryClient.fetchQuery(userQueryOptions)
    
    return { user: { name: "" } }
  },
  component: Component,
})