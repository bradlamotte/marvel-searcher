import React from 'react';
import PropTypes from 'prop-types';
import MarvelImage from './marvel-image';
import { Grid, Row, Col } from 'react-bootstrap';
import '../style/character.css';
import { connect } from 'react-redux'
import FavoriteControl from './favorite-control';

class Character extends React.Component{
  render(){
    if(this.props.character){
      return(
        <div className="character-area">

          <div className="favorite-control-wrapper">
            <FavoriteControl isFavorite={this.props.character.favorite} characterId={this.props.character.id} name={this.props.character.name} />
          </div>
          
          <Grid>
            <Row>
              <Col sm={8} smPush={4}>
                <div className="description-area">
                  <h3>{this.props.character.name}</h3>
                  {this.props.character.description}
                </div>
              </Col>
              <Col sm={4} smPull={8}>
                <MarvelImage imageData={this.props.character.imageData} />
              </Col>
            </Row>
          </Grid>
        </div>
      );
    } else {
      return null;
    }
  }
}

Character.propTypes = {
  character: PropTypes.object
};

function mapStateToProps(state){
  return { character: state.character }
}

export default connect(mapStateToProps)(Character)
