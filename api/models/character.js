const request = require('request-promise-native');
const MarvelData = require('../services/marvel-data');
const HttpNotFoundError = require('../errors/http-not-found-error');

class Character{

  constructor(params){
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
    this.imageData = params.thumbnail;
  }

  // Calls Marvel api to search for characters by name
  // Class method
  // Returns a Promise
  static async search(search_term){
    if(!search_term) { throw new TypeError("Search term cannot be empty") }
    if(search_term.length < 3) { throw new TypeError("Search term must be at least 3 characters") }
    let requestConfig = MarvelData.requestConfig('/characters', { nameStartsWith: search_term });
    const response = await request(requestConfig)
    return response.data.results
  }

  // Calls Marvel api to find a specific character
  // Class method
  // Returns a Promise
  static async find(characterId){
    const id = parseInt(characterId);
    if(!id) { throw new TypeError('characterId must be an integer') }
    const requestConfig = MarvelData.requestConfig(`/characters/${id}`);

    try{
      const response = await request(requestConfig)
      return new Character(response.data.results[0])
    } catch (err) {
      if(err.statusCode == 404){
        throw new HttpNotFoundError("We couldn't find that character", 404)
      } else {
        throw err
      }
    }
  }
}

module.exports = Character;
