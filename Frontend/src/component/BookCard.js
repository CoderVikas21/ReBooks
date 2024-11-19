import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const BookCard = ({card,homebook,setCount}) => {
    //for change add to cart button
    const [added,setAdded] = useState(false);
    async function cartHandler(){
        if(homebook){
            toast.info("Please register first ");
            return;
        }
        try{
            const res = await axios.post('http://localhost:5000/api/v1/addtocart',
            {bookId : card._id,
            added},
            {withCredentials:true}
            )
            toast.success(res.data.message);
            setCount(res.data.cartSize);
            setAdded(!added);
        }   
        catch(e){
            console.log("Cart not updated");
            console.log("Message", e.message);

        // Check if the error is from the response (backend-side error)
            if (e.response) {
                // If the backend provides an error message
                toast.error(e.response.data.message);
            }
            else {
                // If it's not a backend error (network issues, etc.)
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
        
    }
    let img = homebook? "" : card.imgUrl;
    let book_name = homebook? "Hello-World" : card.name;
    let author_name = homebook? "ABC" : card.author;
    let seller_name = homebook? "XYZ" : card.seller;
    let price = homebook? "299": Math.floor(card.price); 
    let desc  = homebook? "Some more details about the product, brand, or any other content you'd like to show on the back side." : card.description;
  return (
    <>
        
    <div class="card">
        <div class="card-inner">
            <div class="card-front">
            
            <div class="image_container">
                <img src={img} alt="coverImg" />
            </div>
            <div class="card_title">
                <span>Book Name: {book_name}</span>
                <span>Author Name: {author_name}</span>
                <span>Seller Name: {seller_name}</span>
            </div>

            </div>
            <div class="card-back">
            <div class="additional-content">
                <span className='font-bold'>Description : </span>
                <p>{desc}</p>
            </div>
            </div>
        </div>

        <div class="action">
            <div class="price w-1/4">
            <span>₹{price}</span>
            </div>

            <button class="cart-button w-3/4" onClick={cartHandler}>
            <svg class="cart-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                stroke-linejoin="round"
                stroke-linecap="round"
                ></path>
            </svg>
            <span>
                {
                    added?(
                        'Remove from cart'
                    )
                    :
                    (
                        'Add to cart'
                    )
                }
            </span>
            </button>
        </div>
    </div>

    </>
  )
}

export default BookCard
