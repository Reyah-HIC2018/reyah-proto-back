import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

const BrandLink = withRouter(function (props) {
    return <a href={"/"} onClick={(evt) => {evt.preventDefault(); props.history.push(props.to)}} className={`brand-logo ${props.className}`}>{props.children}</a>
});

export class Navbar extends Component {
    render() {
        return (
            <nav>
                <div className={`nav-wrapper ${this.props.className}`}>
                    <BrandLink to={this.props.href}>{this.props.brand}</BrandLink>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {this.props.children}
                    </ul>
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    brand: PropTypes.string.isRequired,
    className: PropTypes.string,
    href: PropTypes.string
};