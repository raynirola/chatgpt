import { ZodSchema } from 'zod'
import { RequestHandler } from 'express'

const Filters = {
  body: 'body',
  query: 'query',
  params: 'params'
} as const

type ArgsWithSingleType = {
  schema: ZodSchema
  type?: typeof Filters[keyof typeof Filters]
}

type ArgsWithMultipleTypes = {
  schema: ZodSchema
  type?: typeof Filters[keyof typeof Filters][]
}

type Args = ArgsWithSingleType | ArgsWithMultipleTypes
type ValidateRequest = (args: Args) => RequestHandler

const ValidateRequest: ValidateRequest = ({ schema, type = 'body' }) => {
  if (Array.isArray(type) && type.every(key => Object.keys(Filters).includes(key))) {
    for (const key of type) {
      return async (req, _res, next) => {
        try {
          const res = await schema.parseAsync(req[key])
          req[key] = res
          next()
        } catch (err) {
          next(err)
        }
      }
    }
  } else if (typeof type === 'string' && ['body', 'query', 'params'].includes(type)) {
    return async (req, _res, next) => {
      try {
        const res = await schema.parseAsync(req[type])
        req[type] = res
        next()
      } catch (err) {
        next(err)
      }
    }
  }

  throw new Error('Invalid type')
}

export default ValidateRequest
