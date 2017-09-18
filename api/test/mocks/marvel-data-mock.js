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
}

module.exports = MarvelDataMock;
