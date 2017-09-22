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
  static count(callback){
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
              resolve();
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
}

module.exports = Favorite;
