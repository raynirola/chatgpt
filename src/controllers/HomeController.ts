import { RequestHandler } from 'express'

const HomeController: RequestHandler = async (_req, res) => {
  res.json({
    message: 'Magnificent express typescript boilerplate!',
    url: 'https://github.com/raynirola/mernkit'
  })
}

export default HomeController
