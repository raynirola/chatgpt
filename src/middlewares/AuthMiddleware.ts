import { RequestHandler } from 'express'
import config from '@/config'
import HTTPStatus from 'http-status-codes'

const AuthMiddleware: RequestHandler = (req, res, next) => {
  if (req.headers.authorization !== `Bearer ${config.app.key}`) {
    return res.status(401).json({ message: HTTPStatus.getStatusText(401) })
  }

  next()
}

export default AuthMiddleware
