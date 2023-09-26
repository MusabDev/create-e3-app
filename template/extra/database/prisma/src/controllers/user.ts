import { type Request, type Response } from 'express'

import { prisma } from '~/lib/prisma'

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany()

  return res.status(200).json({ users })
}

export const createUser = async (req: Request, res: Response) => {
  // Business logic
  const createdData = await prisma.user.create({
    data: req.body,
  })

  return res.status(201).json({ data: createdData })
}
