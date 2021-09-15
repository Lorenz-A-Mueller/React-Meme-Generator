import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle, styled } from 'styled-components';
import App from './App';

const GlobalStyle = createGlobalStyle`
  body {
    position: absolute;
    left: 0;
    top: 0;
    width : 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif}
  `;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
