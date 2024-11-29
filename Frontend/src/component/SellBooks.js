import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';


const SellBooks = () => {
    const bg_img = "https://res.cloudinary.com/dttwn5t0v/image/upload/v1730906241/glen-noble-o4-YyGi5JBc-unsplash_dl3kof.jpg"

    const [bookData, setBookData] = useState({
        name: "",
        author: "",
        price: "",
        description: "",
        genre:"",
        img: null
    });

    function changeHandler(e) {
        const { name, value, files } = e.target;

        // If the input type is file, set the file
        if (name === 'img') {
            setBookData({
                ...bookData,
                img: files[0] // Store the file object
            });
        } else {
            setBookData({
                ...bookData,
                [name]: value,
            });
        }
    }
    async function submitHandler(event){
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('name', bookData.name);
        formData.append('author', bookData.author);
        formData.append('price', bookData.price);
        formData.append('description', bookData.description);
        formData.append('genre', bookData.genre);
        formData.append('imgfile', bookData.img);  // File field named 'imgfile' in backend
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/sellbook`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // This tells axios to send a multipart form
                },
            });
            toast.success(res.data.message);
        }
        catch (e) {
            console.log("Error occurred while selling book:", e.message);
    
            if (e.response) {
                toast.error(e.response.data.message);
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    }
    
  return (
    <>
      <div className="main">
                <img src={bg_img} alt="Background" className="backimg w-full h-screen object-cover" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                <form className="form">
                            <p className="title">Welcome to ReBooks</p>
                            <p className="message">Add your book details here.</p>

                            <div className="flex">
                                <label>
                                        <input 
                                            name='name' 
                                            value={bookData.name} 
                                            onChange={changeHandler} 
                                            required 
                                            type="text" 
                                            className="input" 
                                        />
                                        <span>Book Title</span>
                                </label>

                                <label>
                                        <input 
                                            name='author' 
                                            value={bookData.author} 
                                            onChange={changeHandler} 
                                            required 
                                            type="text" 
                                            className="input" 
                                        />
                                        <span>Author</span>
                                </label>
                            </div>


                                <div className="flex">
                                        <label>
                                        <input 
                                            name='price' 
                                            value={bookData.price} 
                                            onChange={changeHandler} 
                                            required 
                                            type="number" 
                                            className="input" 
                                        />
                                        <span>Price(₹)</span>
                                    </label>

                                    <label>
                                        <input 
                                            name='genre' 
                                            onChange={changeHandler} 
                                            required 
                                            type="text" 
                                            className="input" 
                                        />
                                        <span>Genre</span>
                                    </label>
                                </div>
                                <label>
                                        <input 
                                            name='img' 
                                            onChange={changeHandler} 
                                            required 
                                            type="file" 
                                            className="imginput input bg-white" 
                                        />
                                        <span>Add book cover page</span>
                                    </label>

                            <label>
                                <textarea 
                                    name='description' 
                                    value={bookData.description} 
                                    onChange={changeHandler} 
                                    required 
                                    type="text" 
                                    className="input" 
                                />
                                <span>Description of book</span>
                            </label>

                            

                            <button onClick={submitHandler} className="submit">Submit</button>
                            <p className="signin">Already have an account? <a onClick={()=>{navigate('/login')}}>LogIn</a></p>
                </form>
                </div>
            </div>
    </>
  )
}

export default SellBooks
