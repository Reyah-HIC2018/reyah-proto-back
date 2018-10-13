import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './ModelThumb.css';

export default class Question extends Component {
  render() {
    return (
      <div className="questions">
        <h3>
          Veuillez compléter le champs suivant
        </h3>
        <h4>
          {this.props.name}
        </h4>
        <input onChange={this.props.onInputChange}/>
      </div>
    )
  }
}

Question.propTypes = {
  name: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};