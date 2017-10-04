export default function comicId(state = null, action) {
  switch (action.type) {

    case 'SET_COMIC_ID':
      return action.comicId

    case 'CLEAR_COMIC_ID':
      return null;

    default:
      return state
  }
}
