require('dotenv').load();
const DB = require('../../db/db');
const Favorite = require('../../models/favorite');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const should = chai.should();

describe('models/favorite', function(){
  before(function(done) {
    DB.connect(done);
  });

  beforeEach(function() {
    const db = DB.get();
    db.listCollections().forEach(
      function(collection) {
        db.collection(collection.name).remove()
      }
    );
  });

  describe('Add', function(){

    describe('with non-integer characterId', function(){
      it('should be rejected with TypeError', function(done){
        const favorite = new Favorite({characterId: 'test'});
        favorite.add().should.be.rejectedWith(TypeError).notify(done);
      });
    });

    describe('adding with non-integer comicId', function(){
      it('should be rejected with TypeError', function(done){
        const favorite = new Favorite({comidId: 'test'});
        favorite.add().should.be.rejectedWith(TypeError).notify(done);
      });
    });

    describe('adding with no parameters', function(){
      it('should be rejected with TypeError', function(done){
        const favorite = new Favorite();
        favorite.add().should.be.rejectedWith(TypeError).notify(done);
      });
    });

    describe('adding with valid characterId and comicId', function(){
      it('should be rejected with TypeError', function(done){
        const favorite = new Favorite({characterId: 123, comicId: 123});
        favorite.add().should.be.rejectedWith(TypeError).notify(done);
      });
    });

    describe('adding with valid characterId', function(){
      it('should be fulfilled', function(done){
        const favorite = new Favorite({characterId: 123});
        favorite.add().should.be.fulfilled.notify(done);
      });
    });

    describe('adding with valid comicId', function(){
      it('should be fulfilled', function(done){
        const favorite = new Favorite({comicId: 123});
        favorite.add().should.be.fulfilled.notify(done);
      });
    });
  });
});
