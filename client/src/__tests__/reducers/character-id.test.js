import reducer from '../../reducers/character-id'

describe('character id reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toBeNull();
  })

  describe('when SET_CHARACTER_ID dispatched', () => {
    it('should update characterId', () => {
      expect(reducer({}, {
        type: 'SET_CHARACTER_ID',
        characterId: 123
      }))
      .toEqual(123)
    })
  })

  describe('when CLEAR_CHARACTER_ID dispatched', () => {
    it('should remove characterId', () => {
      expect(reducer({}, {
        type: 'CLEAR_CHARACTER_ID'
      }))
      .toBeNull()
    })
  })

})
