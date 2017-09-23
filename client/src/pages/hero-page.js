import React from 'react';
import CharacterSearchBox from '../components/character-search-box';
import Character from '../components/character';
import { PageHeader } from 'react-bootstrap';
import $ from 'jquery';

class HeroPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      character: null,
      errorMessage: ''
    };
    this.onResultSelected = this.onResultSelected.bind(this);
  }

  componentDidMount() {
    this._getCharacter(this.props.match.params.characterId);
  }

  componentWillReceiveProps(nextProps) {
    this._getCharacter(nextProps.match.params.characterId);
  }

  _getCharacter(characterId){
    if(characterId){
      $.getJSON(`/characters/${characterId}`)
        .done((response)=>{
          console.log("character retrieved", response.character);
          this.setState({ character: response.character });
          })
        .fail((response)=>{
          console.log("error getting character", response.responseJSON);
          this.setState({ errorMessage: response.responseJSON.error });
        });
    }
  }

  onResultSelected(character){
    if(character && character.id){
      this.setState({ errorMessage: '' });
      this.props.history.push(`/heroes/${character.id}`);
    }
  }

  _displayErrorMessage(){
    if(this.state.errorMessage.length > 0){
      return(
        <div className="alert alert-danger">
          {this.state.errorMessage}
        </div>
      );
    } else {
      return null;
    }
  }

  render(){
    return(
      <div id="hero-page">
        <PageHeader>Heroes</PageHeader>
        <CharacterSearchBox onResultSelected={this.onResultSelected} />

        {this._displayErrorMessage()}

        {this.state.character && <Character character={this.state.character} />}
      </div>
    );
  }
}

export default HeroPage;
