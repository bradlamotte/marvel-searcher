import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import $ from 'jquery';
import { FormGroup } from 'react-bootstrap';
import '../style/search-box.css';
import MarvelImage from './marvel-image';

export default class SearchBox extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      value: '',
      suggestions: []
    };
  }

  _getSuggestionValue = suggestion => suggestion.name;

  _onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  _onSuggestionsFetchRequested = ({ value }) => {
    this.props.onResultSelected(null);
    let endpoint = process.env.REACT_APP_MARVEL_ENDPOINT;
    let apiKey = process.env.REACT_APP_MARVEL_API_KEY;
    let searchUrl = `${endpoint}/characters?nameStartsWith=${value}&apikey=${apiKey}`;

    $.getJSON(searchUrl, (results) => {
      let _suggestions = results.data.count > 0 ? results.data.results : [];
      this.setState({ suggestions: _suggestions });
    });
    return [];
  };

  _shouldRenderSuggestions = value => value.trim().length >= 3;

  _renderSuggestion = suggestion => {
    return (
      <div>
        <MarvelImage imageData={suggestion.thumbnail} style="standard_small" />
        {suggestion.name}
      </div>
    );
  }

  _onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  _onSuggestionSelected = (event, { suggestion }) => {
    this.setState({value: ''});
    this.props.onResultSelected(suggestion);
  }

  _inputProps(){
    return {
      placeholder: `${this.props.type || 'Hero'} name`,
      value: this.state.value,
      onChange: this._onChange
    };
  }

  render() {
    const inputProps = this._inputProps();

    return (
      <div className="search-area">
        <FormGroup>
          <div className="help-block">
            Search for your favorite hero and suggestions will be provided.
          </div>
          <Autosuggest
            suggestions={this.state.suggestions}
            onSuggestionsFetchRequested={this._onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this._onSuggestionsClearRequested}
            getSuggestionValue={this._getSuggestionValue}
            renderSuggestion={this._renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={this._onSuggestionSelected}
            shouldRenderSuggestions={this._shouldRenderSuggestions}
            />
        </FormGroup>
      </div>
    );
  }
}

SearchBox.propTypes = {
  onResultSelected: PropTypes.func.isRequired
};
