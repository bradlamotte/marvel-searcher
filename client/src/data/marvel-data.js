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
