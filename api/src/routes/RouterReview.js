const express = require('express');
const router = express.Router();
const { Review } = require('../db');

// Ruta para una nueva review
router.post('/', async (req, res) => {
  try {
    const { UserId, propertyId, score, description } = req.body;
    const newReview = await Review.create({ UserId, propertyId, score, description });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para llamar todas las reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para llamar una review por su ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByPk(id);
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para actualizar una review por su ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { score, description } = req.body;
  try {
    const review = await Review.findByPk(id);
    if (review) {
      review.score = score;
      review.description = description;
      await review.save();
      res.json(review);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para eliminar una review por su ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByPk(id);
    if (review) {
      await review.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;