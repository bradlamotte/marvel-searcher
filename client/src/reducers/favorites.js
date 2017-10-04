export default function favorites(state = [], action) {
  switch (action.type) {

    case 'SET_FAVORITES':
      return action.favorites;

    case 'CLEAR_FAVORITES':
      return [];

    default:
      return state
  }
}
