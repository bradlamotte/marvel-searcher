import React from 'react';
import SearchBox from './search-box';
import PropTypes from 'prop-types';
import MarvelImage from './marvel-image';

export default class ComicSearchBox extends React.Component{
  constructor(props){
    super(props);
    this.MARVEL_DEPT = 'comics';
    this.MARVEL_FILTER = 'titleStartsWith';
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

  render(){
    return <SearchBox
      onResultSelected={this.props.onResultSelected}
      marvelDept={this.MARVEL_DEPT}
      marvelFilter={this.MARVEL_FILTER}
      renderSuggestion={this._renderSuggestion}
      getSuggestionValue={this._getSuggestionValue}
      type="comic" />
  }
}

SearchBox.propTypes = {
  onResultSelected: PropTypes.func.isRequired
};
