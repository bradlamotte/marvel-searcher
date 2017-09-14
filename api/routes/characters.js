const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const request = require('request');

const handleValidationErrors = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.mapped() });
  } else {
    next();
  }
}

router.route('/')
  .get(
    check('search_term', 'Search term must be at least 3 characters long.').isLength({ min: 3 }),
    handleValidationErrors,
    function (req, res) {
      request({
        uri: process.env.MARVEL_ENDPOINT + '/characters',
        qs: {
          apikey: process.env.MARVEL_API_KEY,
          nameStartsWith: req.query.search_term
        }
      }).pipe(res);
    }
  );

module.exports = router;
