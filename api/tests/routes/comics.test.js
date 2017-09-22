const request = require('supertest');
const app = require('../../app');
const MarvelDataMock = require('../mocks/marvel-data-mock');

describe('routes/comics', function(){

  // Mock external requests to Marvel endpoint with successful response
  beforeEach(() => {
    const mock = new MarvelDataMock();
    mock.comic_search();
  });

  describe('with missing search term', function(){
    it('should respond with 422 status', function(done){
      request(app)
        .get('/comics')
        .expect(422, done);
    });
  });

  describe('with search term length less than 3 characters', function(){
    it('should respond with 422 status', function(done){
      request(app)
        .get('/comics')
        .set({search_term: 'ts'})
        .expect(422, done);
    });
  });

  describe('with valid search term', function(){
    it('should respond with valid content type and status', function(done){
      request(app)
        .get('/comics')
        .query({search_term: 'spider'})
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should respond with an object containing Results as an Array', function(done){
      request(app)
        .get('/comics')
        .query({search_term: 'spider'})
        .expect((res)=>{
          res.body.should.have.property('results');
        })
        .end(done);
    });
  });

});
