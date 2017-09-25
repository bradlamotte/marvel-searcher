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

  static clear_db(done){
    const db = DB.get();
    db.collection("favorites").remove(done);
  }
}

module.exports = Setup;
