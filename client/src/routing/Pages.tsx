import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomePage from 'pages/HomePage/HomePage';
import PrivateRoute from '../components/routing/PrivateRoute';

const Pages: React.FC = () => {
    return (
        <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
        </Switch>
    );
};

export default Pages
