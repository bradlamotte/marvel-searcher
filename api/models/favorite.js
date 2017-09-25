const db = require('../db/db');
const request = require('request');
const Promise = require('promise');
const MarvelData = require('../services/marvel-data');

class Favorite{

  constructor(params = {}){
    Object.assign(this, {
      characterId: parseInt(params.characterId),
      comicId: parseInt(params.comicId)
    });
  }

  // Returns the total number of favorites in the database
  // Class method
  // Returns a Promise
  static count(){
    return new Promise((resolve, reject)=>{
      db.favorites().find().count((err, cnt)=>{
        if(err){
          reject(err)
        } else {
          resolve(cnt);
        }
      });
    });
  }

  // Creates a new favorite in the database.
  // Validates model attributes before inserting.
  // Class method
  // Returns a Promise
  add(){
    return new Promise((resolve, reject)=>{
      try{
        this.validate();

        db.favorites().insertOne(
          this._toInsertJSON(),
          (err, result)=>{
            if(err){
              reject(err)
            } else {
              resolve(this);
            }
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  // Object format used to insert into database
  _toInsertJSON(){
    return {
      characterId: this.characterId,
      comicId: this.comicId,
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
  // Returns a Promise
  static get(params = {}){
    return new Promise((resolve, reject)=>{
      const characterId = parseInt(params.characterId);
      const comicId = parseInt(params.comicId);

      if(!characterId && !comicId){
        reject(new TypeError("A valid characterId or comicId must be passed in"));
      } else if(characterId && comicId){
        reject(new TypeError("A characterId and comicId cannot both be passed in"));
      } else {

        let query;
        let project;

        if(characterId){
          query = { characterId: characterId };
          project = {characterId: true, _id: false};
        } else if(comicId){
          project = {comicId: true, _id: false};
        }

        db.favorites().find(query, project).toArray((err, results) => {
          if(err){
            reject(err);
          } else {
            const favorite = results.length > 0 ? results[0] : {};
            resolve(favorite);
          }
        });
      }
    });

  }
}

module.exports = Favorite;
