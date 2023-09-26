import { z } from 'zod'

import { createUserSchema } from '~/lib/validations/user'

export const getUsers = () => {
  return [
    {
      name: 'Musab',
      email: 'musabwebdev@gmail.com',
    },
  ]
}

export const createUser = (data: z.infer<typeof createUserSchema>) => {
  // Write data to the database

  return data
}
