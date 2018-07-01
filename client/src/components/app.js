import React from 'react';
import {Route} from 'react-router-dom';
import Header from './header-bar';
import Home from './home';
import Browse from './browse';
import Wizard from './wizard';
import Search from './search';
import About from './about';




const App = () => (
        <div>
            <Header/>

            <Route exact path="/" component={Home}/>
            <Route path="/browse" component={Browse}/>
            <Route path="/wizard" component={Wizard}/>
            <Route path="/search" component={Search}/>
            <Route path="/about" component={About}/>

        </div>
        
);

export default App;