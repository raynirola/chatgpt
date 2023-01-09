import express from 'express'
import morgan from 'morgan'
import config from '@/config'
import * as routes from '@/routes'
import ErrorMiddleware from '@/middlewares/ErrorMiddleware'
import AuthMiddleware from '@/middlewares/AuthMiddleware'
import { mw } from 'request-ip'
import TimestampLogger from './middlewares/TimestampLoggerMiddleware'

const app = express()
app.use(mw())
app.use(TimestampLogger)
app.use(morgan(':method :url :status * :response-time ms'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes.home)
app.use('/ai', AuthMiddleware, routes.ai)
app.use('/chat', AuthMiddleware, routes.chat)
app.use(ErrorMiddleware)

app.listen(config.port, () => console.log(`Server is running at ${config.port}`))
