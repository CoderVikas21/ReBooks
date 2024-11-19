import { useState,useEffect } from 'react';
import {Routes,Route} from 'react-router-dom'
import Home from './component/Home'
import SignUp from './component/Signup';
import Login from './component/Login';
import BuyBooks from './component/BuyBooks';
import Navbar from './component/Navbar';
import SellBooks from './component/SellBooks';
import Cart from './component/Cart'


function App() {
  const [loggedIn,setLoggin] = useState(false);
  useEffect(() => {
    const loginStatus = localStorage.getItem('loggedIn');
    if (loginStatus === 'true') {
      setLoggin(true);
    }
}, []);
  return (
    <>  
        <Routes>
          <Route path = '/' element = {<Home loggedIn={loggedIn} setLoggin={setLoggin}/>}></Route>
          <Route path = '/signup' element = {<SignUp loggedIn={loggedIn} setLoggin={setLoggin}/>}></Route>
          <Route path = '/login' element = {<Login loggedIn={loggedIn} setLoggin={setLoggin}/>}></Route>
          <Route path = '/buybooks' element = {<BuyBooks loggedIn={loggedIn} setLoggin={setLoggin}/>}></Route>
          <Route path = '/sellbooks' element = {
            loggedIn ? (<SellBooks/>) : (<SignUp loggedIn={loggedIn} setLoggin={setLoggin}/>)
          }></Route>
          <Route path = '/my-cart' element={<Cart/>}></Route>
        </Routes>
    </>
  );
}

export default App;
