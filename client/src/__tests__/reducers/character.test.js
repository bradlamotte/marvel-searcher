import reducer from '../../reducers/character'
import setCharacterAction from '../../actions/set-character';
import clearCharacterAction from '../../actions/clear-character';

describe('character reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toBeNull();
  })

  describe('when SET_CHARACTER dispatched', () => {
    it('should update character', () => {
      const character = {
        name: 'Hulk',
        description: 'Strong guy'
      };

      expect(reducer({}, setCharacterAction(character)))
      .toEqual(character)
    })
  })

  describe('when CLEAR_CHARACTER dispatched', () => {
    it('should remove character', () => {
      expect(reducer({}, clearCharacterAction()))
      .toBeNull()
    })
  })

})
