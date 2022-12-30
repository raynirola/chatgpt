import { Router } from 'express'
import { ChatController } from '@/controllers'

const chat = Router() as Router

chat.post('/', ChatController.create)

export default chat
