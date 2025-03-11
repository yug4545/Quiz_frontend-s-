import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import Quiz from './Quiz/Quiz'
import Admin_panel from './Project_1/PRoject_1_Page/index'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Quiz />
    {/* <Admin_panel/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
