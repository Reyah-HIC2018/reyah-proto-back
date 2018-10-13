import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {NavItem} from 'react-materialize';
import {Navbar as NB} from '../materialize/Navbar';

const LinkItem = withRouter(function (props) {
    return <NavItem onClick={() => props.history.push(props.to)}>{props.children}</NavItem>
});

export default class Navbar extends Component {
    render() {
        return (
            <NB brand={"Reyah"} href={"/"} right fixed className={"green"}>
                <LinkItem to={"/account"}>Account</LinkItem>
            </NB>
        )
    }
}