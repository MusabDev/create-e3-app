import cors from 'cors'
import express, { type Request, type Response } from 'express'

import { env } from '~/env'
import userRoute from '~/routes/userRoute'

const app = express()
const port = env.SERVER_PORT || 4321

app.use(
  cors({
    allowedHeaders: '*',
    methods: '*',
    origin: '*',
  }),
)
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    'create-e3-app': 'https://github.com/musabdev/create-e3-app',
  })
})
app.use('/users', userRoute)

app.listen(port, () => {
  console.log(`server started, url: http://localhost:${port}`)
})
