import $ from 'jquery';

export default class MarvelData {

  static character_search(search_term) {
    return new Promise((resolve, reject)=>{
      const searchUrl = `/characters/?search_term=${search_term}`;

      $.getJSON(searchUrl)
        .done((response) => {
          resolve(response.results);
        })
        .fail((err)=>{
          reject(err);
        })
    });
  }

  static comic_search(search_term) {
    return new Promise((resolve, reject)=>{
      const searchUrl = `/comics/?search_term=${search_term}`;

      $.getJSON(searchUrl)
        .done((response) => {
          resolve(response.results);
        })
        .fail((err)=>{
          reject(err);
        })
    });
  }

}
