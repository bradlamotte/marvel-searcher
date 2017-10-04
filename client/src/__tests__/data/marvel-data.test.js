import MarvelData from '../../data/marvel-data';
import $ from 'jquery';

describe('MarvelData', function(){

  beforeEach(()=>{
    jest.clearAllMocks()
  });

  describe('character search', () => {

    describe('with empty search term', () => {
      it('should be rejected with TypeError', () => {
        expect(MarvelData.character_search()).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with 2 character search term', () => {
      it('should be rejected with TypeError', () => {
        expect(MarvelData.character_search('te')).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with valid search term', () => {
      it('should call the correct endpoint and respond with an array of characters', () => {
        const searchResponse = [{one: 'two'}, {three: 'four'}];
        $.setResponse({results: searchResponse})
        expect.assertions(2);

        return MarvelData.character_search('test').then(response => {
          expect($.getJSON.mock.calls[0][0]).toEqual('/characters/?search_term=test')
          expect(response).toEqual(searchResponse)
        })
      });
    });

  });

  describe('get character', () => {

    describe('with empty characterId', () => {
      it('should be rejected with TypeError', () => {
        expect(MarvelData.get_character()).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with non-integer characterId', () => {
      it('should be rejected with TypeError', () => {
        expect(MarvelData.get_character('test')).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with valid characterId', () => {
      it('should call correct endpoint and return a character object', () => {
        const characterResponse = {character: {one: 'two'}};
        $.setResponse(characterResponse)
        expect.assertions(2);

        return MarvelData.get_character(123).then(response => {
          expect($.getJSON.mock.calls[0][0]).toEqual('/characters/123')
          expect(response).toEqual(characterResponse)
        })
      });
    });

  });

  describe('comic search', () => {

    describe('with empty search term', () => {
      it('should be rejected with TypeError', () => {
        expect(MarvelData.comic_search()).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with 2 character search term', () => {
      it('should be rejected with TypeError', () => {
        expect(MarvelData.comic_search('te')).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with valid search term', () => {
      it('should call correct endpoint and respond with an array of comics', () => {
        const searchResponse = [{one: 'two'}, {three: 'four'}];
        $.setResponse({results: searchResponse})
        expect.assertions(2);

        return MarvelData.comic_search('test').then(response => {
          expect($.getJSON.mock.calls[0][0]).toEqual('/comics/?search_term=test')
          expect(response).toEqual(searchResponse)
        })
      });
    });

  });

  describe('get comic', () => {

    describe('with empty comicId', () => {
      it('should be rejected with TypeError', () => {
        expect(MarvelData.get_comic()).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with non-integer comicId', () => {
      it('should be rejected with TypeError', () => {
        expect(MarvelData.get_comic('test')).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with valid comicId', () => {
      it('should return an object', () => {
        const comicResponse = {comic: {one: 'two'}};
        $.setResponse(comicResponse)
        expect.assertions(2);

        return MarvelData.get_comic(123).then(response => {
          expect($.getJSON.mock.calls[0][0]).toEqual('/comics/123')
          expect(response).toEqual(comicResponse)
        })
      });
    });

  });

  describe('get favorites', () => {

    it('should return an array', () => {
      const favoritesReponse = [{one: 'two', three: 'four'}];
      $.setResponse({favorites: favoritesReponse});
      expect.assertions(2);

      return MarvelData.get_favorites().then(response => {
        expect(response).toEqual(favoritesReponse)
        expect($.getJSON.mock.calls[0][0]).toEqual('/favorites')
      })
    });

  });

  describe('add favorite', () => {

    describe('with missing characterId and comicId', () => {
      it('should be rejected with TypeError', () => {
        expect(MarvelData.add_favorite({name: 'test'})).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with missing name', () => {
      it('should be rejected with TypeError', () => {
        expect(MarvelData.add_favorite({characterId: 123, comicId: 456})).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with non-integer characterId', () => {
      it('should be rejected with TypeError', () => {
        expect(MarvelData.add_favorite({characterId: 'test', name: 'test'})).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with non-integer comicId', () => {
      it('should be rejected with TypeError', () => {
        expect(MarvelData.add_favorite({comicId: 'test', name: 'test'})).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with valid characterId', () => {
      it('should call the correct endpoint and return a favorite object', () => {
        const favoriteReponse = {one: 'two'};
        $.setResponse({favorite: favoriteReponse});
        expect.assertions(2)

        return MarvelData.add_favorite({characterId: 123, name: 'test'}).then(response => {
          expect($.post.mock.calls[0][0]).toEqual('/favorites?characterId=123&name=test')
          expect(response).toEqual(favoriteReponse)
        })
      });
    });

    describe('with valid comicId', () => {
      it('should call the correct endpoint and return a favorite object', () => {
        const favoriteReponse = {one: 'two'};
        $.setResponse({favorite: favoriteReponse});
        expect.assertions(2)

        return MarvelData.add_favorite({comicId: 123, name: 'test'}).then(response => {
          expect($.post.mock.calls[0][0]).toEqual('/favorites?comicId=123&name=test')
          expect(response).toEqual(favoriteReponse)
        })
      });
    });

  });

  describe('remove favorite', () => {

    describe('with missing characterId and comicId', () => {
      it('should be rejected with TypeError', () => {
        expect(MarvelData.remove_favorite()).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with non-integer characterId', () => {
      it('should be rejected with TypeError', () => {
        expect(MarvelData.remove_favorite({characterId: 'test'})).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with non-integer comicId', () => {
      it('should be rejected with TypeError', () => {
        expect(MarvelData.remove_favorite({comicId: 'test'})).rejects.toBeInstanceOf(TypeError);
      });
    });

    describe('with valid characterId', () => {
      it('should call the correct endpoint and return a favorite object', () => {
        const favoriteReponse = {one: 'two'};
        $.setResponse({favorite: favoriteReponse});

        return MarvelData.remove_favorite({characterId: 123}).then(response => {
          expect($.ajax.mock.calls[0][0]).toEqual({ url: '/favorites?characterId=123', type: 'DELETE' })
          expect(response).toEqual(favoriteReponse)
        })
      });
    });

    describe('with valid comicId', () => {
      it('should call the correct endpoint and return a favorite object', () => {
        const favoriteReponse = {one: 'two'};
        $.setResponse({favorite: favoriteReponse});
        expect.assertions(2)

        return MarvelData.remove_favorite({comicId: 123}).then(response => {
          expect($.ajax.mock.calls[0][0]).toEqual({ url: '/favorites?comicId=123', type: 'DELETE' })
          expect(response).toEqual(favoriteReponse)
        })
      });
    });

  });
});
