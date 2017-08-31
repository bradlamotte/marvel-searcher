import React from 'react';
import SearchBox from '../components/search-box';
import Character from '../components/character';

export default class HeroPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {character: null};
    this.onCharacterFound = this.onCharacterFound.bind(this);
  }

  onCharacterFound(character){
    this.setState({character: character});
  }

  render(){
    return(
      <div id="hero-page">
        <SearchBox onCharacterFound={this.onCharacterFound} />
        {this.state.character && <Character character={this.state.character} />}
      </div>
    );
  }
}
