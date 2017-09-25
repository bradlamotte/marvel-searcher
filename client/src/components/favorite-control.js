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

  _changeStatus(e){
    e.preventDefault();
    let endpoint;

    if(this.props.characterId){
      endpoint = `/favorites?characterId=${this.props.characterId}`;
    } else if(this.props.comicId){
      endpoint = `/favorites?comic=${this.props.comicId}`;
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
        this.setState({ isFavorite: true });
      })
      .fail(err=>{
        console.log("error when adding favorite", err);
      });
  }

  _removeFavorite(endpoint){
    $.ajax({
      url: endpoint,
      type: 'DELETE',
      success: (result) => {
        this.setState({ isFavorite: false });
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
          { this.state.isFavorite ? 'One of your favorites!' : 'Add to your favorites!' }
        </a>
      </div>
    );
  }
}

FavoriteControl.propTypes = {
  isFavorite: PropTypes.bool,
  characterId: PropTypes.number,
  comicId: PropTypes.number
};
