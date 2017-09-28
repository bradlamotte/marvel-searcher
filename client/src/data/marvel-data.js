import $ from 'jquery';

export default class MarvelData {

  static character_search(search_term = '') {
    return new Promise((resolve, reject)=>{
      if(search_term.length >= 3){
        const searchUrl = `/characters/?search_term=${search_term}`;

        $.getJSON(searchUrl)
          .then((response) => {
            resolve(response.results);
          })
          .catch((err)=>{
            reject(err);
          });
      } else {
        reject(new TypeError('Search term must be at least 3 characters'));
      }
    });
  }

  static get_character(characterId) {
    return new Promise((resolve, reject) => {
      if(parseInt(characterId, 10) > 0){

        $.getJSON(`/characters/${characterId}`)
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      } else {
        reject(new TypeError('CharacterId must be an integer'));
      }
    })
  }

  static comic_search(search_term) {
    return new Promise((resolve, reject)=>{
      if(search_term.length >= 3){
        const searchUrl = `/comics/?search_term=${search_term}`;

        $.getJSON(searchUrl)
          .then((response) => {
            resolve(response.results);
          })
          .catch((err)=>{
            reject(err);
          })
      } else {
        reject(new TypeError('Search term must be at least 3 characters'));
      }
    });
  }

  static get_comic(comicId) {
    return new Promise((resolve, reject) => {
      if(parseInt(comicId, 10) > 0){

        $.getJSON(`/comics/${comicId}`)
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      } else {
        reject(new TypeError('ComicId must be an integer'));
      }
    })
  }

  static get_favorites() {
    return new Promise((resolve, reject) => {
      $.getJSON('/favorites')
        .then(response => {
          resolve(response.favorites);
        })
        .catch(err => {
          reject(err);
        });
    })
  }

  static _favoriteEndpoint(favoriteData = {}){
    if(favoriteData.characterId){
      return `/favorites?characterId=${favoriteData.characterId}&name=${favoriteData.name}`;
    } else if(favoriteData.comicId){
      return `/favorites?comicId=${favoriteData.comicId}&name=${favoriteData.name}`;
    }
  }

  static add_favorite(favoriteData = {}) {
    return new Promise((resolve, reject) => {

      const characterId = parseInt(favoriteData.characterId, 10);
      const comicId = parseInt(favoriteData.comicId, 10);

      if(!characterId && !comicId){
        reject(new TypeError('CharacterId or ComicId must be set'));
      } else if(characterId && comicId){
        reject(new TypeError('CharacterId and ComicId cannot both be set'))
      } else if(!favoriteData.name){
        reject(new TypeError('Name is required'));
      }

      $.post(this._favoriteEndpoint(favoriteData))
        .then(response => {
          resolve(response.favorite);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static remove_favorite(favoriteData = {}) {
    return new Promise((resolve, reject) => {

      const characterId = parseInt(favoriteData.characterId, 10);
      const comicId = parseInt(favoriteData.comicId, 10);

      if(!characterId && !comicId){
        reject(new TypeError('CharacterId or ComicId must be set'));
      } else if(characterId && comicId){
        reject(new TypeError('CharacterId and ComicId cannot both be set'))
      }

      $.ajax({
        url: this._favoriteEndpoint(favoriteData),
        type: 'DELETE'
        })
        .then(response => {
          resolve(response.favorite);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

}
