import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import { getUser } from "../kinde";

import { db } from "../db";
import {expenses as expenseTable } from "../db/schema/expenses"
import { eq, desc, sum, and } from "drizzle-orm";

const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(100),
    amount: z.number().int().positive()
})

type Expense = z.infer<typeof expenseSchema>

const createPostSchema = expenseSchema.omit({ id: true })

export const expensesRoute = new Hono()
.get("/", getUser, async (c) => {
    const user = c.var.user 

    const expenses = await db 
        .select()
        .from(expenseTable)
        .where(eq(expenseTable.userId, user.id))
        .orderBy(desc(expenseTable.createdAt))
    
    return c.json({ expenses: expenses})
})
.post("/", getUser, zValidator("json", createPostSchema), async (c) => {
    const expense = await c.req.valid("json")
    const user = c.var.user 

    const result = await db 
        .insert(expenseTable)
        .values({
            ...expense,
            userId: user.id,
        })
        .returning()

    c.status(201)
    return c.json(result)
})
.get("/total-spent", getUser, (c) => {
    const total = fakeExpenses.reduce((acc, expense) => acc + expense.amount, 0);
    return c.json({ total });
})
.get("/:id{[0-9]+}", getUser, (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const expense = fakeExpenses.find(expense => expense.id === id)
    if (!expense) {
        return c.notFound()
    }
    return c.json({expense})
})
.delete("/:id{[0-9]+}", getUser, (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const index = fakeExpenses.findIndex((expense => expense.id === id))
    if (index === -1) {
        return c.notFound()
    }
    const deletedExpense = fakeExpenses.splice(index, 1)[0]
    return c.json({ expense: deletedExpense })
})