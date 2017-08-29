import React from 'react';
import SearchBox from './search-box';
import Character from './character';

export default class Characters extends React.Component{
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
      <div id="characters">
        <SearchBox onCharacterFound={this.onCharacterFound} />
        {this.state.character && <Character character={this.state.character} />}
      </div>
    );
  }
}
