import config from '@/config'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: config.openai.api.key
})

const openai = new OpenAIApi(configuration)

export default openai
