const request = require('request');
const MarvelData = require('../services/marvel-data');
const HttpNotFoundError = require('../errors/http-not-found-error');

class Character{

  constructor(params){
    this._id = params._id; // maps to database ID
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
    this.imageUrl = params.imageUrl;
  }

  // Calls Marvel api to search for characters by name
  // Class method
  // Returns a Promise
  static search(search_term){
    return new Promise((resolve, reject)=>{
      if(!search_term) { reject(new TypeError("Search term cannot be empty")) };
      if(search_term.length < 3) {
        reject(new TypeError("Search term must be at least 3 characters"))
      } else {
        let requestConfig = MarvelData.requestConfig('/characters', { nameStartsWith: search_term });
        request(requestConfig, (error, response, body) => {
          if(error){
            reject(error);
          } else {
            resolve(JSON.parse(body).data.results);
          }
        });
      }
    });
  }

  // Calls Marvel api to find a specific character
  // Class method
  // Returns a Promise
  static find(characterId){
    return new Promise((resolve, reject)=>{
      const id = parseInt(characterId);
      if(!id) {
        reject(new TypeError('characterId must be an integer'))
      } else {
        const requestConfig = MarvelData.requestConfig(`/characters/${id}`);

        request(requestConfig, (error, response, body) => {
          if(error){
            reject(error);
          } else if(response.statusCode == 404){
            reject(new HttpNotFoundError("We couldn't find that character", 404));
          } else {
            const data = JSON.parse(body).data.results[0];
            const character = new Character(data);
            resolve(character);
          }
        });
      }
    });
  }
}

module.exports = Character;
