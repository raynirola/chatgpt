import { RequestHandler } from 'express'
import config from '@/config'
import HTTPStatus from 'http-status-codes'

const AuthMiddleware: RequestHandler = (req, res, next) => {
  const { app, temp_access_keys } = config
  const authorization = req.headers.authorization

  if (!authorization) {
    console.log('No authorization header')
    return res.status(401).json({ message: HTTPStatus.getStatusText(401) })
  }

  console.dir({ Authorization: authorization }, { depth: null })

  for (const key of temp_access_keys) {
    if (authorization.split(' ')[1].trim() === key) {
      return next()
    }
  }

  return res.status(401).json({ message: HTTPStatus.getStatusText(401) })
}

export default AuthMiddleware
