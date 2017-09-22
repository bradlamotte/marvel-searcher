const request = require('request');
const MarvelData = require('../services/marvel-data');

class Comic{

  constructor(params){
    this._id = params._id;
    this.comicId = params.comicId;
    this.title = params.title;
    this.description = params.description;
    this.imageUrl = params.imageUrl;
  }

  // Calls Marvel api to search for comics by name
  // Class method
  // Returns a Promise
  static search(search_term){
    return new Promise((resolve, reject)=>{
      if(!search_term) {
        reject(new TypeError("Search term cannot be empty"))
      } else if(search_term.length < 3) {
        reject(new TypeError("Search term must be at least 3 characters"))
      } else {
        let requestConfig = MarvelData.requestConfig('/comics', { titleStartsWith: search_term });
        request(requestConfig, (error, response, body) => {
          if(error) reject(error);
          resolve(JSON.parse(body).data.results);
        });
      }
    });
  }
}

module.exports = Comic;
