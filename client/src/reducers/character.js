export default function character(state = null, action) {
  switch (action.type) {

    case 'SET_CHARACTER':
      return action.character;

    case 'CLEAR_CHARACTER':
      return null;

    default:
      return state
  }
}
