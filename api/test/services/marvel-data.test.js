const request = require('supertest');
const MarvelData = require('../../services/marvel-data');
const expect = require('chai').expect;
const MarvelDataMock = require('../mocks/marvel-data-mock');

describe('marvel-data.test.js', function(){

  describe('character search', function(){

    beforeEach(() => {
      const mock = new MarvelDataMock();
      mock.character_search();
    });

    describe('with missing search_term parameter', function(){
      it('should throw an error', function(){
        data = new MarvelData();
        searchFn = () => data.character_search('');
        expect(searchFn).to.throw(Error);
      });
    });

    describe('with missing callback function', function(){
      it('should throw an error', function(){
        data = new MarvelData();
        searchFn = () => data.character_search('test', null);
        expect(searchFn).to.throw(Error);
      });
    });

    describe('with valid parameters', function(){
      it('should respond with an array', function(done){
        data = new MarvelData();
        data.character_search('test', (results)=>{
          expect(results).to.be.a('array');
          done();
        });
      })
    });
  });

  describe('comic search', function(){

    beforeEach(() => {
      const mock = new MarvelDataMock();
      mock.comic_search();
    });

    describe('with missing search_term parameter', function(){
      it('should throw an error', function(){
        data = new MarvelData();
        searchFn = () => data.comic_search('');
        expect(searchFn).to.throw(Error);
      });
    });

    describe('with missing callback function', function(){
      it('should throw an error', function(){
        data = new MarvelData();
        searchFn = () => data.comic_search('test', null);
        expect(searchFn).to.throw(Error);
      });
    });

    describe('with valid parameters', function(){
      it('should respond with an array', function(done){
        data = new MarvelData();
        data.comic_search('test', (results)=>{
          expect(results).to.be.a('array');
          done();
        });
      })
    });
  });

});
