import mongoose from 'mongoose'

/**
 * Credit schema representing a credit with basic metadata.
 * This schema is used to store information about individuals associated with movies.
 */
const creditSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  city: String,
  country: String,
  company: String,
  title: String
})

export default mongoose.model('Credit', creditSchema)
