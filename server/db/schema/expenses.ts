import { text, numeric, pgTable, serial, index, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const expenses = pgTable('expenses', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    title: text('title').notNull(),
    amount: numeric('amount', {precision: 12, scale: 2}).notNull(),
    createdAt: timestamp('created_at').defaultNow()
}, (expenses) => {
    return {
        userIdIndex: index('name_idx').on(expenses.userId),
    }
});

export const insertExpenseSchema = createInsertSchema(expenses)

export const selectExpenseSchema = createSelectSchema(expenses)