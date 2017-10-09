import $ from 'jquery';

export default class MarvelData {

  static async character_search(search_term = '') {
    if(search_term.length < 3) { throw new TypeError('Search term must be at least 3 characters') }
    const searchUrl = `/characters/?search_term=${search_term}`;
    const response = await $.getJSON(searchUrl)
    return response.results
  }

  static async get_character(characterId) {
    const id = parseInt(characterId, 10)
    if(!Number.isInteger(id)) { throw new TypeError('CharacterId must be an integer') }
    return await $.getJSON(`/characters/${id}`)
  }

  static async comic_search(search_term) {
    if(search_term.length < 3) { throw new TypeError('Search term must be at least 3 characters') }
    const searchUrl = `/comics/?search_term=${search_term}`;
    const response = await $.getJSON(searchUrl)
    return response.results
  }

  static async get_comic(comicId) {
    const id = parseInt(comicId, 10)
    if(!Number.isInteger(id)) { throw new TypeError('ComicId must be an integer') }
    return await $.getJSON(`/comics/${id}`)
  }

  static async get_favorites() {
    const response = await $.getJSON('/favorites')
    return response.favorites
  }

  static _favoriteEndpoint(favoriteData = {}){
    let endpoint;
    if(favoriteData.characterId){
      endpoint = `/favorites?characterId=${favoriteData.characterId}`
    } else if(favoriteData.comicId){
      endpoint = `/favorites?comicId=${favoriteData.comicId}`
    }

    if(favoriteData.name){
      endpoint += `&name=${favoriteData.name}`
    }

    return endpoint;
  }

  static async add_favorite(favoriteData = {}) {
    const characterId = parseInt(favoriteData.characterId, 10);
    const comicId = parseInt(favoriteData.comicId, 10);

    if(!characterId && !comicId) { throw new TypeError('CharacterId or ComicId must be set') }
    if(characterId && comicId) { throw new TypeError('CharacterId and ComicId cannot both be set') }
    if(!favoriteData.name) { throw new TypeError('Name is required') }

    const response = await $.post(this._favoriteEndpoint(favoriteData))
    return response.favorite
  }

  static async remove_favorite(favoriteData = {}) {
    const characterId = parseInt(favoriteData.characterId, 10);
    const comicId = parseInt(favoriteData.comicId, 10);

    if(!characterId && !comicId) { throw new TypeError('CharacterId or ComicId must be set') }
    if(characterId && comicId) { throw new TypeError('CharacterId and ComicId cannot both be set') }

    const response = await $.ajax({
      url: this._favoriteEndpoint(favoriteData),
      type: 'DELETE'
      })
    return response.favorite
  }

}
