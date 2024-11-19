import React, { useEffect, useState } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import BookCard from '../component/BookCard'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Spinner from './Spinner'

const BuyBooks = ({loggedIn,setLoggin}) => {
    const img_src = "https://res.cloudinary.com/dttwn5t0v/image/upload/v1731428868/patrick-tomasso-Oaqk7qqNh_c-unsplash_pz4dj9.jpg";

    const navigate = useNavigate();
    const [loading , setLoading] = useState(false)
    const [cards,setCards] = useState([]);
    const [count,setCount] = useState(0);
    const [genre,setGenre] = useState([]);

    async function fetchData(){
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/fetchall`);
      const bookData = response.data.data;

      const genreList = [];
      for(let i=0;i<bookData.length;i++){
        //store only unique genre
        if (!genreList.includes(bookData[i].genre)) {
            genreList.push(bookData[i].genre);
        }
      }
      setGenre(genreList);
      setCards(bookData);
      setLoading(false);
    }
    useEffect(()=>{
      fetchData();
    },[])

    async function fetchByGenre(genre){
      setLoading(true);
      //passing genre as a req.query can also pass in body
      const newBooks = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/fetchbygenre?genre=${genre}`);
      setCards(newBooks.data.data);
      setLoading(false);
    }

  return (
    <>  
    <Navbar loggedIn={loggedIn} setLoggin={setLoggin}/>
      <div className="left_sidebar fixed left-0 h-full min-w-32">
        <div className="sidebar_items mt-40 z-0">
          <h3 className='cursor-pointer' onClick={()=>{navigate('/')}}>Home</h3>
          <div className="menu">
            <div className="item">
              <a href="" className="link">
                <span onClick={fetchData}> ALL </span>
                <svg viewBox="0 0 360 360">
                  <g id="SVGRepo_iconCarrier">
                    <path
                      id="XMLID_225_"
                      d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                    ></path>
                  </g>
                </svg>
              </a>
              <div className="submenu">
                {genre.map((genre) => (
                  <div className="submenu-item" key={genre}>
                    <a className="submenu-link" onClick={()=>{fetchByGenre(genre)}}>{genre}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart section with higher z-index */}
          <div className='go-to-cart flex justify-center items-center text-3xl relative z-20'
          onClick={()=>{navigate('/my-cart')}}>
          <FaCartShopping className="cart-icon z-0" />
          <p className='cart-count text-1xl text-white'>{count}</p>
        </div>

        </div>
      </div>
      <div className="topbar">
        
      <div className="search">
        <input placeholder="Search..." type="text"/>
        <button type="submit">Go</button>
      </div>

      </div>
      <div className="show_books ">
      <img src={img_src} alt="Background" className="w-full h-full object-cover " />
      {
        loading? 
        (<Spinner/>)
        :
        (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
                
          <div className="card_container">
  
          { cards.length > 0?
            (
              cards.map((card)=>(
                <BookCard card={card} homebook={false} setCount={setCount}/>
              ))
            )
            :
            (<h1 className='text-7xl font-bold flex justify-center items-center'>
              No Book Available</h1>)
            
          }
          </div>
             
        </div>
        )
      }
              
      </div>
    </>
  );
}

export default BuyBooks;
