const Character = require('../../models/character');
const expect = require('chai').expect;
const CharacterFixture = require('../fixtures/character');

describe('models/character', function(){

  describe('when initialized with all valid attributes', function(){
    it('should set all attributes', function(done){
      data = CharacterFixture.valid();
      character = new Character(data);
      delete character._id
      expect(character).to.deep.equal(data);
      done();
    });
  });
});
