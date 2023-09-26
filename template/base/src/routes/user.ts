import { Router } from 'express'

import { createUser, getUsers } from '~/controllers/user'
import { createUserSchema } from '~/lib/validations/user'
import validateRequestSchema from '~/middlewares/validate-request-schema'

const userRoutes = Router()

userRoutes.get('/', getUsers)

userRoutes.post('/', validateRequestSchema(createUserSchema), createUser)

export default userRoutes
