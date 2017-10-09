const jquery = jest.genMockFromModule('jquery');

let responseJSON;

function setResponse(json){
  responseJSON = json;
}

async function getJSON(url) {
  return responseJSON
}

async function post(url){
  return responseJSON
}

async function ajax(config){
  return responseJSON
}

jquery.setResponse = setResponse;
jquery.getJSON = jquery.mockImplementation(getJSON);
jquery.post = jquery.mockImplementation(post);
jquery.ajax = jquery.mockImplementation(ajax);
module.exports = jquery;
