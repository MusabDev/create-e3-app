import { type Request, type Response } from 'express'

import * as userModel from '~/models/user'

export const getUsers = async (req: Request, res: Response) => {
  const users = userModel.getUsers()

  return res.status(200).json({ users })
}

export const createUser = async (req: Request, res: Response) => {
  const data = req.body
  const createdUser = userModel.createUser(data)

  return res.status(201).json({ data: createdUser })
}
