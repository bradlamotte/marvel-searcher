const request = require('supertest');
const MarvelData = require('../../services/marvel-data');
const expect = require('chai').expect;
const MarvelDataMock = require('../mocks/marvel-data-mock');

describe('marvel-data.test.js', function(){

  describe('search', function(){

    describe('with missing search_term parameter', function(){
      it('should throw an error', function(){
        data = new MarvelData();
        searchFn = () => data.search('');
        expect(searchFn).to.throw(Error);
      });
    });

    describe('with missing callback function', function(){
      it('should throw an error', function(){
        data = new MarvelData();
        searchFn = () => data.search('test', null);
        expect(searchFn).to.throw(Error);
      });
    });

    describe('with valid parameters', function(){
      beforeEach(() => {
        const mock = new MarvelDataMock();
        mock.character_search();
      });

      it('should respond with an array', function(done){
        data = new MarvelData();
        data.search('test', (results)=>{
          expect(results).to.be.a('array');
          done();
        });
      })
    });
  });



});
