// Modules
import React from 'react';
import {render} from 'react-dom';
import { Route, Link, HashRouter, BrowserRouter as Router } from 'react-router-dom'
import App from './containers/App.jsx'
import Signup from './containers/Signup.jsx'

// Checking for outdated browsers
(() => {
    const isIE = navigator.userAgent.match(/MSIE (\d+)\./);
    if (isIE) {
        const version = +isIE[1];
        if (version < 10) {
            alert('Unfortunately your browser, Internet Explorer ' + version + ', is not supported.\nPlease visit the site with a modern browser like Firefox or Chrome.\nThanks!');
        }
    }

    if (/Android 2\.3/.test(navigator.userAgent)) {
        alert('Unfortunately your browser, Android 2.3, is not supported.\nPlease visit the site with a modern browser like Firefox or Chrome.\nThanks!');
    }
})()

const routing = (
  <HashRouter path={process.env.PUBLIC_URL + '/'} >
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/signup" component={Signup} />
    </div>
  </HashRouter>
)

render(routing ,document.getElementById('root'));
