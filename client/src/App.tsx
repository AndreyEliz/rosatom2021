import React from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {ThemeProvider} from '@material-ui/styles';
import MainLayout from 'MainLayout';
import { useCustomTheme } from './styles/theme';
import LoginPage from 'pages/LoginPage/LoginPage';
import PrivateRoute from 'components/routing/PrivateRoute';

const App: React.FC = () => {
    const theme = useCustomTheme();

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <PrivateRoute path="/" component={MainLayout} />
                </Switch>
                <ToastContainer autoClose={5000}
                            hideProgressBar />
            </Router>
        </ThemeProvider>
    );
}

export default App;
