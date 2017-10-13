import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import '../style/favorite-control.css';
import MarvelData from '../data/marvel-data';

export default class FavoriteControl extends React.Component{
  constructor(props){
    super(props);
    this.state = { isFavorite: props.isFavorite };
    this._changeStatus = this._changeStatus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isFavorite: nextProps.isFavorite });
  }

  _changeStatus(e){
    e.preventDefault();

    if(this.state.isFavorite){
      this._removeFavorite();
    } else {
      this._addFavorite();
    }
  }

  _addFavorite(endpoint){
    MarvelData.add_favorite({
      characterId: this.props.characterId,
      comicId: this.props.comicId,
      name: this.props.name
    }).then(result => {
      console.log("added favorite");
      this.setState({ isFavorite: true });
    }).catch(err=>{
      console.log("error when adding favorite %o", err.responseText);
    });
  }

  _removeFavorite(endpoint){
    MarvelData.remove_favorite({
      characterId: this.props.characterId,
      comicId: this.props.comicId,
      name: this.props.name
    }).then(result => {
      console.log("removed favorite");
      this.setState({ isFavorite: false });
      if(this.props.onRemoved){
        this.props.onRemoved(result);
      }
    }).catch(err => {
      console.log("error when removing favorite", err);
    });
  }

  render(){
    return(
      <div className={`favorite-control ${this.state.isFavorite ? 'is-favorite' : ''}`}>
        <a href="" onClick={this._changeStatus}>
          <Glyphicon glyph={this.state.isFavorite ? 'heart' : 'heart-empty'}></Glyphicon>
          <span>
            { this.state.isFavorite ? 'One of your favorites!' : 'Add to your favorites!' }
          </span>
        </a>
      </div>
    );
  }
}

FavoriteControl.propTypes = {
  isFavorite: PropTypes.bool,
  name: PropTypes.string.isRequired,
  characterId: PropTypes.number,
  comicId: PropTypes.number,
  onRemoved: PropTypes.func
}

FavoriteControl.defaultProps = {
  isFavorite: false
}
