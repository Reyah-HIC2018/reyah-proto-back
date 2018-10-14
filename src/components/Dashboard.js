import React, {Component} from 'react';
import ModelThumb from './ModelThumb';
import {Preloader} from 'react-materialize';
import './Dashboard.css';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templates: [],
            fetched: false,
        };
    }

    _handleFetchResponse = (json) => {
        this.setState({templates: json.data, fetched: true});
    };

    componentDidMount() {
        fetch('https://reyah-hic2018.scalingo.io/models', {
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

    render() {
        return (
            <div>
                <div className={'PageTitleWrapper'}>
                    <h2 className={'PageTitle'}>Modèles</h2>
                    <div className={'PageUnderliner'}/>
                </div>
                {(() => {
                    if (this.state.fetched)
                        return (
                            <div className={'ModelThumbList'}>
                                {
                                    this.state.templates.map((elem, idx) => (
                                        <ModelThumb key={idx} elemId={elem.id} name={elem.name} thumb={`https://reyah-hic2018.scalingo.io/${elem.thumb}`}
                                                    description={elem.description}/>
                                    ))
                                }
                            </div>
                        );
                    else
                        return (
                            <div className={'ModelThumbSpinner'}>
                                <Preloader/>
                            </div>
                        );
                })()}
            </div>
        );
    }
}