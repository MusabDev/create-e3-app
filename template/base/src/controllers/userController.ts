import { type Request, type Response } from 'express'

import { userSchema } from '~/lib/validations/user'
import * as userModel from '~/models/userModel'

export const getUsers = async (req: Request, res: Response) => {
  const users = userModel.getUsers()

  return res.status(200).json({ users })
}

export const createUser = async (req: Request, res: Response) => {
  // Validation
  const parsedData = userSchema.safeParse(req.body)
  if (!parsedData.success) {
    return res.status(403).json({ error: 'Validation error.' })
  }

  const createdUser = userModel.createUser(parsedData.data)

  return res.status(201).json({ data: createdUser })
}
