import React from 'react';
import SearchBox from './search-box';
import PropTypes from 'prop-types';
import MarvelImage from './marvel-image';
import MarvelData from '../data/marvel-data';

export default class ComicSearchBox extends React.Component{
  constructor(props){
    super(props);
    this.SEARCH_PATH = '/comics';
  }

  _renderSuggestion = suggestion => {
    return (
      <div>
        <MarvelImage imageData={suggestion.thumbnail} imageStyle="standard_small" />
        {suggestion.title}
      </div>
    );
  }

  _getSuggestionValue = suggestion => suggestion.title;

  _getSuggestions = search_term => {
    return MarvelData.comic_search(search_term);
  }

  render(){
    return <SearchBox
      onResultSelected={this.props.onResultSelected}
      searchPath={this.SEARCH_PATH}
      renderSuggestion={this._renderSuggestion}
      getSuggestionValue={this._getSuggestionValue}
      getSuggestions={this._getSuggestions}
      type="comic" />
  }
}

SearchBox.propTypes = {
  onResultSelected: PropTypes.func.isRequired
};
