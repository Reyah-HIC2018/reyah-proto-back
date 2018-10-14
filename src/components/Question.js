import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-materialize';
import './ModelThumb.css';

export default class Question extends Component {
    render() {
        return (
            <div className="questions">
                <h3 className={"QuestionTitle"}>
                    Veuillez compléter le champs suivant
                </h3>
                <div className={"QuestionField"}>
                    <Row>
                        <Col s={3}>
                            <h4 className={"QuestionFieldName"}>
                                {this.props.name}
                            </h4>
                        </Col>
                        <Col s={9}>
                            <input className={"QuestionFieldInput"} onKeyPress={this.props.onInputKeyPress} defaultValue={this.props.input}/>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

Question.propTypes = {
    name: PropTypes.string.isRequired,
    input: PropTypes.string.isRequired,
    onInputKeyPress: PropTypes.func.isRequired,
};