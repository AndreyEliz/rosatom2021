import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = (props:any) => {
    const {component, ...rest} = props;
    const isAuthenticated = useSelector((state:any) => state.authentication.authorized)

    return isAuthenticated ? 
        <Route {...rest} component={component} />
        :
        <Redirect to='/login' />
};

export default PrivateRoute;
