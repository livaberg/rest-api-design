import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Credit from '../src/models/credit.js'
import Movie from '../src/models/movie.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI

/**
 * Seed credits connected to movies from a CSV file into the MongoDB database.
 * Clears existing credits before inserting new ones.
 *
 * @async
 * @function seedCredits
 * @returns {Promise<void>} Resolves when the seeding is complete.
 * @throws {Error} If there is an error connecting to the database or inserting data.
 */
const seedCredits = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log('Connected to MongoDB for seeding credits...')
    }

    const movieIds = await Movie.find({}, { id: 1, _id: 0 }).lean()
    const validMovieIds = movieIds.map((m) => m.id)

    const results = []
    let count = 0

    return new Promise((resolve, reject) => {
      fs.createReadStream(path.resolve('../dataset/credits.csv'))
        .pipe(csv())
        .on('data', (data) => {
          const creditMovieId = Number(data.id)
          if (validMovieIds.includes(creditMovieId)) {
            results.push({
              id: creditMovieId,
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              gender: data.gender,
              city: data.city,
              country: data.country,
              company: data.company,
              title: data.title
            })
            count++
          }
        })
        .on('end', async () => {
          try {
            await Credit.deleteMany({})
            await Credit.insertMany(results)
            console.log(`Seeded ${count} credits (matching movie IDs)!`)
            resolve()
          } catch (err) {
            console.error('Error inserting credits:', err)
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

export default seedCredits
