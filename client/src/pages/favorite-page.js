import React from 'react';
import FavoriteControl from '../components/favorite-control';
import { PageHeader, Table } from 'react-bootstrap';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import '../style/favorite-page.css';

class FavoritePage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      errorMessage: ''
    };
    this._onFavoriteRemoved = this._onFavoriteRemoved.bind(this);
  }

  componentDidMount() {
    $.getJSON('/favorites')
      .done((response)=>{
        console.log("favorites retrieved", response.favorites);
        this.setState({ favorites: response.favorites });
      })
      .fail((response)=>{
        console.log("error getting favorites", response);
        this.setState({ errorMessage: response.responseText });
      });
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

  _favoritePath(favorite){
    if(favorite.characterId){
      return `/heroes/${favorite.characterId}`;
    } else if(favorite.comicId) {
      return  `/comics/${favorite.comicId}`;
    }
    return null;
  }

  _onFavoriteRemoved(favorite){
    const toDeleteIndex = this.state.favorites.findIndex(f => {
      if(favorite.characterId) return favorite.characterId === f.characterId;
      if(favorite.comicId) return favorite.comicId === f.comicId;
      return false;
    });

    console.log("toDelete", toDeleteIndex);
    const newFavorites = this.state.favorites.slice(); //copy array
    newFavorites.splice(toDeleteIndex, 1); //remove element
    this.setState({ favorites: newFavorites }); //update state
  }

  render(){
    return(
      <div id="favorite-page">
        <PageHeader>Favorites</PageHeader>
        {this._displayErrorMessage()}

        <Table striped responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Click to Remove</th>
            </tr>
          </thead>
          <tbody>
            {this.state.favorites.map((favorite, index)=>{
              return (
                <tr key={index}>
                  <td>
                    <Link to={this._favoritePath(favorite)}>
                      {favorite.name}
                    </Link>
                  </td>
                  <td>{ favorite.characterId ? 'Hero' : 'Comic' }</td>
                  <td>
                  <FavoriteControl
                    isFavorite={true}
                    characterId={favorite.characterId}
                    comicId={favorite.comicId}
                    name={favorite.name}
                    onRemoved={this._onFavoriteRemoved}
                    /></td>
                </tr>);
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default FavoritePage;
