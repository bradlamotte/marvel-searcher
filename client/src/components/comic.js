import React from 'react';
import PropTypes from 'prop-types';
import MarvelImage from './marvel-image';
import { Grid, Row, Col } from 'react-bootstrap';
import '../style/character.css';
import FavoriteControl from './favorite-control';
import { connect } from 'react-redux'

class Comic extends React.Component{
  render(){
    if(this.props.comic){
      return(
        <div className="comic-area">

          <div className="favorite-control-wrapper">
            <FavoriteControl isFavorite={this.props.comic.favorite} comicId={this.props.comic.id} name={this.props.comic.title} />
          </div>

          <Grid>
            <Row>
              <Col sm={8} smPush={4}>
                <div className="description-area">
                  <h3>{this.props.comic.title}</h3>
                  {this.props.comic.description}
                </div>
              </Col>
              <Col sm={4} smPull={8}>
                <MarvelImage imageData={this.props.comic.imageData} />
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
    return null;
  }
}

Comic.propTypes = {
  comic: PropTypes.object
};

function mapStateToProps(state){
  return { comic: state.comic }
}

export default connect(mapStateToProps)(Comic)
