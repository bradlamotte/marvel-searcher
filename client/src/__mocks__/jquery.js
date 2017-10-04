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

function ajax(config){
  return new Promise((resolve, reject) => {
    resolve(responseJSON);
  });
}

jquery.setResponse = setResponse;
jquery.getJSON = jquery.mockImplementation(getJSON);
jquery.post = jquery.mockImplementation(post);
jquery.ajax = jquery.mockImplementation(ajax);
module.exports = jquery;
