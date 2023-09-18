import { config } from 'dotenv'
import { z } from 'zod'

config()

const envVariables = z.object({
  SERVER_PORT: z.string().or(z.number()),
  DATABASE_URL: z.string().url(),
})

export const env = envVariables.parse(process.env)
