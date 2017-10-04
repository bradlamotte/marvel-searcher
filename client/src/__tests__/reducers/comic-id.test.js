import reducer from '../../reducers/comic-id'
import setComicIdAction from '../../actions/set-comic-id';
import clearComicIdAction from '../../actions/clear-comic-id';

describe('comic id reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toBeNull();
  })

  describe('when SET_COMIC_ID dispatched', () => {
    it('should update comicId', () => {
      expect(reducer({}, setComicIdAction(123)))
      .toEqual(123)
    })
  })

  describe('when CLEAR_COMIC_ID dispatched', () => {
    it('should remove comicId', () => {
      expect(reducer({}, clearComicIdAction()))
      .toBeNull()
    })
  })

})
