import mongoose from 'mongoose'

/**
 * Movie schema representing a movie with basic metadata.
 */
const movieSchema = new mongoose.Schema({
  id: Number,
  title: String,
  budget: Number,
  release_date: Date,
  overview: String,
  popularity: Number
})

export default mongoose.model('Movie', movieSchema)
