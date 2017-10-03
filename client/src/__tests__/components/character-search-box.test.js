import React from 'react';
import CharacterSearchBox from '../../components/character-search-box';
import { mount } from 'enzyme';

describe('SearchBox integration', function(){
  let mountedCharacterSearchBox;
  let mountedSearchBox;

  const defaultOnResultSelected = jest.fn();

  const characterSearchBox = (props) => {
    if (!mountedCharacterSearchBox) {
      const newProps = Object.assign({
        onResultSelected: defaultOnResultSelected
      }, props);

      mountedCharacterSearchBox = mount(<CharacterSearchBox {...newProps} />);
    }
    return mountedCharacterSearchBox;
  };

  const searchBox = () => {
    if(!mountedSearchBox){
      mountedSearchBox = characterSearchBox().find('SearchBox');
    }
    return mountedSearchBox;
  };

  beforeEach(() => {
    mountedCharacterSearchBox = undefined;
    mountedSearchBox = undefined;
  });

  it('renders a SearchBox', () => {
    expect(characterSearchBox().find(CharacterSearchBox).length).toBe(1);
  });

  describe('correct props passed to SearchBox', function(){
    it('passes CharacterSearchBox props onResultSelected method', () => {
      expect(searchBox().props().onResultSelected).toBe(defaultOnResultSelected);
    });

    it('passes CharacterSearchBox internal renderSuggestion method', () => {
      expect(searchBox().props().renderSuggestion).toBe(characterSearchBox().instance()._renderSuggestion);
    });

    it('passes CharacterSearchBox internal _getSuggestionValue method', () => {
      expect(searchBox().props().getSuggestionValue).toEqual(characterSearchBox().instance()._getSuggestionValue);
    });

    it('passes CharacterSearchBox internal _getSuggestions method', () => {
      expect(searchBox().props().getSuggestions).toEqual(characterSearchBox().instance()._getSuggestions);
    });
  });

});
