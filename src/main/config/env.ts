export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/dicecanvas',
  port: process.env.PORT || 5050,
  mailHost: process.env.MAIL_HOST || '127.0.0.1',
  mailPort: process.env.MAIL_PORT || 1025,
  mailUser: process.env.MAIL_USER || '',
  mailPass: process.env.MAIL_PASS || '',
  jwtSecret: process.env.JWT_SECRET || 'tj67O==5H'
}
