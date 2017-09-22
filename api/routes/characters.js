const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Character = require('../models/character');
const HttpNotFoundError = require('../errors/http-not-found-error');

const handleRequestValidationErrors = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.mapped() });
  } else {
    next();
  }
};

const handleProcessingError = (response, err) => {
  const status = (err instanceof HttpNotFoundError) ? 404 : 422;
  response.status(status).json({ error: err.message });
};

// Search for Marvel characters by name
// Will return an array of characters matched by beginning of their name
// Parameter search_term must be at least 3 characters long
router.get('/',
  check('search_term')
    .isLength({ min: 3 })
    .withMessage('Search term must be at least 3 characters long.'),
  handleRequestValidationErrors,
  (req, res) => {
    Character.search(req.query.search_term)
      .then((results)=>{
        res.json({ results: results });
        })
      .catch((err)=>{
        handleProcessingError(res, err);
      });
  }
);

// Find a specific Marvel character
// Will return a single character data
router.get('/:id', function(req, res){
  Character.find(req.params.id)
    .then((results)=>{
      res.json({ character: results });
      })
    .catch((err)=>{
      handleProcessingError(res, err);
    });
});

module.exports = router;
