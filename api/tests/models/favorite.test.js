const Setup = require('../setup');
const Favorite = require('../../models/favorite');
const Promise = require('promise');

describe('models/favorite', function(){
  before(function(done) {
    Setup.db_connection(done);
  });

  beforeEach(function(done) {
    Setup.clear_db(done);
  });

  describe('add', function(){

    describe('with non-integer characterId', function(){
      it('should be rejected with TypeError', function(done){
        const favorite = new Favorite({characterId: 'test'});
        favorite.add().should.be.rejectedWith(TypeError).notify(done);
      });
    });

    describe('with non-integer comicId', function(){
      it('should be rejected with TypeError', function(done){
        const favorite = new Favorite({comidId: 'test'});
        favorite.add().should.be.rejectedWith(TypeError).notify(done);
      });
    });

    describe('with no parameters', function(){
      it('should be rejected with TypeError', function(done){
        const favorite = new Favorite();
        favorite.add().should.be.rejectedWith(TypeError).notify(done);
      });
    });

    describe('with valid characterId but no name', function(){
      it('should be rejected with TypeError', function(done){
        const favorite = new Favorite({characterId: 123});
        favorite.add().should.be.rejectedWith(TypeError).notify(done);
      });
    });

    describe('with valid characterId and comicId', function(){
      it('should be rejected with TypeError', function(done){
        const favorite = new Favorite({characterId: 123, comicId: 123});
        favorite.add().should.be.rejectedWith(TypeError).notify(done);
      });
    });

    describe('with valid characterId and name', function(){
      it('should add a record to the db', function(done){
        const favorite = new Favorite({characterId: 123, name: 'test'});
        let initialCnt;

        // get db count before add
        Favorite.count().then(cnt=>{
          initialCnt = cnt;
        })
        .then(favorite.add.bind(favorite)) // add new favorite
        .then(Favorite.count) // get db count after add
        .then(finalCnt => {
          // db count should have been incremented by 1
          finalCnt.should.equal(initialCnt + 1);
          done();
        })
        .catch(done);
      });
    });

    describe('with valid comicId and name', function(){
      it('should add a record to the db', function(done){
        const favorite = new Favorite({comicId: 123, name: 'test'});
        let initialCnt;

        // get db count before add
        Favorite.count().then(cnt=>{
          initialCnt = cnt;
        })
        .then(favorite.add.bind(favorite)) // add new favorite
        .then(Favorite.count) // get db count after add
        .then(finalCnt => {
          // db count should have been incremented by 1
          finalCnt.should.equal(initialCnt + 1);
          done();
        })
        .catch(done);
      });
    });
  });

  describe('get', function(){

    describe('with non-integer characterId', function(){
      it('should be rejected with TypeError', function(done){
        Favorite.get({characterId: 'test'}).should.be.rejectedWith(TypeError, 'valid characterId or comicId').notify(done);
      });
    });

    describe('with non-integer comicId', function(){
      it('should be rejected with TypeError', function(done){
        Favorite.get({comicId: 'test'}).should.be.rejectedWith(TypeError, 'valid characterId or comicId').notify(done);
      });
    });

    describe('with characterId and comicId', function(){
      it('should be rejected with TypeError', function(done){
        Favorite.get({characterId: 123, comicId: 123}).should.be.rejectedWith(TypeError, 'cannot both be passed').notify(done);
      });
    });

    describe('with valid characterId', function(){
      it('should return correct favorite from db', function(done){
        const favorite = new Favorite({characterId: 123, name: 'test'});

        favorite.add()
          .then(() => {
            return Favorite.get({characterId: 123});
            })
          .then(result => {
            result.should.have.property('characterId', 123);
            done();
            })
          .catch(done);
      });
    });

    describe('with valid comicId', function(){
      it('should return correct favorite from db', function(done){
        const favorite = new Favorite({comicId: 123, name: 'test'});

        favorite.add()
          .then(() => {
            return Favorite.get({comicId: 123});
            })
          .then(result => {
            result.should.have.property('comicId', 123);
            done();
            })
          .catch(done);
      });
    });

  });

  describe('remove', function(){

    describe('with non-integer characterId', function(){
      it('should be rejected with TypeError', function(done){
        const favorite = new Favorite({characterId: 'test'});
        favorite.remove().should.be.rejectedWith(TypeError, 'valid characterId or comicId').notify(done);
      });
    });

    describe('with non-integer comicId', function(){
      it('should be rejected with TypeError', function(done){
        const favorite = new Favorite({comicId: 'test'});
        favorite.remove().should.be.rejectedWith(TypeError, 'valid characterId or comicId').notify(done);
      });
    });

    describe('with characterId and comicId', function(){
      it('should be rejected with TypeError', function(done){
        const favorite = new Favorite({characterId: 123, comicId: 123});
        favorite.remove().should.be.rejectedWith(TypeError, 'cannot both be set').notify(done);
      });
    });

    describe('with characterId not in db', function(){
      it('should not delete anything from db', function(done){
        const favorite = new Favorite({characterId: 123, name: 'test'});
        let initialCnt;

        // get count of favorites before any action
        Favorite.count().then(cnt=>{
          initialCnt = cnt;
        })
        .then(favorite.remove.bind(favorite)) // remove favorite
        .then(Favorite.count) // get db count after remove
        .then(finalCnt => {
          // db count should be same as initial count
          finalCnt.should.equal(initialCnt);
          done();
        })
        .catch(done);
      });
    });

    describe('with characterId in db', function(){
      it('should delete 1 record from db', function(done){
        const favorite = new Favorite({characterId: 123, name: 'test'});
        let initialCnt;

        favorite.add()
        .then(Favorite.count)
        .then(cnt => {
          initialCnt = cnt;
        })
        .then(favorite.remove.bind(favorite)) // remove favorite
        .then(Favorite.count) // get db count after add
        .then(finalCnt => {
          // db count should have been decremented by 1
          finalCnt.should.equal(initialCnt - 1);
          done();
        })
        .catch(done);
      });
    });

    describe('with comicId not in db', function(){
      it('should not delete anything from db', function(done){
        const favorite = new Favorite({comicId: 123, name: 'test'});
        let initialCnt;

        // get count of favorites before any action
        Favorite.count().then(cnt=>{
          initialCnt = cnt;
        })
        .then(favorite.remove.bind(favorite)) // remove favorite
        .then(Favorite.count) // get db count after remove
        .then(finalCnt => {
          // db count should be same as initial count
          finalCnt.should.equal(initialCnt);
          done();
        })
        .catch(done);
      });
    });

    describe('with comicId in db', function(){
      it('should delete 1 record from db', function(done){
        const favorite = new Favorite({comicId: 123, name: 'test'});
        let initialCnt;

        favorite.add()
        .then(Favorite.count)
        .then(cnt => {
          initialCnt = cnt;
        })
        .then(favorite.remove.bind(favorite)) // remove favorite
        .then(Favorite.count) // get db count after add
        .then(finalCnt => {
          // db count should have been decremented by 1
          finalCnt.should.equal(initialCnt - 1);
          done();
        })
        .catch(done);
      });
    });

  });
});
