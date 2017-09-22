const merge = require('merge');

class MarvelData{

  // Abstract the construction of the config needed for every marvel api request
  static requestConfig(path, query){
    const uri = process.env.MARVEL_ENDPOINT + path;

    // Merge passed-in query object with necessary authentication data
    let qs = merge({
      apikey: process.env.MARVEL_API_KEY
    }, query);

    return {
      uri:  uri,
      headers: {
        'Referer': process.env.HOST
      },
      qs: qs
    }
  }
}

module.exports = MarvelData;
