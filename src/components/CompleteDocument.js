import React, {Component} from 'react';

export default class CompleteDocument extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>{this.props.match.params.id}</div>
        )
    }
}