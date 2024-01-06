require('dotenv').config({ path: require('find-config')('.env') })
export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/dicecanvas',
  port: process.env.PORT || 5050,
  mailHost: process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io',
  mailPort: process.env.MAIL_PORT || 2525,
  mailUser: process.env.MAIL_USER || 'df4b4f084212cb',
  mailPass: process.env.MAIL_PASS || '1c2041a7829325',
  jwtSecret: process.env.JWT_SECRET || 'tj67O==5H'
}
