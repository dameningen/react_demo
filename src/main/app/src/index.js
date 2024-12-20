import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { Provider } from 'react-redux';

import App from './components/App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import Themes from "./themes";

import store from './store/configureStore';


ReactDOM.render(
    <Provider store={store}>
        <LayoutProvider>
            <UserProvider>
                <ThemeProvider theme={Themes.default}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </UserProvider>
        </LayoutProvider>
    </Provider>,
    document.getElementById("root"),
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
