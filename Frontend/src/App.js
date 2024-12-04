import { useState,useEffect } from 'react';
import {Routes,Route} from 'react-router-dom'
import Home from './component/Home'
import SignUp from './component/Signup';
import Login from './component/Login';
import BuyBooks from './component/BuyBooks';
import Navbar from './component/Navbar';
import SellBooks from './component/SellBooks';
import Cart from './component/Cart'
import { useUser } from './component/context';


function App() {
  const {loggedIn , setLoggin} = useUser();
  useEffect(() => {
    const loginStatus = localStorage.getItem('loggedIn');
    if (loginStatus === 'true') {
      setLoggin(true);
    }
}, []);
  return (
    <>  
        <Routes>
          <Route path = '/' element = {<Home/>}></Route>
          <Route path = '/signup' element = {<SignUp/>}></Route>
          <Route path = '/login' element = {<Login/>}></Route>
          <Route path = '/buybooks' element = {<BuyBooks/>}></Route>
          <Route path = '/sellbooks' element = {
            loggedIn ? (<SellBooks/>) : (<SignUp/>)
          }></Route>
          <Route path = '/my-cart' element={<Cart/>}></Route>
        </Routes>
    </>
  );
}

export default App;
