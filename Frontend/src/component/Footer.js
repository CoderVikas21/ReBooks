import React from 'react'
import paymentimg from "../assets/images/paymentlogo.png"

const Footer = () => {
  return (
    <>
        <div className='footer w-full h-fit border-2 border-white bg-black' > 
        <div class="footsec1">
        <div class="footbox" id="fb1">
            <h3>Services</h3>
            <a href="#">Buy Books</a>
            <a href="#">Sell Books</a>
            <a href="#">View Books</a>
            <a href="#">Books</a>
        </div>
        <div class="footbox" id="fb2">
            <h3>Genres</h3>
            <a href="#">Horror</a>
            <a href="#">Love</a>
            <a href="#">Thrill</a>
            <a href="#">Motivational</a>
        </div>
        <div class="footbox" id="fb3">
            <h3>Socials</h3>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">Youtube</a>
            <a href="#">Facebook</a>
        </div>
        <div class="footbox" id="fb5">
            <h3>Contact Us</h3>
            <div class="fb5">
                <i>📞</i>
                <p>&nbsp;: +123-456-7890</p>
            </div>
            <div class="fb5">
                <i>📧</i>
                <p>&nbsp;:support@rebooks.com</p>
            </div>
        </div>

        <div class="footbox flex justify-center w-72 h-30" id="fb3">
            <img src={paymentimg} alt="paymentimg" />
        </div>
        <div class="footbox" id='fb6' >
            <h3>Address</h3>
            <p>123 Maplewood Lane
            Apt 4B
            Springfield, IL 62701
            United States</p>      
        </div>
    </div>
        </div> 
    </>
  )
}

export default Footer
