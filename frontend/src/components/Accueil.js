import React, { Component } from 'react';
import Soiree from "./Soiree";
import JeuSoiree from "./JeuSoiree";
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom"; 

export default class Accueil extends Component  {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Router>
            <Switch>
                <Route exact path='/' component={Soiree} />
                <Route path='/Soiree/:roomCode' component={JeuSoiree} />
            </Switch>
        </Router>
    );
  }
}