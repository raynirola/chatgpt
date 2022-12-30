import express from 'express'
import config from '@/config'
import * as routes from '@/routes'
import ErrorMiddleware from '@/middlewares/ErrorMiddleware'
import Cron from '@/cron'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes.home)
app.use('/chats', routes.chat)
app.use(ErrorMiddleware)

app.listen(config.port, () => {
  console.log(`Server is running at ${config.port}`)
  Cron.start()
  console.log('Cron started')
})
