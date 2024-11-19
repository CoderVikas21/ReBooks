import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Cart = () => {
  const [cartItem , setCartItem] = useState([]);

  async function fetchCartData(){
    const userCart = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/myCart`,
      {withCredentials:true}
    )
    console.log(userCart.data.cart)
    setCartItem(userCart.data.cart);
  }
  useEffect(()=>{
    fetchCartData();
  },[])
  return (
    <>
      hello cart
    </>
  )
}

export default Cart
