import React, {Component} from 'react';
import ModelThumb from './ModelThumb';
import {Preloader} from 'react-materialize';
import './Dashboard.css';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templates: []
        };
        // this.templates = [
        //     {
        //         id: 1,
        //         name: 'Taxe d'habitation',
        //         description: 'La taxe d'habition est un document annuel à remplir pour les impôts'
        //     },
        //     {
        //         id: 2,
        //         name: 'Inscription à la crèche',
        //         description: 'Ce document vous permet d'inscrire votre enfant à la crèche'
        //     },
        //     {
        //         id: 3,
        //         name: 'Inscription parapente',
        //         description: 'Ce document vous permet de vous inscrire au club de parapente de Lathuile'
        //     },
        //     {
        //         id: 4,
        //         name: 'Bourse',
        //         description: 'Ce document vous permet d'obtenir une bourse'
        //     },
        //     {
        //         id: 5,
        //         name: 'Feuille de RSA',
        //         description: 'Ce document permet de remplir votre fiche de RSA'
        //     },
        //     {
        //         id: 6,
        //         name: 'Demande de Visa USA',
        //         description: 'Ce document permet d'optenir un Visa americain'
        //     }
        // ];
    }

    _handleFetchResponse = (json) => {
        this.setState({templates: json.data});
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
                    if (this.state.templates.length)
                        return (
                            <div className={'ModelThumbList'}>
                                {
                                    this.state.templates.map((elem, idx) => (
                                        <ModelThumb key={idx} elemId={elem.id} name={elem.name}
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