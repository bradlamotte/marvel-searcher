import React from 'react';
import CharacterSearchBox from '../components/character-search-box';
import Character from '../components/character';
import { PageHeader } from 'react-bootstrap';

export default class HeroPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {character: null};
    this.onResultSelected = this.onResultSelected.bind(this);
  }

  onResultSelected(character){
    this.setState({character: character});
  }

  render(){
    return(
      <div id="hero-page">
        <PageHeader>Heroes</PageHeader>
        <CharacterSearchBox onResultSelected={this.onResultSelected} />
        {this.state.character && <Character character={this.state.character} />}
      </div>
    );
  }
}
