import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Movie from '../src/models/movie.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI

/**
 * Seed the first 200 movies from a CSV file into the MongoDB database.
 * Clears existing movies before inserting new ones.
 *
 * @async
 * @function seedMovies
 * @returns {Promise<void>} Resolves when the seeding is complete.
 * @throws {Error} If there is an error connecting to the database or inserting data.
 */
const seedMovies = async () => {
  try {
    if (mongoose.connection.readyState === 0) { // only connect if not already connected
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log('Connected to MongoDB for seeding movies...')
    }

    const results = []
    const maxEntries = 200
    let count = 0

    return new Promise((resolve, reject) => {
      fs.createReadStream(path.resolve('../dataset/movies_metadata.csv'))
        .pipe(csv())
        .on('data', (data) => {
          if (count < maxEntries) {
            results.push({
              id: Number(data.id),
              title: data.title,
              budget: Number(data.budget) || 0,
              release_date: data.release_date ? new Date(data.release_date) : null,
              overview: data.overview,
              popularity: Number(data.popularity) || 0
            })
            count++
          }
        })
        .on('end', async () => {
          try {
            await Movie.deleteMany({})
            await Movie.insertMany(results)
            console.log(`Seeded ${results.length} movies!`)
            resolve()
          } catch (err) {
            console.error('Error inserting movies:', err)
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

export default seedMovies
