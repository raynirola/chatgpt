import { RequestHandler } from 'express'

const TimestampLogger: RequestHandler = async (req, _, next) => {
  console.log(`${new Date().toISOString()} * ${req.clientIp}`)
  next()
}

export default TimestampLogger
