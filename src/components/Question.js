import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './ModelThumb.css';

export default class Question extends Component {
    constructor(props) {
        super(props);

        // console.log(this.props.input);
        this.state = {
            fieldInput: this.props.input
        };
        console.log("STATE", this.state);
    }

    onFieldChange = (evt) => {
        this.setState({fieldInput: evt.currentTarget.value});
    };
    render() {
        console.log('I RERENDER', this.props, this.props.input);
        return (<div></div>)
    }
}

Question.propTypes = {
    name: PropTypes.string.isRequired,
    input: PropTypes.string.isRequired,
    onInputKeyPress: PropTypes.func.isRequired,
};