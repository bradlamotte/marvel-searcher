import reducer from '../../reducers/favorites'
import setFavoritesAction from '../../actions/set-favorites';
import clearFavoritesAction from '../../actions/clear-favorites';

describe('favorites reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  })

  describe('when SET_FAVORITES dispatched', () => {
    it('should update favorites', () => {
      const favorites = [
        { name: 'Hulk', character: 123 },
        { name: 'Avengers', comicId: 456 }
      ];

      expect(reducer({}, setFavoritesAction(favorites)))
      .toEqual(favorites)
    })
  })

  describe('when CLEAR_FAVORITES dispatched', () => {
    it('should remove favorites', () => {
      expect(reducer({}, clearFavoritesAction()))
      .toEqual([])
    })
  })

})
