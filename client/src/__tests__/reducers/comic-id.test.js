import reducer from '../../reducers/comic-id'

describe('comic id reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toBeNull();
  })

  describe('when SET_COMIC_ID dispatched', () => {

    it('should update comicId', () => {
      expect(reducer({}, {
        type: 'SET_COMIC_ID',
        comicId: 123
      }))
      .toEqual({
        comicId: 123
      })
    })
  })

})
