import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './component/context';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <UserProvider>
      <BrowserRouter>
          <App />
          <ToastContainer 
          position="bottom-right"/>
      </BrowserRouter> 
    </UserProvider>
  </>
);

