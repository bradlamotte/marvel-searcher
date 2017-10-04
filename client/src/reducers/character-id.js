export default function characterId(state = null, action) {
  switch (action.type) {

    case 'SET_CHARACTER_ID':
      return action.characterId

    case 'CLEAR_CHARACTER_ID':
      return null;

    default:
      return state
  }
}
