import React from 'react';
import CharacterSearchBox from '../components/character-search-box';
import Character from '../components/character';
import { PageHeader } from 'react-bootstrap';
import ErrorMessage from '../components/error-message';
import MarvelData from '../data/marvel-data';
import { connect } from 'react-redux'
import setCharacterIdAction from '../actions/set-character-id'
import clearCharacterIdAction from '../actions/clear-character-id'
import setCharacterAction from '../actions/set-character'
import clearCharacterAction from '../actions/clear-character'

class HeroPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = { errorMessage: '' };
    this.onResultSelected = this.onResultSelected.bind(this);
  }

  componentDidMount() {
    if(this.props.match.params.characterId){
      this.props.setCharacterId(this.props.match.params.characterId);
    }
  }

  componentWillUnmount() {
    this.props.clearCharacterId();
    this.props.clearCharacter();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.characterId){
      this._getCharacter(nextProps.characterId);
    }
  }

  _getCharacter(characterId){
    MarvelData.get_character(characterId)
      .then(response=>{
        console.log("character retrieved %o", response);
        this.props.setCharacter(response.character);
      })
      .catch((err)=>{
        const msg = err.responseText || err.message;
        console.log("error getting character %o", msg);
        this.setState({ errorMessage: msg });
      });
  }

  onResultSelected(character){
    if(character && character.id){
      this.setState({ errorMessage: '' });
      this.props.setCharacterId(character.id);
      this.props.history.push(`/heroes/${character.id}`);
    }
  }

  render(){
    return(
      <div id="hero-page">
        <PageHeader>Heroes</PageHeader>
        <CharacterSearchBox onResultSelected={this.onResultSelected} />
        <ErrorMessage msg={this.state.errorMessage} />
        <Character />
      </div>
    );
  }
}

function mapStateToProps(state){
  return { characterId: state.characterId }
}

function mapDispatchToProps(dispatch) {
  return {
    setCharacterId: (characterId) => {
      dispatch(setCharacterIdAction(characterId))
    },
    setCharacter: (character) => {
      dispatch(setCharacterAction(character))
    },
    clearCharacterId: () => {
      dispatch(clearCharacterIdAction())
    },
    clearCharacter: () => {
      dispatch(clearCharacterAction())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroPage);
