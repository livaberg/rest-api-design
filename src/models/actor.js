import mongoose from 'mongoose'

/**
 * Actor schema representing an actor with basic metadata.
 */
const actorSchema = new mongoose.Schema({
  id: Number,
  name: String,
  movies_played: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }]
})

export default mongoose.model('Actor', actorSchema)
