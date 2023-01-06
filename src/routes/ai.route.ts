import { z } from 'zod'
import { Router } from 'express'
import { OpenAIController } from '@/controllers'
import ValidateRequest from '@/middlewares/Validate'

const schema = z.object({
  model: z
    .enum(['text-davinci-003', 'text-curie-001', 'text-babbage-001', 'text-ada-001'], {
      required_error: 'Model is a required field',
      invalid_type_error: 'Please provide a valid model, e.g. text-davinci-003'
    })
    .optional()
    .default('text-davinci-003'),
  prompt: z
    .string({
      required_error: 'Prompt is a required field',
      invalid_type_error: 'Please provide a valid prompt'
    })
    .min(10, { message: 'Prompt is a required field' })
    .max(4000, {
      message: 'Prompt must be at most 2048 characters long'
    }),
  tokens: z
    .number({
      required_error: 'Tokens is a required field',
      invalid_type_error: 'Please provide a valid number of tokens'
    })
    .max(4000, 'Tokens must be at most 4000 characters long')
    .optional()
    .default(100),
  stop: z
    .string({
      required_error: 'Stop is a required field',
      invalid_type_error: 'Please provide a valid stop'
    })
    .optional()
    .default('.'),
  temperature: z
    .number({
      required_error: 'Temperature is a required field',
      invalid_type_error: 'Please provide a valid temperature'
    })
    .optional()
    .default(0)
})

const ai = Router() as Router

ai.post('/completions', ValidateRequest({ schema }), OpenAIController.text)

export default ai
