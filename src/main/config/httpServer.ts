import { Server } from 'http'
import { Express } from 'express'
const http = require('http')

const makeHttpServer = (app: Express): Server => {
  const server = http.createServer(app)
  return server
}
export default makeHttpServer
