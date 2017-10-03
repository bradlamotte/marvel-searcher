import React from 'react';
import ComicSearchBox from '../../components/comic-search-box';
import { mount } from 'enzyme';

describe('SearchBox integration', function(){
  let mountedComicSearchBox;
  let mountedSearchBox;

  const defaultOnResultSelected = jest.fn();

  const comicSearchBox = (props) => {
    if (!mountedComicSearchBox) {
      const newProps = Object.assign({
        onResultSelected: defaultOnResultSelected
      }, props);

      mountedComicSearchBox = mount(<ComicSearchBox {...newProps} />);
    }
    return mountedComicSearchBox;
  };

  const searchBox = () => {
    if(!mountedSearchBox){
      mountedSearchBox = comicSearchBox().find('SearchBox');
    }
    return mountedSearchBox;
  };

  beforeEach(() => {
    mountedComicSearchBox = undefined;
    mountedSearchBox = undefined;
  });

  it('renders a SearchBox', () => {
    expect(comicSearchBox().find(ComicSearchBox).length).toBe(1);
  });

  describe('correct props passed to SearchBox', function(){
    it('passes ComicSearchBox props onResultSelected method', () => {
      expect(searchBox().props().onResultSelected).toBe(defaultOnResultSelected);
    });

    it('passes ComicSearchBox internal renderSuggestion method', () => {
      expect(searchBox().props().renderSuggestion).toBe(comicSearchBox().instance()._renderSuggestion);
    });

    it('passes ComicSearchBox internal _getSuggestionValue method', () => {
      expect(searchBox().props().getSuggestionValue).toEqual(comicSearchBox().instance()._getSuggestionValue);
    });

    it('passes ComicSearchBox internal _getSuggestions method', () => {
      expect(searchBox().props().getSuggestions).toEqual(comicSearchBox().instance()._getSuggestions);
    });
  });

});
