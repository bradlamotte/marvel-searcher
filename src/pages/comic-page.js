import React from 'react';
import ComicSearchBox from '../components/comic-search-box';
import Comic from '../components/comic';
import { PageHeader } from 'react-bootstrap';

export default class ComicPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {comic: null};
    this.onResultSelected = this.onResultSelected.bind(this);
  }

  onResultSelected(comic){
    this.setState({comic: comic});
  }

  render(){
    return(
      <div id="comic-page">
        <PageHeader>Comics</PageHeader>
        <ComicSearchBox onResultSelected={this.onResultSelected} />
        {this.state.comic && <Comic comic={this.state.comic} />}
      </div>
    );
  }
}
