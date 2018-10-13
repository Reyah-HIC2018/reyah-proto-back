import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './ModelThumb.css';
import {Link} from "react-router-dom";

export default class ModelThumb extends Component {
    render() {
        return (
            <div className="card ModelThumb">
                <div className="card-image waves-effect waves-block waves-light ModelThumb-bg-Img" style={{backgroundImage: 'url("https://cdn.radiofrance.fr/s3/cruiser-production/2015/05/4552e433-f303-11e4-bc14-005056a87fa3/870x489_documents-administratifs.jpg")'}}>
                </div>
                <div className="card-content">
                    <span
                        className="card-title activator grey-text text-darken-4">{this.props.name}<i
                        className="material-icons right">more_vert</i></span>
                    <p>
                        <Link to={`/model/${this.props.elemId}`}>Utiliser ce model</Link>
                    </p>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{this.props.name}<i
                        className="material-icons right">close</i></span>
                    <p>{this.props.description}</p>
                </div>
            </div>
        )
    }
}

ModelThumb.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    elemId: PropTypes.number.isRequired
};