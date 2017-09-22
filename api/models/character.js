const request = require('request');
const MarvelData = require('../services/marvel-data');

class Character{

  constructor(params){
    this._id = params._id;
    this.characterId = params.characterId;
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
      if(search_term.length < 3) { reject(new TypeError("Search term must be at least 3 characters")) };
      let requestConfig = MarvelData.requestConfig('/characters', { nameStartsWith: search_term });

      request(requestConfig, (error, response, body) => {
        if(error) reject(error);
        resolve(JSON.parse(body).data.results);
      });
    });
  }
}

module.exports = Character;
