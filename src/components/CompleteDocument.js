import React, {Component} from 'react';
import {Button, Preloader, Row, Col} from 'react-materialize';
import './Dashboard.css';
import './Question.css';

export default class CompleteDocument extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepN: 0,
            templates: {
                fields: []
            },
            fetched: false,
            input: '',
            isFinished: false,
            finalImgUrl: ''
        };
    }

    _handleFetchResponse = (json) => {
        if (json) {
            this.setState({
                templates: json,
                fetched: true,
                input: json.fields[0].value || '',
            });
        }
    };

    componentDidMount() {
        fetch('https://reyah-hic2018.scalingo.io/models/' + this.props.match.params.id, {
            method: 'GET'
        })
            .then(resp => {
                if (resp.status >= 400)
                    return console.error('Invalid response code');
                return resp.json();
            })
            .then(json => this._handleFetchResponse(json))
            .catch(err => console.error(err))
    }

    sendEndData = (data) => {
        this.setState({fetched: false});
        fetch('https://reyah-hic2018.scalingo.io/models/' + this.props.match.params.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: {fields: data}})
        })
            .then((resp) => {
                if (resp.status >= 400)
                    return console.log("Error bad response code");
                return resp.json();
            })
            .then(json => {
                this.setState({isFinished: true});
            })
            .catch(err => console.error(err))
    };

    clickNext = () => {
        let templates = this.state.templates;
        templates.fields[this.state.stepN].value = this.state.input;
        this.setState({templates});
        if (this.isLastStep()) {
            this.sendEndData(this.state.templates.fields);
        } else {
            this.setState({
                stepN: this.state.stepN + 1,
                input: this.state.templates.fields[this.state.stepN + 1].value || ''
            })
        }
    };

    inputKeyPress = (evt) => {
        if (evt.key === 'Enter') {
            this.clickNext();
        }
    };

    inputChange = (evt) => {
        this.setState({input: evt.currentTarget.value});
    };

    isLastStep = () => {
        if (this.state.fetched)
            return this.state.stepN + 1 >= this.state.templates.fields.length;
    };

    getPrettyTitle = () => {
        return (
            <h1 className={"ModelTitle"}>
                Nous devons vérifier
                ensemble <strong>{this.state.templates.fields.length}</strong> {'information' + (this.state.templates.fields.length > 1 ? 's' : '')} sur <i
                className={"ModelNameTitle"}>{this.state.templates.name}</i>
            </h1>
        )
    };

    render() {
        let buttonName = this.isLastStep() ? 'Terminé' : 'Suivant';
        return (
            (!this.state.isFinished) ?
                <div>
                    {(() => {
                        if (this.state.fetched) {
                            let currentField = this.state.templates.fields[this.state.stepN];
                            return (
                                <div>
                                    {this.getPrettyTitle()}
                                    <div className="questions">
                                        <h3 className={"QuestionTitle"}>
                                            Veuillez compléter le champs suivant
                                        </h3>
                                        <div className={"QuestionField"}>
                                            <Row>
                                                <Col s={3}>
                                                    <h4 className={"QuestionFieldName"}>
                                                        {currentField.name}
                                                    </h4>
                                                </Col>
                                                <Col s={9}>
                                                    <input
                                                        className={"QuestionFieldInput"}
                                                        onKeyPress={this.inputKeyPress}
                                                        onChange={this.inputChange}
                                                        value={this.state.input}/>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <Button onClick={this.clickNext}
                                            className={"waves-effect waves-block waves-light"}>{buttonName}</Button>
                                </div>
                            );
                        } else
                            return (
                                <div className={'ModelThumbSpinner'}>
                                    <Preloader/>
                                </div>
                            )
                    })()}
                </div>
                :
                <div className={"ImageRender"}>
                    <img src={"https://reyah-hic2018.scalingo.io/generate/" + this.props.match.params.id} alt={"Final document"}/>
                </div>

        )
    }
}
