import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import cors from 'cors'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
app.use(cors())
export default app
