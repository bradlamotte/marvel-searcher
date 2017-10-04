const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Comic = require('../models/comic');
const HttpNotFoundError = require('../errors/http-not-found-error');
const Favorite = require('../models/favorite');

const handleValidationErrors = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.mapped() });
  } else {
    next();
  }
}

const handleProcessingError = (response, err) => {
  const status = (err instanceof HttpNotFoundError) ? 404 : 422;
  response.status(status).json({ error: err.message });
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

// Find a specific Marvel comic
// Will return a single comic data
router.get('/:id', function(req, res){
  let comic;

  Comic.find(req.params.id)
    .then(result => {
      comic = result;
      return Favorite.get({comicId: req.params.id});
    })
    .then(favorite => {
      comic.favorite = (favorite.comicId == req.params.id)
      res.json({ comic });
    })
    .catch((err)=>{
      handleProcessingError(res, err);
    });
});

module.exports = router;
