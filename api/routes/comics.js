const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Comic = require('../models/comic');

const handleValidationErrors = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.mapped() });
  } else {
    next();
  }
}

const handleProcessingError = (response, err) => {
  return response.status(422).json({ error: err.message });
};


// Search for Marvel comics by name
// Will return an array of comics matched by beginning of their name
// Parameter search_term must be at least 3 characters long
router.get('/',
  check('search_term')
    .isLength({ min: 3 })
    .withMessage('Search term must be at least 3 characters long.'),
  handleValidationErrors,
  (req, res) => {
    Comic.search(req.query.search_term)
      .then((results)=>{
        res.json({ results: results });
        })
      .catch((err)=>{
        handleProcessingError(res, err);
      });
  }
);

module.exports = router;
