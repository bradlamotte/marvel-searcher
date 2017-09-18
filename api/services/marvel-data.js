const request = require('request');
const merge = require('merge');

class MarvelData{

  // Abstract the construction of the config needed for every marvel api request
  _requestConfig(path, query){
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

  // Validation method to ensure a callback function is passed in
  _validateCallback(callback){
    if (typeof(callback) != 'function') {
      throw new Error("Callback is not a function");
    }
  }

  // Call Marvel api to search for characters by name
  search(search_term, callback){
    if(search_term == '') { throw new Error("Search term cannot be empty") };
    this._validateCallback(callback);
    let requestConfig = this._requestConfig('/characters', { nameStartsWith: search_term });

    request(requestConfig, (error, response, body) => {
      callback(JSON.parse(body).data.results);
    });
  }
}

module.exports = MarvelData;
