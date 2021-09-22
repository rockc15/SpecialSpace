import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/home';

export default class Routes extends React.Component {
    render() {
        return (
            <Router>
                <div className='background'>
                    <Switch>
                        <Route exact path="/" component={Home} />
                    </Switch>
                </div>
            </Router>
        );
    }

}