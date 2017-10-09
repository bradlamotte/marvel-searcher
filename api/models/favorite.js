const db = require('../db/db');
const Promise = require('promise');
const MarvelData = require('../services/marvel-data');

class Favorite{

  constructor(params = {}){
    Object.assign(this, {
      characterId: parseInt(params.characterId),
      comicId: parseInt(params.comicId),
      name: params.name
    });
  }

  // Returns the total number of favorites in the database
  // Class method
  // Returns a Promise
  static async count(){
    return await db.favorites().find().count()
  }

  // Creates a new favorite in the database.
  // Validates model attributes before inserting.
  // Class method
  // Returns a Promise
  async add(){
    this.validate();
    if(!this.name) { throw new TypeError('Name is required') }
    await db.favorites().insertOne(this._toInsertJSON())
    return this
  }

  // Object format used to insert into database
  _toInsertJSON(){
    return {
      characterId: this.characterId,
      comicId: this.comicId,
      name: this.name,
      dateAdded: new Date()
    }
  }

  // Validate attributes
  validate(){
    if(!this.characterId && !this.comicId){
      throw new TypeError('A valid characterId or comicId must be set.');
    } else if(this.characterId && this.comicId){
      throw new TypeError('A characterId and comicId cannot both be set.');
    }
  }

  // Class method
  // Queries db for favorites
  // Accepts a parms object containing either characterId or comicId
  // Returns a single favorite
  // Returns a Promise
  static async get(params = {}){
    const characterId = parseInt(params.characterId);
    const comicId = parseInt(params.comicId);

    if(!characterId && !comicId) { throw new TypeError("A valid characterId or comicId must be passed in") }
    if(characterId && comicId) { throw new TypeError("A characterId and comicId cannot both be passed in") }

    let query;
    let project;

    if(characterId){
      query = { characterId: characterId };
      project = {characterId: true, _id: false};
    } else if(comicId){
      query = { comicId: comicId };
      project = {comicId: true, _id: false};
    }

    const results = await db.favorites().find(query, project).toArray()
    return results.length > 0 ? results[0] : {};
  }

  // Class method
  // Queries db for favorites
  // Returns a an array of favorites
  // Returns a Promise
  static async getAll(params = {}){
    return await db.favorites()
      .find({}, {_id: false})
      .sort({name: 1})
      .toArray()
  }

  // Removes a favorite from the database.
  // Validates model attributes before inserting.
  // Class method
  // Returns a Promise
  async remove(){
    this.validate();
    await db.favorites().deleteOne(this._toDeleteJSON())
    return this
  }

  // Object format used to delete from database
  _toDeleteJSON(){
    if(this.characterId){
      return { characterId: this.characterId };
    } else if(this.comicId){
      return { comicId: this.comicId };
    }
  }
}

module.exports = Favorite;
