import { ZodSchema } from 'zod'
import { RequestHandler } from 'express'

function ValidateRequest(schema: ZodSchema, type: 'body' | 'query' | 'params' = 'body'): RequestHandler {
  if (Array.isArray(type) && type.every(key => ['body', 'query', 'params'].includes(key))) {
    for (const key of type) {
      return async (req, _res, next) => {
        try {
          await schema.parseAsync(req[key])
          next()
        } catch (err) {
          next(err)
        }
      }
    }
  } else if (typeof type === 'string' && ['body', 'query', 'params'].includes(type)) {
    return async (req, _res, next) => {
      try {
        await schema.parseAsync(req[type])
        next()
      } catch (err) {
        next(err)
      }
    }
  }

  throw new Error('Invalid type')
}

export default ValidateRequest
