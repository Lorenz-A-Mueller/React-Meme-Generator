import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import App from './App';

const GlobalStyle = createGlobalStyle`
* {
  font-family: Consolas, monaco, monospace;
}
  body {
    left: 0;
    top: 0;
    width : 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    background: linear-gradient(to right, white, red 95%);


  }
  `;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
