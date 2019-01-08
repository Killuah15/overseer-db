import "@babel/polyfill/noConflict"
import server from './server/server'

const options = {
  port: process.env.PORT || 4000,
  cors: {
    credentials: true,
    origin: ['http://localhost:1234', 'http://localhost:4000']
  },
  subscriptions: false
}

server.start(options, () => {
  console.log("The server is up on http://localhost:4000")
})