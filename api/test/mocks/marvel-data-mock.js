const nock = require('nock');

class MarvelDataMock{

  // Mock a successful response with results when searching for
  // characters on Marvel API
  character_search(){
    nock(process.env.MARVEL_ENDPOINT)
      .get('/characters')
      .query(true)
      .reply(200, {data: {results: [{name: 'Hulk', description: 'Strong guy'}]}});
    }

  // Mock a successful response with results when searching for
  // comics on Marvel API
  comic_search(){
    nock(process.env.MARVEL_ENDPOINT)
      .get('/comics')
      .query(true)
      .reply(200, {data: {results: [{title: 'Spider-Man', description: 'Spider stories'}]}});
    }
}

module.exports = MarvelDataMock;
