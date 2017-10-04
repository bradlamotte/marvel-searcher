import { combineReducers } from 'redux'
import character from './character'
import characterId from './character-id'
import comicId from './comic-id'
import comic from './comic'

export default combineReducers({
  character,
  characterId,
  comicId,
  comic
})
