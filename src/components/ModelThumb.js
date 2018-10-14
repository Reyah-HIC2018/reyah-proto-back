import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import './ModelThumb.css';
import {Link} from "react-router-dom";

const WaveImage = withRouter((props) => {
    console.log(props.thumb);
    return <div onClick={() => props.history.push(`/model/${props.elemId}`)} className="card-image waves-effect waves-block waves-light ModelThumb-bg-Img" style={{backgroundImage: `url("${props.thumb}")`}}>
    </div>

}
);

export default class ModelThumb extends Component {
    render() {
        return (
            <div className="card ModelThumb">
                <WaveImage elemId={this.props.elemId} thumb={this.props.thumb}/>
                <div className="card-content">
                    <span
                        className="card-title activator grey-text text-darken-4 ModelThumbTitle">{this.props.name}<i
                        className="material-icons right">more_vert</i></span>
                    <p>
                        <Link to={`/model/${this.props.elemId}`}>Utiliser ce model</Link>
                    </p>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4 ModelThumbTitle">{this.props.name}<i
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
    elemId: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired
};
