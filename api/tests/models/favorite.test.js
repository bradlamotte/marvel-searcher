const Setup = require('../setup');
const Favorite = require('../../models/favorite');
const MarvelDataMock = require('../mocks/marvel-data-mock');

describe('models/favorite', function(){
  before(function(done) {
    Setup.db_connection(done);
  });

  beforeEach(function() {
    Setup.clear_db();
  });

  describe('add', function(){

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
