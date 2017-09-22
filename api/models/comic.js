const request = require('request');
const MarvelData = require('../services/marvel-data');
const HttpNotFoundError = require('../errors/http-not-found-error');

class Comic{

  constructor(params){
    this._id = params._id; // maps to database ID
    this.id = params.id;
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

  // Calls Marvel api to find a specific comic
  // Class method
  // Returns a Promise
  static find(comicId){
    return new Promise((resolve, reject)=>{
      const id = parseInt(comicId);
      if(!id) {
        reject(new TypeError('comicId must be an integer'))
      } else {
        const requestConfig = MarvelData.requestConfig(`/comics/${id}`);

        request(requestConfig, (error, response, body) => {
          if(error){
            reject(error);
          } else if(response.statusCode == 404){
            reject(new HttpNotFoundError("We couldn't find that character", 404));
          } else {
            const data = JSON.parse(body).data.results[0];
            const comic = new Comic(data);
            resolve(comic);
          }
        });
      }
    });
  }
}

module.exports = Comic;
