export default function comicId(state = null, action) {
  switch (action.type) {
    case 'SET_COMIC_ID':
      return Object.assign({}, state, {
        comicId: action.comicId
      })
    default:
      return state
  }
}
