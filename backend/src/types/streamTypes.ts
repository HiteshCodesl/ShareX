import z from "zod"

export const streamSchema = z.object({
     title: z.string().min(1).max(50),
})