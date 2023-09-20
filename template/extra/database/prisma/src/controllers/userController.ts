import { type Request, type Response } from 'express'

import { prisma } from '~/lib/prisma'
import { userSchema } from '~/lib/validations/user'

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany()

  return res.status(200).json({ users })
}

export const createUser = async (req: Request, res: Response) => {
  // Validation
  const parsedData = userSchema.safeParse(req.body)
  if (!parsedData.success) {
    return res.status(403).json({ error: 'Validation error.' })
  }

  // Business logic
  const createdData = await prisma.user.create({
    data: parsedData.data,
  })

  return res.status(201).json({ data: createdData })
}
