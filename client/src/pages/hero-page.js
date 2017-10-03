import React from 'react';
import CharacterSearchBox from '../components/character-search-box';
import Character from '../components/character';
import FavoriteControl from '../components/favorite-control';
import { PageHeader } from 'react-bootstrap';
import '../style/hero-page.css';
import MarvelData from '../data/marvel-data';
import { connect } from 'react-redux'
import setCharacterIdAction from '../actions/set-character-id'

class HeroPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      character: null,
      errorMessage: '',
      isFavorite: false
    };
    this.onResultSelected = this.onResultSelected.bind(this);
  }

  componentDidMount() {
    if(this.props.match.params.characterId){
      this.props.setCharacterId(this.props.match.params.characterId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.characterId){
      this._getCharacter(nextProps.match.params.characterId);
    }
  }

  _getCharacter(characterId){
    MarvelData.get_character(characterId)
      .then(response=>{
        console.log("character retrieved", response);
        this.setState({
          character: response.character,
          isFavorite: response.favorite
        });
      })
      .catch((response)=>{
        console.log("error getting character", response);
        this.setState({ errorMessage: response.responseText });
      });
  }

  onResultSelected(character){
    if(character && character.id){
      this.setState({ errorMessage: '' });
      this.props.setCharacterId(character.id);
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

        {this.state.character &&
          <div className="favorite-control-wrapper">
            <FavoriteControl isFavorite={this.state.isFavorite} characterId={this.state.character.id} name={this.state.character.name} />
          </div>
        }

        {this.state.character && <Character character={this.state.character} />}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroPage);
