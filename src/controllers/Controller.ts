import { RequestHandler } from 'express'

interface BaseController {
  index?: RequestHandler
  show?: RequestHandler
  create?: RequestHandler
  update?: RequestHandler
  delete?: RequestHandler
}

class Controller implements BaseController {
  index?: RequestHandler
  show?: RequestHandler
  create?: RequestHandler
  update?: RequestHandler
  delete?: RequestHandler
}

export default Controller
