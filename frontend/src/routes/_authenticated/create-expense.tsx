import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'

import { api } from '@/lib/api'

import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'

export const Route = createFileRoute('/_authenticated/create-expense')({
  component: CreateExpense,
})

function CreateExpense() {

  const navigate = useNavigate()

  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      title: '',
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      const res = await api.expenses.$post({ json: value })

      if(!res.ok) {
        throw new Error('server error')
      }
      navigate({to: '/expenses'})
    }
  })

  return (
    <div className='p-2'>
      <h2>Create Expense</h2>
        <form 
          className='max-w-xl m-auto'
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >

          <form.Field 
            name='title'
            validators={{
              onChange: z.string().min(3, {message: 'Title must be at least 3 characters'})
            }}
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Title</Label>
                <Input 
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.touchedErrors ? (
                  <em>{field.state.meta.touchedErrors}</em>
                ) : null}
              </>
            )}
          />

          <form.Field 
            name='amount'
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Amount</Label>
                <Input 
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type='number'
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
                {field.state.meta.touchedErrors ? (
                  <em>{field.state.meta.touchedErrors}</em>
                ) : null}
              </>
            )}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button className='mt-4' type="submit" disabled={!canSubmit}>
                {isSubmitting ? '...' : 'Submit'}
              </Button>
            )}
          />

        </form>
    </div>
  )
}