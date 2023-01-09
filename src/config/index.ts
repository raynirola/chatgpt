import dotenv from 'dotenv'

dotenv.config()

const config = {
  port: process.env.PORT,
  app: {
    key: process.env.APP_KEY
  },
  openai: {
    password: process.env.OPENAI_PASSWORD,
    email: process.env.OPENAI_EMAIL,
    api: {
      key: process.env.OPENAI_API_KEY
    }
  },
  temp_access_keys: (process.env.TEMP_ACCESS_KEYS as string).split(','),
  proxies: (process.env.PROXIES as string).split(',')
}

export default config
