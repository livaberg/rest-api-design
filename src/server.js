/**
 * Defines the starting point of the API server.
 *
 * @author Liv Åberg<lh224hh@student.lnu.se>
 * @version 1.0.0
 */

import cors from 'cors' // Middleware for enabling CORS
import express from 'express' // Express framework
import helmet from 'helmet' // Middleware for setting various HTTP headers for security

// Connect to MongoDB.
// await connectToDatabase(process.env.DB_CONNECTION_STRING)

// Create an Express application.
const app = express()

// Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet).
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"]
    }
  }
}))

// Enable Cross Origin Resource Sharing (CORS) (https://www.npmjs.com/package/cors).
app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API is running! 🚀'
  })
})

// Starts the HTTP server listening for connections.
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running at http://localhost:${server.address().port}`)
  console.log('Press Ctrl-C to terminate...')
})
