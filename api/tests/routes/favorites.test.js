const Setup = require('../setup');
const request = require('supertest');
const app = require('../../app');

describe('routes/favorites', function(){

  before(function(done) {
    Setup.db_connection(done);
  });

  describe('adding', function(){

    beforeEach(function(done) {
      Setup.clear_db(done);
    });

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
          .query({characterId: 123, comicId: 456})
          .expect(422, done);
      });
    });

    describe('with non-integer characterId', function(){
      it('should respond with 422 status', function(done){
        request(app)
          .post('/favorites')
          .query({characterId: 'test'})
          .expect(422, done);
      });
    });

    describe('with non-integer comicId', function(){
      it('should respond with 422 status', function(done){
        request(app)
          .post('/favorites')
          .query({comicId: 'test'})
          .expect(422, done);
      });
    });

    describe('with valid characterId', function(){
      it('should respond with valid content type and status', function(done){
        request(app)
          .post('/favorites')
          .query({characterId: 123})
          .expect('Content-Type', /json/)
          .expect(200, done);
      });

      it('should respond with an object containing favorite', function(done){
        request(app)
          .post('/favorites')
          .query({characterId: 123})
          .expect((res)=>{
            res.body.should.have.property('favorite');
          })
          .end(done);
      });
    });

    describe('with valid comicId', function(){
      it('should respond with valid content type and status', function(done){
        request(app)
          .post('/favorites')
          .query({comicId: 123})
          .expect('Content-Type', /json/)
          .expect(200, done);
      });

      it('should respond with an object containing favorite', function(done){
        request(app)
          .post('/favorites')
          .query({comicId: 123})
          .expect((res)=>{
            res.body.should.have.property('favorite');
          })
          .end(done);
      });
    });

  });
});
