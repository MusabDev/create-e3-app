import { Router } from 'express'

import { createUser, getUsers } from '~/controllers/userController'

const userRoute = Router()

userRoute.route('/').get(getUsers).post(createUser)

export default userRoute
