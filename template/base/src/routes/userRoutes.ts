import { Router } from 'express'

import { createUser, getUsers } from '~/controllers/userController'

const userRoutes = Router()

userRoutes.route('/').get(getUsers).post(createUser)

export default userRoutes
