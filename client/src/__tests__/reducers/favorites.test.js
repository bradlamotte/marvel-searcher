import reducer from '../../reducers/favorites'

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

      expect(reducer({}, {
        type: 'SET_FAVORITES',
        favorites
      }))
      .toEqual(favorites)
    })
  })

  describe('when CLEAR_FAVORITES dispatched', () => {
    it('should remove favorites', () => {
      expect(reducer({}, {
        type: 'CLEAR_FAVORITES'
      }))
      .toEqual([])
    })
  })

})
