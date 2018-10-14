import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Account from "./components/Account";
import NotFound from "./components/NotFound";
import CompleteDocument from "./components/CompleteDocument";
import GeneratedDocument from "./components/GeneratedDocument";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar/>
                    <div className={"container"}>
                        <Switch>
                            <Route exact path={"/"} component={Dashboard}/>
                            <Route path={"/model/:id"} component={CompleteDocument}/>
                            <Route path={"/generated"} component={GeneratedDocument}/>
                            <Route exact path={"/account"} component={Account}/>
                            <Route path={"/"} component={NotFound} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
