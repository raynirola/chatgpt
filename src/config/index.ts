import dotenv from 'dotenv'

dotenv.config()

const config = {
  port: process.env.PORT,
  openai: {
    password: process.env.OPENAI_PASSWORD,
    email: process.env.OPENAI_EMAIL
  }
}

export default config
