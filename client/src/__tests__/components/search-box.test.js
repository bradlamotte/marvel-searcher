import React from 'react';
import SearchBox from '../../components/search-box';
import { mount } from 'enzyme';

describe('Autosuggest integration', function(){
  let mountedSearchBox;
  let mountedAutoSuggest;

  const defaultOnResultSelected = jest.fn();
  const defaultRenderSuggestion = jest.fn();
  const defaultGetSuggestionValue = jest.fn();
  const defaultGetSuggestions = jest.fn();

  const searchBox = (props) => {
    if (!mountedSearchBox) {
      const newProps = Object.assign({
        onResultSelected: defaultOnResultSelected,
        renderSuggestion: defaultRenderSuggestion,
        getSuggestionValue: defaultGetSuggestionValue,
        getSuggestions: defaultGetSuggestions
      }, props);

      mountedSearchBox = mount(<SearchBox {...newProps} />);
    }
    return mountedSearchBox;
  };

  const autoSuggest = () => {
    if(!mountedAutoSuggest){
      mountedAutoSuggest = searchBox().find('Autosuggest');
    }
    return mountedAutoSuggest;
  };

  beforeEach(() => {
    mountedSearchBox = undefined;
    mountedAutoSuggest = undefined;
  });

  it('renders a SearchBox', () => {
    expect(searchBox().find(SearchBox).length).toBe(1);
  });

  describe('correct props passed to Autosuggest', function(){
    it('passes SearchBox internal _onSuggestionsFetchRequested method', () => {
      expect(autoSuggest().props().onSuggestionsFetchRequested).toBe(searchBox().instance()._onSuggestionsFetchRequested);
    });

    it('passes SearchBox internal _onSuggestionsClearRequested method', () => {
      expect(autoSuggest().props().onSuggestionsClearRequested).toBe(searchBox().instance()._onSuggestionsClearRequested);
    });

    it('passes SearchBox props getSuggestionValue method', () => {
      expect(autoSuggest().props().getSuggestionValue).toBe(defaultGetSuggestionValue);
    });

    it('passes SearchBox props renderSuggestion method', () => {
      expect(autoSuggest().props().renderSuggestion).toBe(defaultRenderSuggestion);
    });

    it('passes SearchBox internal inputProps object', () => {
      expect(autoSuggest().props().inputProps).toEqual(searchBox().instance()._inputProps());
    });

    it('passes SearchBox internal _onSuggestionSelected method', () => {
      expect(autoSuggest().props().onSuggestionSelected).toBe(searchBox().instance()._onSuggestionSelected);
    });

    it('passes SearchBox internal _shouldRenderSuggestions method', () => {
      expect(autoSuggest().props().shouldRenderSuggestions).toBe(searchBox().instance()._shouldRenderSuggestions);
    });
  });

});
