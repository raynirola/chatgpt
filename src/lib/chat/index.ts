import { ChatGPTAPIBrowser } from 'chatgpt'

const chat = new ChatGPTAPIBrowser({
  email: process.env.OPENAI_EMAIL,
  password: process.env.OPENAI_PASSWORD
})

export default chat
