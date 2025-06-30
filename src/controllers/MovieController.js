/**
 * Defines the MovieController class that handles movie-related requests.
 *
 * @module controllers/MovieController
 * @author Liv Åberg
 */

// import { MovieModel } from '../models/movie.js'

/**
 * Handles movie-related requests and calls the appropriate service methods for further processing.
 */
export class MovieController {
  /**
   * Creates an instance of the MovieController.
   *
   * @param {object} movieService - The service for handling movie-related operations.
   */
  constructor (movieService) {
    this.movieService = movieService
  }

  // /**
  //  * Provide req.doc to the route if :id is present.
  //  *
  //  * @param {object} req - Express request object.
  //  * @param {object} res - Express response object.
  //  * @param {Function} next - Express next middleware function.
  //  * @param {string} id - The value of the id for the movie to load.
  //  */
  // async loadMovieDocument (req, res, next, id) {
  //   try {
  //     console.log(`loadMovieDocument called with id: ${id}`)
  //     // Get the movie document.
  //     const movieDoc = await MovieModel.findById(id)

  //     // If the movie document is not found, throw an error.
  //     if (!movieDoc) {
  //       const error = new Error('The movie you requested does not exist.')
  //       error.status = 404
  //       throw error
  //     }

  //     // Provide the movie document to req.
  //     req.doc = movieDoc

  //     // Go to the next middleware.
  //     next()
  //   } catch (error) {
  //     next(error)
  //   }
  // }
  
  /**
   * Retrieves all movies, including filtering and pagination based on query parameters.
   *
   * @param {object} req - Express request object with query parameters: genre, year, page, limit.
   * @param {object} res - Express response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async getAllMovies(req, res) {
    try {
      const result = await this.movieService.getAllMovies(req.query)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch movies.', error: error.message })
    }
  }
    
// getMovie
  
// createMovie

// updateMovie
  
// deleteMovie
  
// getMovieRatings

}