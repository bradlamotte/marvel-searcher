const jquery = jest.genMockFromModule('jquery');

let responseJSON;

function setResponse(json){
  responseJSON = json;
}

function getJSON(url) {
  return new Promise((resolve, reject) => {
    resolve(responseJSON);
  });
}

function post(url){
  return new Promise((resolve, reject) => {
    resolve(responseJSON);
  });
}

function ajax({}){
  return new Promise((resolve, reject) => {
    resolve(responseJSON);
  });
}

jquery.setResponse = setResponse;
jquery.getJSON = getJSON;
jquery.post = post;
jquery.ajax = ajax;
module.exports = jquery;
