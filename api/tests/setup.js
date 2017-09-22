require('dotenv').load();
const DB = require('../db/db');

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const should = chai.should();

class Setup{

  static db_connection(done){
    DB.connect(done);
  }

  static clear_db(){
    const db = DB.get();
    db.listCollections().forEach(
      function(collection) {
        db.collection(collection.name).remove()
      }
    );
  }
}

module.exports = Setup;
