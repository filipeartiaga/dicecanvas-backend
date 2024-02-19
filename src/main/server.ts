import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'
import { CharacterSheetModel } from '../domain/models/character-sheet/character-sheet'
import { LogModel } from '../domain/models/log/log'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    const server = (await import('./config/httpServer')).default(app)
    const io = (await import('./config/io')).default(server)

    io.on('connection', (socket) => {
      socket.on('send-new-log', (rollResult: LogModel, checktype: string) => {
        socket.broadcast.emit('new-log', rollResult, checktype)
      })

      socket.on('send-new-dice', (rollResult: LogModel, checkType: string) => {
        io.emit('new-dice', rollResult, checkType)
      })

      socket.on('send-clear-log', () => {
        socket.broadcast.emit('clear-log')
      })

      socket.on('send-character-delete', ({ characterSheetId, emitter }) => {
        socket.broadcast.emit('character-delete', ({ characterSheetId, emitter }))
      })

      socket.on('send-character-create', (characterSheet: CharacterSheetModel) => {
        socket.broadcast.emit('character-create', characterSheet)
      })

      socket.on('send-new-initiative', () => {
        io.emit('new-initiative')
      })

      socket.on('send-update-initiative', () => {
        io.emit('update-initiative')
      })

      socket.on('send-delete-initiative', () => {
        io.emit('delete-initiative')
      })

      socket.on('send-start-initiative', () => {
        io.emit('new-initiative')
      })
    })

    server.listen(env.port, () => { console.log(`Server is running at http://localhost:${env.port}`) })
  })
  .catch(console.error)
