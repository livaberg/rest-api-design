/**
 * Defines the starting point of the API server.
 *
 * @author Liv Åberg<lh224hh@student.lnu.se>
 * @version 1.0.0
 */

import cors from 'cors' // Middleware for enabling CORS
import express from 'express' // Express framework
import helmet from 'helmet' // Middleware for setting various HTTP headers for security
import dotenv from 'dotenv' // Module to load environment variables from a .env file

import { connectToDatabase } from '../db.js' // Function to connect to MongoDB
import { swaggerUi, swaggerSpec } from './docs/swagger.js' // Swagger UI for API documentation

dotenv.config() // Load environment variables from .env file

// Connect to MongoDB.
// await connectToDatabase(process.env.DB_CONNECTION_STRING)
await connectToDatabase(process.env.MONGODB_URI)

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

// Use the Swagger UI middleware to serve API documentation.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Starts the HTTP server listening for connections.
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running at http://localhost:${server.address().port}`)
  console.log('Press Ctrl-C to terminate...')
})
