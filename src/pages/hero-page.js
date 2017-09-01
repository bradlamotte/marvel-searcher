import React from 'react';
import SearchBox from '../components/search-box';
import Character from '../components/character';

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
        <SearchBox onResultSelected={this.onResultSelected} />
        {this.state.character && <Character character={this.state.character} />}
      </div>
    );
  }
}
