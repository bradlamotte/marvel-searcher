const Setup = require('../setup');
const Character = require('../../models/character');
const CharacterFixture = require('../fixtures/character');
const MarvelDataMock = require('../mocks/marvel-data-mock');

describe('models/character', function(){

  describe('when initialized with all valid attributes', function(){
    it('should set all attributes', function(done){
      data = CharacterFixture.valid();
      character = new Character(data);
      delete character._id
      character.should.deep.equal(data);
      done();
    });
  });

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
        Character.search('te').should.be.rejectedWith(TypeError).notify(done);
      });
    });

    describe('with valid parameters', function(){
      it('should respond with an array', function(done){
        Character.search('hulk').should.eventually.be.an('array').notify(done);
      })
    });
  });
});
