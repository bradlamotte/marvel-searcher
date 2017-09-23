const Setup = require('../setup');
const Comic = require('../../models/comic');
const ComicFixture = require('../fixtures/comic');
const MarvelDataMock = require('../mocks/marvel-data-mock');
const HttpNotFoundError = require('../../errors/http-not-found-error');

describe('models/comic', function(){

  describe('search', function(){

    beforeEach(() => {
      const mock = new MarvelDataMock();
      mock.comic_search();
    });

    describe('with missing search_term parameter', function(){
      it('should be rejected with TypeError', function(done){
        Comic.search().should.be.rejectedWith(TypeError).notify(done);
      });
    });

    describe('with search term less than 3 characters', function(){
      it('should be rejected with TypeError', function(done){
        Comic.search('te').should.be.rejectedWith(TypeError).notify(done);
      });
    });

    describe('with valid parameters', function(){
      it('should respond with an array', function(done){
        Comic.search('hulk').should.eventually.be.an('array').notify(done);
      })
    });
  });

  describe('find', function(){

    describe('with undefined comicId', function(){
      it('should be rejected with TypeError', function(done){
        Comic.find().should.eventually.be.rejectedWith(TypeError, 'must be an integer').notify(done);
      });
    });

    describe('with non-integer comicId', function(){
      it('should be rejected with TypeError', function(done){
        Comic.find('test').should.eventually.be.rejectedWith(TypeError, 'must be an integer').notify(done);
      });
    });

    describe('with comicId that has no corresponding comic', function(){
      before(() => {
        const mock = new MarvelDataMock();
        mock.comic_find_invalid();
      });

      it('should be rejected with HttpNotFoundError', function(done){
        Comic.find(123456789).should.eventually.be.rejectedWith(HttpNotFoundError, "couldn't find").notify(done);
      });
    });

    describe('with valid comicId', function(){
      before(() => {
        const mock = new MarvelDataMock();
        mock.comic_find_valid();
      });

      it('should respond with Comic object', function(done){
        Comic.find(123).should.eventually.be.an.instanceOf(Comic).notify(done);
      });
    });
  });
});
