import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Converter from "./Converter";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Converter/>
    </React.StrictMode>
);