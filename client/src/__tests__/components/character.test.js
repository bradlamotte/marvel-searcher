import React from 'react';
import TestProvider from '../../__helpers__/test-provider'
import Character from '../../components/character';

describe('Character tests', function(){
  const character = (preloadStore = {}) => {
    return TestProvider.provide(<Character />, preloadStore)
  }

  describe('with no character prop', function(){
    it('does not render a character', () => {
      const divs = character().find('div.character-area').length
      expect(divs).toBe(0);
    })
  })

  describe('with valid character prop', function(){
    it('render a character', () => {
      const preload = {character: {name: 'Hulk'}}
      const divs = character(preload).find('div.character-area').length
      expect(divs).toBe(1);
    })
  })
})
