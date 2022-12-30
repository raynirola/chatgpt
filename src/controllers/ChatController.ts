import chat from '@/lib/chat'
import { RequestHandler } from 'express'
import Controller from '@/controllers/Controller'
import HttpStatus from 'http-status-codes'

class ChatController extends Controller {
  create: RequestHandler = async (req, res) => {
    try {
      const response = await chat.sendMessage(req.body.message)

      res.status(200).json(response)
    } catch (error) {
      console.dir({
        error: HttpStatus.getStatusText(error.statusCode),
        message: error.message || 'Something went wrong'
      })
      res
        .status(error.statusCode)
        .json({ error: HttpStatus.getStatusText(error.statusCode), message: error.message || 'Something went wrong' })
    }
  }
}

export default new ChatController()
