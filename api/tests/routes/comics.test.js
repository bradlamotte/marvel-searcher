const Setup = require('../setup');
const request = require('supertest');
const app = require('../../app');
const MarvelDataMock = require('../mocks/marvel-data-mock');
const Favorite = require('../../models/favorite');

describe('routes/comics', function(){

  before(function(done) {
    Setup.db_connection(done);
  });

  beforeEach(function(done) {
    Setup.clear_db(done);
  });

  describe('searching', function(){

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

  describe('finding', function(){

    describe('with non-integer comicId', function(){
      it('should respond with 422 status', function(done){
        request(app)
          .get('/comics/test')
          .expect(422, done);
      });
    });

    describe('with comic that does not correspond to a comic', function(){
      beforeEach(() => {
        const mock = new MarvelDataMock();
        mock.comic_find_invalid();
      });

      it('should respond with 404 status', function(done){
        request(app)
          .get('/comics/123456789')
          .expect(404, done);
      });
    });

    describe('with valid comic', function(){
      beforeEach(() => {
        const mock = new MarvelDataMock();
        mock.comic_find_valid();
      });

      it('should respond with valid content type and status', function(done){
        request(app)
          .get('/comics/123')
          .expect('Content-Type', /json/)
          .expect(200, done);
      });

      it('should respond with an object containing Comic as an object', function(done){
        request(app)
          .get('/comics/123')
          .expect((res)=>{
            res.body.should.have.property('comic');
          })
          .end(done);
      });

      describe('when comic is a favorite', function(){
        it('should respond with favorite: true', function(done){
          const favorite = new Favorite({comicId: 123, name: 'test'});

          // insert new favorite
          favorite.add()
            .then(result => {
              request(app)
                .get('/comics/123')
                // make request to find a comic
                .expect((res)=>{
                  res.body.comic.favorite.should.be.true;
                })
              .end(done);
            })
            .catch(done);
        });
      });

      describe('when comic is not a favorite', function(){
        it('should respond with favorite: false', function(done){
          request(app)
            .get('/comics/123')
            .expect((res)=>{
              res.body.comic.favorite.should.be.false;
            })
            .end(done);
        });
      });
    });
  });
});
