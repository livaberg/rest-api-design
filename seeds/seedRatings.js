import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Rating from '../src/models/rating.js'
import Movie from '../src/models/movie.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI

/**
 * Seed ratings connected to movies from a CSV file into the MongoDB database.
 * Clears existing ratings before inserting new ones.
 *
 * @async
 * @function seedRatings
 * @returns {Promise<void>} Resolves when the seeding is complete.
 * @throws {Error} If there is an error connecting to the database or inserting data.
 */
const seedRatings = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log('Connected to MongoDB for seeding ratings...')
    }

    const movieIds = await Movie.find({}, { id: 1, _id: 0 }).lean()
    const validMovieIds = movieIds.map((m) => m.id)

    const results = []
    let count = 0
    const maxEntries = 10000 // Limit the number of ratings to seed for performance issues

    return new Promise((resolve, reject) => {
      fs.createReadStream(path.resolve('../dataset/ratings_small.csv'))
        .pipe(csv())
        .on('data', (data) => {
          const movieId = Number(data.movieId)
          if (validMovieIds.includes(movieId) && count < maxEntries) {
            results.push({
              userId: Number(data.userId),
              movieId,
              rating: Number(data.rating),
              timestamp: Number(data.timestamp)
            })
            count++
          }
        })
        .on('end', async () => {
          try {
            await Rating.deleteMany({})
            await Rating.insertMany(results)
            console.log(`Seeded ${results.length} ratings!`)
            resolve()
          } catch (err) {
            console.error('Error inserting ratings:', err)
            reject(err)
          }
        })
        .on('error', (err) => {
          console.error('Error reading CSV:', err)
          reject(err)
        })
    })
  } catch (err) {
    console.error('Error connecting to DB:', err)
    throw err
  }
}

export default seedRatings
