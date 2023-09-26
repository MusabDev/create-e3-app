import cors from 'cors'
import express, { type Request, type Response } from 'express'
import createHttpError from 'http-errors'

import { env } from '~/env'
import userRoutes from '~/routes/user'
import errorHandler from './middlewares/error-handler'

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
app.use('/users', userRoutes)

app.use((req, res, next) => next(createHttpError(404, 'Endpoint not found')))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`server started, url: http://localhost:${port}`)
})
