const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const MarvelData = require('../services/marvel-data');

const handleValidationErrors = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.mapped() });
  } else {
    next();
  }
}

router.route('/')

  // Search for Marvel characters by name
  // Will return an array of characters matched by beginning of their name
  // Parameter search_term must be at least 3 characters long
  .get(
    check('search_term', 'Search term must be at least 3 characters long.').isLength({ min: 3 }),
    handleValidationErrors,
    (req, res) => {
      const marvel = new MarvelData();
      marvel.search(req.query.search_term, (results) => {
        res.json({ results: results });
      });
    }
  );

module.exports = router;
