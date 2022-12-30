import dotenv from 'dotenv'

dotenv.config()

const config = {
  port: process.env.PORT,
  app: {
    key: process.env.APP_KEY
  },
  openai: {
    password: process.env.OPENAI_PASSWORD,
    email: process.env.OPENAI_EMAIL
  }
}

export default config
