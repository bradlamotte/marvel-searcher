import React from 'react';
import ComicSearchBox from '../components/comic-search-box';
import Comic from '../components/comic';
import { PageHeader } from 'react-bootstrap';
import ErrorMessage from '../components/error-message';
import MarvelData from '../data/marvel-data';
import { connect } from 'react-redux'
import setComicIdAction from '../actions/set-comic-id'
import setComicAction from '../actions/set-comic'
import clearComicIdAction from '../actions/clear-comic-id'
import clearComicAction from '../actions/clear-comic'

class ComicPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = { errorMessage: '' };
    this.onResultSelected = this.onResultSelected.bind(this);
  }

  componentDidMount() {
    if(this.props.match.params.comicId){
      this.props.setComicId(this.props.match.params.comicId);
    }
  }

  componentWillUnmount() {
    this.props.clearComicId();
    this.props.clearComic();
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
        this.props.setComic(response.comic);
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

  render(){
    return(
      <div id="comic-page">
        <PageHeader>Comics</PageHeader>
        <ComicSearchBox onResultSelected={this.onResultSelected} />
        <ErrorMessage msg={this.state.errorMessage} />
        <Comic />
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
    },
    setComic: (comic) => {
      dispatch( setComicAction(comic) );
    },
    clearComicId: () => {
      dispatch( clearComicIdAction() )
    },
    clearComic: () => {
      dispatch( clearComicAction() )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComicPage)
