import openai from '@/lib/openai'
import { RequestHandler } from 'express'

interface OpenAIController {
  text: RequestHandler
}

const OpenAIController = {
  text: async (req, res) => {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: req.body.prompt,
      temperature: 0,
      max_tokens: req.body.tokens
    })

    res.status(200).json({
      completion: completion.data.choices[0]?.text
    })
  }
}

export default OpenAIController
