import { z } from 'zod'
import { Router } from 'express'
import { OpenAIController } from '@/controllers'
import ValidateRequest from '@/middlewares/Validate'

const schema = z.object({
  prompt: z
    .string({
      required_error: 'Prompt is a required field',
      invalid_type_error: 'Please provide a valid prompt'
    })
    .min(1, { message: 'Prompt is a required field' })
    .max(2048, {
      message: 'Prompt must be at most 2048 characters long'
    }),
  tokens: z
    .number({
      required_error: 'Tokens is a required field',
      invalid_type_error: 'Please provide a valid number of tokens'
    })
    .max(2048, {
      message: 'Tokens must be less than 2048'
    })
    .default(100)
    .catch(100)
})

const ai = Router() as Router

ai.post('/completions', ValidateRequest({ schema }), OpenAIController.text)

export default ai
