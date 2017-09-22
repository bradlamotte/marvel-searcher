const Setup = require('../setup');
const Comic = require('../../models/comic');
const ComicFixture = require('../fixtures/comic');
const MarvelDataMock = require('../mocks/marvel-data-mock');

describe('models/comic', function(){

  describe('when initialized with all valid attributes', function(){
    it('should set all attributes', function(done){
      data = ComicFixture.valid();
      comic = new Comic(data);
      delete comic._id
      comic.should.deep.equal(data);
      done();
    });
  });

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
});
