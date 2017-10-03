import React from 'react';
import ComicSearchBox from '../components/comic-search-box';
import Comic from '../components/comic';
import { PageHeader } from 'react-bootstrap';
import MarvelData from '../data/marvel-data';
import FavoriteControl from '../components/favorite-control';
import '../style/comic-page.css';
import { connect } from 'react-redux'
import setComicIdAction from '../actions/set-comic-id'

class ComicPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      comic: null,
      errorMessage: '',
      isFavorite: false
    };
    this.onResultSelected = this.onResultSelected.bind(this);
  }

  componentDidMount() {
    if(this.props.match.params.comicId){
      this.props.setComicId(this.props.match.params.comicId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.comicId){
      this._getComic(nextProps.match.params.comicId);
    }
  }

  _getComic(comicId){
    MarvelData.get_comic(comicId)
      .then((response)=>{
        console.log("comic retrieved %o", response.comic);
        this.setState({
          comic: response.comic,
          isFavorite: response.favorite
        });
      })
      .catch((response)=>{
        console.log("error getting comic %o", response.responseJSON);
        this.setState({ errorMessage: response.responseJSON.error });
      });
  }

  onResultSelected(comic){
    if(comic && comic.id){
      this.setState({ errorMessage: '' });
      this.props.setComicId(comic.id);
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

        {this.state.comic &&
          <div className="favorite-control-wrapper">
            <FavoriteControl isFavorite={this.state.isFavorite} comicId={this.state.comic.id} name={this.state.comic.title} />
          </div>
        }

        {this.state.comic && <Comic comic={this.state.comic} />}
      </div>
    );
  }
}

function mapStateToProps(state){
  return { comicId: state.comicId }
}

function mapDispatchToProps(dispatch) {
  return {
    setComicId: (comicId) => {
      dispatch(setComicIdAction(comicId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComicPage)
