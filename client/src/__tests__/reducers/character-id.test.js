import reducer from '../../reducers/character-id'
import setCharacterIdAction from '../../actions/set-character-id';
import clearCharacterIdAction from '../../actions/clear-character-id';

describe('character id reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toBeNull();
  })

  describe('when SET_CHARACTER_ID dispatched', () => {
    it('should update characterId', () => {
      expect(reducer({}, setCharacterIdAction(123)))
      .toEqual(123)
    })
  })

  describe('when CLEAR_CHARACTER_ID dispatched', () => {
    it('should remove characterId', () => {
      expect(reducer({}, clearCharacterIdAction()))
      .toBeNull()
    })
  })

})
