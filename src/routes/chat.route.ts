import { z } from 'zod'
import { Router } from 'express'
import { ChatController } from '@/controllers'
import ValidateRequest from '@/middlewares/Validate'

const schema = z.object({
  message: z
    .string({
      required_error: 'Message is a required field',
      invalid_type_error: 'Please provide a valid message'
    })
    .min(20, {
      message: 'Message must be at least 20 characters long'
    })
    .max(2048, {
      message: 'Message must be at most 2048 characters long'
    })
})

const chat = Router() as Router

chat.post('/', ValidateRequest({ schema }), ChatController.create)

export default chat
