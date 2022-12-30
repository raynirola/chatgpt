import { ErrorRequestHandler } from 'express'

const ErrorMiddleware: ErrorRequestHandler = (err, _req, res) => {
  res.status(500).json({ message: err.message })
}

export default ErrorMiddleware
