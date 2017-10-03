export default function characterId(state = null, action) {
  switch (action.type) {
    case 'SET_CHARACTER_ID':
      return Object.assign({}, state, {
        characterId: action.characterId
      })
    default:
      return state
  }
}
