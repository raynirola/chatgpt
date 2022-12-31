import HttpException from '@/exceptions'
import BadRequestException from '@/exceptions/badRequest'
import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'

const ErrorMiddleware: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof ZodError) {
    const errors = formatZodError(err)
    const exception = new BadRequestException('Validation Error', errors)
    console.dir(exception.serialize(), { depth: null })
    return res.status(400).json(exception.serialize())
  }

  if (err instanceof HttpException) {
    console.dir(err.serialize(), { depth: null })
    return res.status(err.status).json(err.serialize())
  }

  console.dir(err.message, { depth: null })
  res.status(500).json({ message: err.message })

  next()
}

function formatZodError(err: ZodError<any>) {
  const errors = {} as Record<string, string>

  Object.keys(err.formErrors.fieldErrors).map(key => {
    errors[key] = err.formErrors.fieldErrors[key]?.[0]
  })

  return errors
}

export default ErrorMiddleware
