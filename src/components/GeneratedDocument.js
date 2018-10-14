import React, {Component} from 'react';
import {Button, Preloader, Row, Col, MediaBox} from 'react-materialize';
import './Dashboard.css';
import './Question.css';

export default class GeneratedDocument extends Component {
    render() {
        return (
            <div>
                <h1 className={"GeneratedTitle"}>Votre document à été généré !</h1>
                <div className={"GeneratedImage"}>
                    <MediaBox src="https://imgur.com/1r5XgQ5.jpg" width="300"/>
                </div>
                <Row>
                    <Col s={5}>
                        <Button className={"DownloadButton waves-effect waves-block waves-light"}>Télécharger</Button>
                    </Col>
                    <Col s={2}/>
                    <Col s={5}>
                        <Button className={"DeleteButton waves-effect waves-block waves-light red"}>Supprimer</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
