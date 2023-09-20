import { z } from 'zod'

import { userSchema } from '~/lib/validations/user'

export const getUsers = () => {
  return [
    {
      name: 'Musab',
      email: 'musabwebdev@gmail.com',
    },
  ]
}

export const createUser = (data: z.infer<typeof userSchema>) => {
  // Write data to the database

  return data
}
