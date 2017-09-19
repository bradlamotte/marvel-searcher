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

// Search for Marvel comics by name
// Will return an array of comics matched by beginning of their name
// Parameter search_term must be at least 3 characters long
router.get('/',
  check('search_term')
    .isLength({ min: 3 })
    .withMessage('Search term must be at least 3 characters long.'),
  handleValidationErrors,
  (req, res) => {
    const marvel = new MarvelData();
    marvel.comic_search(req.query.search_term, (results) => {
      res.json({ results: results });
    });
  }
);

module.exports = router;
