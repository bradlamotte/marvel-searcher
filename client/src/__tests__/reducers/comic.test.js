import reducer from '../../reducers/comic'
import setComicAction from '../../actions/set-comic';
import clearComicAction from '../../actions/clear-comic';

describe('comic reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toBeNull();
  })

  describe('when SET_COMIC dispatched', () => {
    it('should update comic', () => {
      const comic = {
        name: 'Avengers',
        description: 'Bunch of heroes'
      };

      expect(reducer({}, setComicAction(comic)))
      .toEqual(comic)
    })
  })

  describe('when CLEAR_COMIC dispatched', () => {
    it('should remove comic', () => {
      expect(reducer({}, clearComicAction()))
      .toBeNull()
    })
  })

})
