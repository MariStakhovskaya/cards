import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import { HashRouter } from 'react-router-dom';
import {store} from "../redux/store";
import {Header} from "../components/header/Header";
import Routes from "../components/routes/Routes";

function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <HashRouter>
                <Header/>
                <Routes />
            </HashRouter>
        </Provider>
    </div>
  );
}

export default App;
