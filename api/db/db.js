const MongoClient = require('mongodb').MongoClient
const endpoint = process.env[`MONGODB_${process.env.NODE_ENV.toUpperCase()}`];

let state = {
  db: null
}

exports.connect = function(done) {
  if (state.db) return done()

  MongoClient.connect(endpoint, function(err, db) {
    if (err) return done(err)
    state.db = db
    done()
  })
}

exports.endpoint = function(){
  return endpoint;
}

exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}

exports.favorites = function(){
  return state.db.collection("favorites");
}
