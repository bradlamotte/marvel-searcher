import React from 'react';
import SearchBox from './search-box';
import PropTypes from 'prop-types';
import MarvelImage from './marvel-image';

export default class CharacterSearchBox extends React.Component{
  constructor(props){
    super(props);
    this.SEARCH_PATH = '/characters';
  }

  _getSuggestionValue = suggestion => suggestion.name;

  _renderSuggestion = suggestion => {
    return (
      <div>
        <MarvelImage imageData={suggestion.thumbnail} imageStyle="standard_small" />
        {suggestion.name}
      </div>
    );
  }

  render(){
    return <SearchBox
      onResultSelected={this.props.onResultSelected}
      searchPath={this.SEARCH_PATH}
      renderSuggestion={this._renderSuggestion}
      getSuggestionValue={this._getSuggestionValue}
      />
  }
}

SearchBox.propTypes = {
  onResultSelected: PropTypes.func.isRequired
};
