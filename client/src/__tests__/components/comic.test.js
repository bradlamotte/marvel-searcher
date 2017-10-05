import React from 'react';
import TestProvider from '../../__helpers__/test-provider'
import Comic from '../../components/comic';

describe('Comic tests', function(){
  const comic = (preloadStore = {}) => {
    return TestProvider.provide(<Comic />, preloadStore)
  }

  describe('with no comic prop', function(){
    it('does not render a comic', () => {
      const divs = comic().find('div.comic-area').length
      expect(divs).toBe(0);
    })
  })

  describe('with valid comic prop', function(){
    it('render a comic', () => {
      const preload = {comic: {title: 'Avengers'}}
      const divs = comic(preload).find('div.comic-area').length
      expect(divs).toBe(1);
    })
  })
})
