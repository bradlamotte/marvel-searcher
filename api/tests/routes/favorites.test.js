const Setup = require('../setup');
const request = require('supertest');
const app = require('../../app');
const Favorite = require('../../models/favorite');

describe('routes/favorites', function(){

  before(function(done) {
    Setup.db_connection(done);
  });

  beforeEach(function(done) {
    Setup.clear_db(done);
  });

  describe('getting', function(){

    it('should respond with array under the favorites property', function(done){
      const favoriteA = new Favorite({comicId: 123, name: 'A test'});
      const favoriteB = new Favorite({characterId: 456, name: 'B test'});
      let initialCnt;

      favoriteA.add()
        .then(favoriteB.add.bind(favoriteB))
        .then(() => {
          request(app)
            .get('/favorites')
            .expect(200)
            .expect((res)=>{
              res.body.favorites.should.be.an('array').and.have.lengthOf(2);
            })
            .end(done);
        });
    });
  });

  describe('adding', function(){

    describe('with no characterId or comicId', function(){
      it('should respond with 422 status', function(done){
        request(app)
          .post('/favorites')
          .expect(422, done);
      });
    });

    describe('with both characterId and comicId', function(){
      it('should respond with 422 status', function(done){
        request(app)
          .post('/favorites')
          .query({characterId: 123, comicId: 456, name: 'test'})
          .expect(422, done);
      });
    });

    describe('with non-integer characterId', function(){
      it('should respond with 422 status', function(done){
        request(app)
          .post('/favorites')
          .query({characterId: 'test', name: 'test'})
          .expect(422, done);
      });
    });

    describe('with non-integer comicId', function(){
      it('should respond with 422 status', function(done){
        request(app)
          .post('/favorites')
          .query({comicId: 'test', name: 'test'})
          .expect(422, done);
      });
    });

    describe('with valid characterId but no name', function(){
      it('should respond with 422 status', function(done){
        request(app)
          .post('/favorites')
          .query({characterId: 123})
          .expect(422, done);
      });
    });

    describe('with valid comicId but no name', function(){
      it('should respond with 422 status', function(done){
        request(app)
          .post('/favorites')
          .query({comicId: 123})
          .expect(422, done);
      });
    });

    describe('with valid characterId and name', function(){
      it('should respond with valid content type and status', function(done){
        request(app)
          .post('/favorites')
          .query({characterId: 123, name: 'test'})
          .expect('Content-Type', /json/)
          .expect(200, done);
      });

      it('should respond with a favorite property', function(done){
        request(app)
          .post('/favorites')
          .query({characterId: 123, name: 'test'})
          .expect((res)=>{
            res.body.should.have.property('favorite');
          })
          .end(done);
      });
    });

    describe('with valid comicId and name', function(){
      it('should respond with valid content type and status', function(done){
        request(app)
          .post('/favorites')
          .query({comicId: 123, name: 'test'})
          .expect('Content-Type', /json/)
          .expect(200, done);
      });

      it('should respond with a favorite property', function(done){
        request(app)
          .post('/favorites')
          .query({comicId: 123, name: 'test'})
          .expect((res)=>{
            res.body.should.have.property('favorite');
          })
          .end(done);
      });
    });

  });

  describe('removing', function(){

    describe('with no characterId or comicId', function(){
      it('should respond with 422 status', function(done){
        request(app)
          .delete('/favorites')
          .expect(422, done);
      });
    });

    describe('with both characterId and comicId', function(){
      it('should respond with 422 status', function(done){
        request(app)
          .delete('/favorites')
          .query({characterId: 123, comicId: 456})
          .expect(422, done);
      });
    });

    describe('with non-integer characterId', function(){
      it('should respond with 422 status', function(done){
        request(app)
          .delete('/favorites')
          .query({characterId: 'test'})
          .expect(422, done);
      });
    });

    describe('with non-integer comicId', function(){
      it('should respond with 422 status', function(done){
        request(app)
          .delete('/favorites')
          .query({comicId: 'test'})
          .expect(422, done);
      });
    });

    describe('with valid characterId', function(){
      it('should respond with valid content type and status', function(done){
        request(app)
          .delete('/favorites')
          .query({characterId: 123})
          .expect('Content-Type', /json/)
          .expect(200, done);
      });
    });

    describe('with valid comicId', function(){
      it('should respond with valid content type and status', function(done){
        request(app)
          .delete('/favorites')
          .query({comicId: 123})
          .expect('Content-Type', /json/)
          .expect(200, done);
      });
    });

  });
});
