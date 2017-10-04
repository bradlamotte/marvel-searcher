export default function comic(state = null, action) {
  switch (action.type) {

    case 'SET_COMIC':
      return action.comic;

    case 'CLEAR_COMIC':
      return null;

    default:
      return state
  }
}
