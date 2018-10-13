import React, {Component} from 'react';

export default class NotFound extends Component {
    render() {
        return (
            <div className="row">
                <div className="col s12 m6 offset-m3">
                    <div className="card-panel green lighten-2">
                        <span className="white-text">
                            <h1>404</h1>
                            <span>Not found</span>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}