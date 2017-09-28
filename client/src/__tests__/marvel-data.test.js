import MarvelData from '../data/marvel-data';
import $ from 'jquery';

describe('MarvelData', function(){

  describe('character search', () => {

    describe('with empty search term', () => {
      it('should be rejected with TypeError', () => {
        expect.assertions(1);
        return MarvelData.character_search().catch(err => {
          expect(err).toBeInstanceOf(TypeError);
        });
      });
    });

    describe('with 2 character search term', () => {
      it('should be rejected with TypeError', () => {
        expect.assertions(1);
        return MarvelData.character_search('te').catch(err => {
          expect(err).toBeInstanceOf(TypeError);
        });
      });
    });

    describe('with valid search term', () => {
      it('should respond with an array of characters', () => {
        jest.mock('jquery');
        const responseCharacters = [{one: 'two'}, {three: 'four'}];
        $.setResponse({results: responseCharacters});
        expect.assertions(1);
        expect(MarvelData.character_search('test')).resolves.toEqual(responseCharacters);
      });
    });

  });

  describe('comic search', () => {

    describe('with empty search term', () => {
      it('should be rejected with TypeError', () => {
        expect.assertions(1);
        return MarvelData.comic_search().catch(err => {
          expect(err).toBeInstanceOf(TypeError);
        });
      });
    });

    describe('with 2 character search term', () => {
      it('should be rejected with TypeError', () => {
        expect.assertions(1);
        return MarvelData.comic_search('te').catch(err => {
          expect(err).toBeInstanceOf(TypeError);
        });
      });
    });

    describe('with valid search term', () => {
      it('should respond with an array of comics', () => {
        jest.mock('jquery');
        const responseComics = [{one: 'two'}, {three: 'four'}];
        $.setResponse({results: responseComics});
        expect.assertions(1);
        expect(MarvelData.comic_search('test')).resolves.toEqual(responseComics);
      });
    });

  });
});