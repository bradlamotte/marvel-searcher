const Setup = require('../setup');
const Character = require('../../models/character');
const CharacterFixture = require('../fixtures/character');
const MarvelDataMock = require('../mocks/marvel-data-mock');
const HttpNotFoundError = require('../../errors/http-not-found-error');

describe('models/character', function(){

  describe('search', function(){

    beforeEach(() => {
      const mock = new MarvelDataMock();
      mock.character_search();
    });

    describe('with missing search_term parameter', function(){
      it('should be rejected with TypeError', function(done){
        Character.search().should.be.rejectedWith(TypeError).notify(done);
      });
    });

    describe('with search term less than 3 characters', function(){
      it('should be rejected with TypeError', function(done){
        Character.search('te').should.be.rejectedWith(TypeError, 'at least 3 characters').notify(done);
      });
    });

    describe('with valid parameters', function(){
      it('should respond with an array', function(done){
        Character.search('hulk').should.eventually.be.an('array').notify(done);
      })
    });
  });

  describe('find', function(){

    describe('with undefined characterId', function(){
      it('should be rejected with TypeError', function(done){
        Character.find().should.eventually.be.rejectedWith(TypeError, 'must be an integer').notify(done);
      });
    });

    describe('with non-integer characterId', function(){
      it('should be rejected with TypeError', function(done){
        Character.find('test').should.eventually.be.rejectedWith(TypeError, 'must be an integer').notify(done);
      });
    });

    describe('with characterId that has no corresponding character', function(){
      before(() => {
        const mock = new MarvelDataMock();
        mock.character_find_invalid();
      });

      it('should be rejected with HttpNotFoundError', function(done){
        Character.find(123456789).should.eventually.be.rejectedWith(HttpNotFoundError, "couldn't find").notify(done);
      });
    });

    describe('with valid characterId but MarvelData returns wrong format', () => {
      before(() => {
        const mock = new MarvelDataMock();
        mock.character_find_empty();
      });

      it('should be rejected with Error', (done) => {
        Character.find(123).should.eventually.be.rejectedWith(Error).notify(done)
      })
    })

    describe('with valid characterId', function(){
      before(() => {
        const mock = new MarvelDataMock();
        mock.character_find_valid();
      });

      it('should respond with Character object', function(done){
        Character.find(123).should.eventually.be.an.instanceOf(Character).notify(done);
      });
    });
  });
});
