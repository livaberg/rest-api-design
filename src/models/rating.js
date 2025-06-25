import mongoose from 'mongoose'

/**
 * Rating schema representing a user's rating for a movie.
 */
const ratingSchema = new mongoose.Schema({
  userId: Number,
  movieId: Number,
  rating: Number,
  timestamp: Number
})

export default mongoose.model('Rating', ratingSchema)
