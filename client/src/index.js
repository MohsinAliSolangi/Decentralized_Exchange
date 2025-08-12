import React from 'react';
import ReactDOM from "react-dom/client"; // ✅ React 18 ke liye
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ naya method
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
// serviceWorker.register();
