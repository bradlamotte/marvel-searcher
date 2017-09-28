import MarvelData from '../data/marvel-data';
import $ from 'jquery';

describe('MarvelData', function(){

  describe('character search', () => {

    describe('with empty search term', () => {
      it('should be rejected with TypeError', () => {
        expect.assertions(1);
        return expect(MarvelData.character_search()).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with 2 character search term', () => {
      it('should be rejected with TypeError', () => {
        expect.assertions(1);
        return expect(MarvelData.character_search('te')).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with valid search term', () => {
      it('should respond with an array of characters', () => {
        jest.mock('jquery');
        const responseCharacters = [{one: 'two'}, {three: 'four'}];
        $.setResponse({results: responseCharacters});
        expect.assertions(1);
        return expect(MarvelData.character_search('test')).resolves.toEqual(responseCharacters);
      });
    });

  });

  describe('get character', () => {

    describe('with empty characterId', () => {
      it('should be rejected with TypeError', () => {
        expect.assertions(1);
        return expect(MarvelData.get_character()).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with non-integer characterId', () => {
      it('should be rejected with TypeError', () => {
        expect.assertions(1);
        return expect(MarvelData.get_character('test')).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with valid characterId', () => {
      it('should return an object', () => {
        jest.mock('jquery');
        const characterResponse = {favorite: true, character: {one: 'two'}};
        $.setResponse(characterResponse);
        expect.assertions(1);
        return expect(MarvelData.get_character(123)).resolves.toEqual(characterResponse);
      });
    });

  });

  describe('comic search', () => {

    describe('with empty search term', () => {
      it('should be rejected with TypeError', () => {
        expect.assertions(1);
        return expect(MarvelData.comic_search()).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with 2 character search term', () => {
      it('should be rejected with TypeError', () => {
        expect.assertions(1);
        return expect(MarvelData.comic_search('te')).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with valid search term', () => {
      it('should respond with an array of comics', () => {
        jest.mock('jquery');
        const responseComics = [{one: 'two'}, {three: 'four'}];
        $.setResponse({results: responseComics});
        expect.assertions(1);
        return expect(MarvelData.comic_search('test')).resolves.toEqual(responseComics);
      });
    });

  });

  describe('get comic', () => {

    describe('with empty comicId', () => {
      it('should be rejected with TypeError', () => {
        expect.assertions(1);
        return expect(MarvelData.get_comic()).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with non-integer comicId', () => {
      it('should be rejected with TypeError', () => {
        expect.assertions(1);
        return expect(MarvelData.get_comic('test')).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with valid comicId', () => {
      it('should return an object', () => {
        jest.mock('jquery');
        const comicReponse = {favorite: true, comic: {one: 'two'}};
        $.setResponse(comicReponse);
        expect.assertions(1);
        return expect(MarvelData.get_comic(123)).resolves.toEqual(comicReponse);
      });
    });

  });

  describe('get favorites', () => {

    it('should return an array', () => {
      jest.mock('jquery');
      const favoritesReponse = [{one: 'two', three: 'four'}];
      $.setResponse({favorites: favoritesReponse});
      expect.assertions(1);
      return expect(MarvelData.get_favorites()).resolves.toEqual(favoritesReponse);
    });

  });

  describe('add favorite', () => {

    describe('with missing characterId and comicId', () => {
      it('should be rejected with TypeError', () => {
        expect.assertions(1);
        return expect(MarvelData.add_favorite({name: 'test'})).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with missing name', () => {
      it('should be rejected with TypeError', () => {
        expect.assertions(1);
        return expect(MarvelData.add_favorite({characterId: 123, comicId: 456})).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with non-integer characterId', () => {
      it('should be rejected with TypeError', () => {
        expect.assertions(1);
        return expect(MarvelData.add_favorite({characterId: 'test', name: 'test'})).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with non-integer comicId', () => {
      it('should be rejected with TypeError', () => {
        expect.assertions(1);
        return expect(MarvelData.add_favorite({comicId: 'test', name: 'test'})).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with valid characterId', () => {
      it('should return an object', () => {
        jest.mock('jquery');
        const favoriteReponse = {one: 'two'};
        $.setResponse({favorite: favoriteReponse});
        expect.assertions(1);
        return expect(MarvelData.add_favorite({characterId: 123, name: 'test'})).resolves.toEqual(favoriteReponse);
      });
    });

    describe('with valid comicId', () => {
      it('should return an object', () => {
        jest.mock('jquery');
        const favoriteReponse = {one: 'two'};
        $.setResponse({favorite: favoriteReponse});
        expect.assertions(1);
        return expect(MarvelData.add_favorite({comicId: 123, name: 'test'})).resolves.toEqual(favoriteReponse);
      });
    });

  });

  describe('remove favorite', () => {

    describe('with missing characterId and comicId', () => {
      it('should be rejected with TypeError', () => {
        expect.assertions(1);
        return expect(MarvelData.remove_favorite()).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with non-integer characterId', () => {
      it('should be rejected with TypeError', () => {
        expect.assertions(1);
        return expect(MarvelData.remove_favorite({characterId: 'test'})).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with non-integer comicId', () => {
      it('should be rejected with TypeError', () => {
        expect.assertions(1);
        return expect(MarvelData.remove_favorite({comicId: 'test'})).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with valid characterId', () => {
      it('should return an object', () => {
        jest.mock('jquery');
        const favoriteReponse = {one: 'two'};
        $.setResponse({favorite: favoriteReponse});
        expect.assertions(1);
        return expect(MarvelData.remove_favorite({characterId: 123})).resolves.toEqual(favoriteReponse);
      });
    });

    describe('with valid comicId', () => {
      it('should return an object', () => {
        jest.mock('jquery');
        const favoriteReponse = {one: 'two'};
        $.setResponse({favorite: favoriteReponse});
        expect.assertions(1);
        return expect(MarvelData.remove_favorite({comicId: 123})).resolves.toEqual(favoriteReponse);
      });
    });

  });
});
