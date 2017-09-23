import React from 'react';
import CharacterSearchBox from '../components/character-search-box';
import Character from '../components/character';
import { PageHeader } from 'react-bootstrap';
import $ from 'jquery';
import { withRouter } from 'react-router-dom';

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
    const characterId = this.props.match.params.characterId;
    if(characterId) this._getCharacter(characterId);
  }

  _getCharacter(characterId){
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

  onResultSelected(character){
    if(character && character.id){
      this.setState({ errorMessage: '' });
      this.props.history.push(`/heroes/${character.id}`);
      this._getCharacter(character.id);
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

export default withRouter(HeroPage);
