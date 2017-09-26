import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import '../style/favorite-control.css';
import $ from 'jquery';

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
    let endpoint;

    if(this.props.characterId){
      endpoint = `/favorites?characterId=${this.props.characterId}&name=${this.props.name}`;
    } else if(this.props.comicId){
      endpoint = `/favorites?comicId=${this.props.comicId}&name=${this.props.name}`;
    }

    if(this.state.isFavorite){
      this._removeFavorite(endpoint);
    } else {
      this._addFavorite(endpoint);
    }
  }

  _addFavorite(endpoint){
    $.post(endpoint)
      .done(result=>{
        console.log("added favorite");
        this.setState({ isFavorite: true });
      })
      .fail(err=>{
        console.log("error when adding favorite %o", err.responseText);
      });
  }

  _removeFavorite(endpoint){
    $.ajax({
      url: endpoint,
      type: 'DELETE',
      success: (result) => {
        console.log("removed favorite");
        this.setState({ isFavorite: false });
        if(this.props.onRemoved){
          this.props.onRemoved({characterId: this.props.characterId, comicId: this.props.comicId});
        }
      },
      fail: (err) => {
        console.log("error when removing favorite", err);
      }
    });
  }

  render(){
    return(
      <div className={`favorite-control ${this.state.isFavorite ? 'is-favorite' : ''}`}>
        <a href onClick={this._changeStatus}>
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
  isFavorite: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  characterId: PropTypes.number,
  comicId: PropTypes.number,
  onRemoved: PropTypes.func
};
