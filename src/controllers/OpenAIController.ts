import openai from '@/lib/openai'
import { RequestHandler } from 'express'

interface OpenAIController {
  text: RequestHandler
}

const OpenAIController: OpenAIController = {
  text: async (req, res) => {
    console.dir(req.body)
    const completion = await openai.createCompletion({
      model: req.body.model,
      prompt: req.body.prompt,
      temperature: req.body.temperature,
      stop: req.body.stop,
      max_tokens: req.body.tokens
    })

    res.status(200).json(completion.data.choices.map(c => ({ text: c.text, index: c.index })))
  }
}

export default OpenAIController
