/**
 * @file Defines the movie router.
 * @module routes/movieRouter
 * @author Liv Åberg
 */

import { MovieRepository } from '../repositories/MovieRepository.js'
import { MovieService } from '../services/MovieService.js'
import { MovieController } from '../controllers/MovieController.js'

import express from 'express'

export const router = express.Router()

const movieRepository = new MovieRepository()
const movieService = new MovieService(movieRepository)
const movieController = new MovieController(movieService)

router.param('id', (req, res, next, id) =>
  movieController.loadMovieDocument(req, res, next, id)
)

/**
 * @swagger
 * /movies:
 *   get:
 *     tags:
 *       - Movies
 *     summary: Get all movies
 *     parameters:
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter by genre
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of movies
 *       500:
 *         description: Server error
 */
router.get('/', (req, res) => movieController.getAllMovies(req, res))

router.get('/:id', (req, res) => movieController.getMovie(req, res))

router.post('/', (req, res) => movieController.createMovie(req, res))

router.put('/:id', (req, res) => movieController.updateMovie(req, res))

router.delete('/:id', (req, res) => movieController.deleteMovie(req, res))

router.get('/:id/ratings', (req, res) => movieController.getMovieRatings(req, res))