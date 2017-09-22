const Setup = require('../setup');
const request = require('supertest');
const app = require('../../app');
const MarvelDataMock = require('../mocks/marvel-data-mock');

describe('routes/characters', function(){

  describe('searching', function(){

    // Mock external requests to Marvel endpoint with successful response
    beforeEach(() => {
      const mock = new MarvelDataMock();
      mock.character_search();
    });

    describe('with missing search term', function(){
      it('should respond with 422 status', function(done){
        request(app)
          .get('/characters')
          .expect(422, done);
      });
    });

    describe('with search term length less than 3 characters', function(){
      it('should respond with 422 status', function(done){
        request(app)
          .get('/characters')
          .set({search_term: 'ts'})
          .expect(422, done);
      });
    });

    describe('with valid search term', function(){
      it('should respond with valid content type and status', function(done){
        request(app)
          .get('/characters')
          .query({search_term: 'hulk'})
          .expect('Content-Type', /json/)
          .expect(200, done);
      });

      it('should respond with an object containing Results as an Array', function(done){
        request(app)
          .get('/characters')
          .query({search_term: 'hulk'})
          .expect((res)=>{
            res.body.should.have.property('results');
          })
          .end(done);
      });
    });
  });

  describe('finding', function(){

    describe('with non-integer characterId', function(){
      it('should respond with 422 status', function(done){
        request(app)
          .get('/characters/test')
          .expect(422, done);
      });
    });

    describe('with characterId that does not correspond to a character', function(){
      beforeEach(() => {
        const mock = new MarvelDataMock();
        mock.character_find_invalid();
      });

      it('should respond with 404 status', function(done){
        request(app)
          .get('/characters/123456789')
          .expect(404, done);
      });
    });

    describe('with valid characterId', function(){
      beforeEach(() => {
        const mock = new MarvelDataMock();
        mock.character_find_valid();
      });

      it('should respond with valid content type and status', function(done){
        request(app)
          .get('/characters/123')
          .expect('Content-Type', /json/)
          .expect(200, done);
      });

      it('should respond with an object containing Character as an object', function(done){
        request(app)
          .get('/characters/123')
          .expect((res)=>{
            res.body.should.have.property('character');
          })
          .end(done);
      });
    });

  });

});