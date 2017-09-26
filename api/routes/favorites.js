const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Favorite = require('../models/favorite');

const handleRequestValidationErrors = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.mapped() });
  } else {
    next();
  }
};

const handleProcessingError = (response, err) => {
  response.status(422).json({ error: err.message });
};

// Add a favorite for either character or comic
// Expects either characterId or comicId parameter
router.post('/',
  check('name'),    
  check('test')
    .custom((value, { req }) => {
      const characterId = parseInt(req.query.characterId);
      const comicId = parseInt(req.query.comicId);

      if(!characterId && !comicId){
        throw new TypeError("A characterId or comicId is required");
      }

      if(characterId && comicId){
        throw new TypeError("CharacterId and comicId cannot both be set");
      }
      return true;
    }),
  handleRequestValidationErrors,
  (req, res) => {
    const favorite = new Favorite(req.query);
    favorite.add()
      .then(result => {
        res.json({favorite: result});
        })
      .catch(err => {
        handleProcessingError(res, err);
      });

  }
);

// Remove a favorite for either character or comic
// Expects either characterId or comicId parameter
router.delete('/',
  check('test')
    .custom((value, { req }) => {
      const characterId = parseInt(req.query.characterId);
      const comicId = parseInt(req.query.comicId);

      if(!characterId && !comicId){
        throw new TypeError("A characterId or comicId is required");
      }

      if(characterId && comicId){
        throw new TypeError("CharacterId and comicId cannot both be set");
      }
      return true;
    }),
  handleRequestValidationErrors,
  (req, res) => {
    const favorite = new Favorite(req.query);
    favorite.remove()
      .then(result => {
        res.json({favorite: result});
        })
      .catch(err => {
        handleProcessingError(res, err);
      });

  }
);

module.exports = router;
