import reducer from '../../reducers/character'

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

      expect(reducer({}, {
        type: 'SET_CHARACTER',
        character
      }))
      .toEqual(character)
    })
  })

  describe('when CLEAR_CHARACTER dispatched', () => {
    it('should remove character', () => {
      expect(reducer({}, {
        type: 'CLEAR_CHARACTER'
      }))
      .toBeNull()
    })
  })

})
