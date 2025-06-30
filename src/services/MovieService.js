/**
 * @file Defines the movie service for fetching and manipulating movie data.
 * @module services/MovieService
 * @author Liv Åberg
 */

/**
 * Service for handling movie-related operations.
 */
export class MovieService {
  /**
   * Creates an instance of the MovieService.
   *
   * @param {object} movieRepository - The repository for accessing movie data.
   */
  constructor(movieRepository) {
    this.movieRepository = movieRepository
  }

  /**
   * Retrieves all movies based on the provided query parameters.
   *
   * @param {object} query - The query parameters for filtering and pagination.
   * @returns {Promise<Array>} - A promise that resolves to an array of movies.
   */
  async getAllMovies(query) {
    const filter = {}
    const options = {}

    // Filtrering
    if (query.genre) {
      filter.genre = { $regex: new RegExp(query.genre, 'i') }
    }

    const year = parseInt(query.year)
    if (!isNaN(year)) {
      filter.release_year = year
    }

    // Pagination
    const page = parseInt(query.page) || 1
    const limit = Math.min(parseInt(query.limit) || 10, 100)
    const skip = (page - 1) * limit

    options.limit = limit
    options.skip = skip

    const [movies, total] = await Promise.all([
      this.movieRepository.getAllMovies(filter, options),
      this.movieRepository.countMovies(filter),
    ])

    // Return the movies and pagination information to the controller.
    return {
      movies,
      total,
      page,
      pages: `Page ${page} of ${Math.ceil(total / limit)}`,
    }
    // return this.movieRepository.getAllMovies(filter, options)
  }
}
