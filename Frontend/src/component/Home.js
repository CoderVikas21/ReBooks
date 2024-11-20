import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'

import CTAButton from './CTAButton'
import Navbar from '../component/Navbar';

import MovingBooks from "./MovingBooks"
import BookCard from "./BookCard"

import { home_page_books ,home_page_para,home_page_title,home_page_tagline} from './HardCodeData'

import HomeBooks from './Home_page_books'
import Footer from './Footer'


const Home = ({loggedIn,setLoggin}) => {
    const img_src = "https://res.cloudinary.com/dttwn5t0v/image/upload/v1730906248/susan-q-yin-2JIvboGLeho-unsplash_mrhsz7.jpg";
    const navigate = useNavigate();

  return (
    <>
       <Navbar loggedIn={loggedIn} setLoggin={setLoggin}/>
      <div className="main">
        <img src={img_src} alt="Background" className=" backimg w-full h-screen object-cover " />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
       
            {/* SECTION 1 */}
            <div className='home_container'>
                <div className="home_title_box flex flex-col justify-center items-center">
                    <h1 className='text-9xl font-bold'>{home_page_title}</h1>
                    <h2 className='text-3xl font-bold'>{home_page_tagline}</h2>
                    <p>{home_page_para[0]}</p>
                    <p>{home_page_para[1]}</p>
                </div>
                <div className="home_buttons">
                    <CTAButton onClick={()=>{navigate('/buybooks')}} content = "Buy"/>
                    <CTAButton onClick={()=>{navigate('/sellbooks')}} content = "Sell"/>
                </div>
            </div>
        </div>

           {/* SECTION 2 */}

        
           <div className=" section2 h-fit w-full relative bg-cover bg-center p-10 section2" >
            {
              home_page_books.map((book) => (
                <HomeBooks key={book.id} book={book} />
              ))
            }
            </div>

            {/* SECTION 3 */}

            <div className='section3  w-full h-fit flex justify-evenly pt-10 pb-10'>
                  <BookCard homebook={true}/>
                  <BookCard homebook={true}/>
                  <BookCard homebook={true}/>
                  <BookCard homebook={true}/>
            </div>

          {/* SECTION 4 */}

          <div className='section4 h-58 w-full'>
              <h3>Explore book of various genre...</h3>
              <MovingBooks/>
          </div>

        <Footer/>
     </div> 
    </>
  )
}

export default Home
