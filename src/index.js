import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Home from './pages/Home';
import Eventos from './pages/Eventos';
import Itens from './pages/Itens';

const router = (
    <Router history={ browserHistory }>
        <Route path="/" component={ App }>
            <IndexRoute component={ Home } />
            <Route path="/eventos" component={ Eventos } />
            <Route path="/itens" component={ Itens } />
        </Route>
    </Router>
)

ReactDOM.render(
    router,
    document.getElementById('root')
);

registerServiceWorker();