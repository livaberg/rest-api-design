/**
 * @file Defines the movie repository for accessing movie data from the MongoDB database.
 * @module repositories/MovieRepository
 * @author Liv Åberg
 */

import { MovieModel } from '../models/movie.js'

/**
 * Repository for accessing movie data.
 */
export class MovieRepository {
  /**
   * Retrieves all movies from the database based on filter and pagination options.
   *
   * @param {object} filter - The filter criteria for querying movies.
   * @param {object} options - The pagination options, including limit and skip.
   * @returns {Promise<Array>} - A promise that resolves to an array of movie documents.
   */
  async getAllMovies(filter = {}, options = {}) {
    return MovieModel
      .find(filter)
      .skip(options.skip || 0)
      .limit(options.limit || 10)
      .exec()
  }

  /**
   * Counts the number of movies in the database that match the given filter criteria.
   *
   * @param {object} filter - The filter criteria for counting movies.
   * @returns {Promise<number>} - A promise that resolves to the count of matching movies.
   */
  async countMovies(filter = {}) {
  return MovieModel.countDocuments(filter).exec()
  }
}