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

}
