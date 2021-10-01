import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/home';
import login from './pages/login'
import createNewAccount from "./pages/createNewAccount";

export default class Routes extends React.Component {
    render() {
        return (
            <Router>
                <div className='background'>
                    <Switch>
                        <Route exact path="/" component={login} />
                        <Route exact path="/createNewAccount" component={createNewAccount} />
                        <Route exact path="/home" component={Home} />
                    </Switch>
                </div>
            </Router>
        );
    }

}