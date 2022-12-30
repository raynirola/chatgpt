import chat from '@/lib/chat'
import { RequestHandler } from 'express'
import Controller from '@/controllers/Controller'

class ChatController extends Controller {
  create: RequestHandler = async (req, res) => {
    try {
      const response = await chat.sendMessage(req.body.message)

      res.status(200).json(response)
    } catch (error) {
      console.dir(error, { depth: null })
      res.status(500).json({ error: error.message || 'Something went wrong' })
    }
  }
}

export default new ChatController()
