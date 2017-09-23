import React from 'react';
import ComicSearchBox from '../components/comic-search-box';
import Comic from '../components/comic';
import { PageHeader } from 'react-bootstrap';
import $ from 'jquery';

export default class ComicPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      comic: null,
      errorMessage: ''
    };
    this.onResultSelected = this.onResultSelected.bind(this);
  }

  componentDidMount() {
    this._getComic(this.props.match.params.comicId);
  }

  componentWillReceiveProps(nextProps) {
    this._getComic(nextProps.match.params.comicId);
  }

  _getComic(comicId){
    if(comicId){
      $.getJSON(`/comics/${comicId}`)
        .done((response)=>{
          console.log("comic retrieved %o", response.comic);
          this.setState({ comic: response.comic });
          })
        .fail((response)=>{
          console.log("error getting comic %o", response.responseJSON);
          this.setState({ errorMessage: response.responseJSON.error });
        });
    }
  }

  onResultSelected(comic){
    if(comic && comic.id){
      this.setState({ errorMessage: '' });
      this.props.history.push(`/comics/${comic.id}`);
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
      <div id="comic-page">
        <PageHeader>Comics</PageHeader>
        <ComicSearchBox onResultSelected={this.onResultSelected} />

        {this._displayErrorMessage()}

        {this.state.comic && <Comic comic={this.state.comic} />}
      </div>
    );
  }
}
