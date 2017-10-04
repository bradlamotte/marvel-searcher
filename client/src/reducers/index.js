import { combineReducers } from 'redux'
import character from './character'
import characterId from './character-id'
import comicId from './comic-id'

export default combineReducers({
  character,
  characterId,
  comicId
})
