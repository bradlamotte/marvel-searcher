const request = require('supertest');
const app = require('../app');
const nock = require('nock');

describe('Character search', function(){

  // Mock external requests to Marvel endpoint
  beforeEach(() => {
    nock(process.env.MARVEL_ENDPOINT)
      .get('/characters')
      .query(true)
      .reply(200, [{name: 'Hulk', description: 'Strong guy'}, {one: 'two'}]);
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
        .set({search_term: 'hulk'})
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should respond with an Array', function(done){
      request(app)
        .get('/characters')
        .set({search_term: 'hulk'})
        .expect(function(res){
          if(!Array.isArray(res.body)){
            throw new Error('Response is not an array');
          }
        })
        .end(done);
    });
  });

});
