import React, {Component} from 'react';
import {Button, Preloader} from 'react-materialize';
import './Dashboard.css';
import './Question.css';
import Question from "./Question";

export default class CompleteDocument extends Component {
    constructor(props) {
        super(props);
        this.input = '';
        this.state = {
            stepN: 0,
            templates: {
                fields: []
            },
            fetched: false,
        };
    }

    _handleFetchResponse = (json) => {
        this.setState({
            templates: json,
            fetched: true,
        });
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

    clickNext = () => {
        let templates = this.state.templates;
        this.setState({templates});
        if (this.isLastStep()) {
            this.props.history.push('/')
        } else {
            this.setState({stepN: this.state.stepN + 1})
        }
    };

    inputKeyPress = (evt) => {
        if (evt.key === 'Enter') {
            let templates = this.state.templates;
            templates.fields[this.state.stepN].value = this.input;
            this.setState({templates});
            evt.currentTarget.value = '';
            this.clickNext();
        }
        this.input = evt.currentTarget.value;
    };

    isLastStep = () => {
        if (this.state.fetched)
            return this.state.stepN + 1 >= this.state.templates.fields.length;
    };

    getPrettyTitle = () => {
        return (
            <h1 className={"ModelTitle"}>
                Nous devons vérifier ensemble <strong>{this.state.templates.fields.length}</strong> {'information' + (this.state.templates.fields.length > 1 ? 's' : '')} sur <i className={"ModelNameTitle"}>{this.state.templates.name}</i>
            </h1>
        )
    };

    render() {
        let buttonName = this.isLastStep() ? 'Terminé' : 'Suivant';
        return (
            <div>
                {(() => {
                    if (this.state.fetched) {
                        let currentField = this.state.templates.fields[this.state.stepN];
                        return (
                            <div>
                                {this.getPrettyTitle()}
                                <Question onInputKeyPress={this.inputKeyPress} input={currentField.value || ''} name={currentField.name}/>
                                <Button onClick={this.clickNext} className={"waves-effect waves-block waves-light"}>{buttonName}</Button>
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
        )
    }
}
