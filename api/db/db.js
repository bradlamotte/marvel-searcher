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

exports.favorites = function(){
  return state.db.collection("favorites");
}
