import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';


const SellBooks = () => {
    const bg_img = "https://res.cloudinary.com/dttwn5t0v/image/upload/v1730906241/glen-noble-o4-YyGi5JBc-unsplash_dl3kof.jpg";

    const navigate = useNavigate();
    const [uploading,setUploading] = useState(false);
    const [bookData, setBookData] = useState({
        name: "",
        author: "",
        price: "",
        description: "",
        genre: "",
        img: null,
    });

    const changeHandler = (e) => {
        const { name, value, files } = e.target;

        // Handle file input
        if (name === "img") {
            setBookData((prev) => ({
                ...prev,
                img: files[0], // Store the file object
            }));
        } else {
            setBookData((prev) => ({
                ...prev,
                [name]: value, // Store text inputs
            }));
        }
    };

    const submitHandler = async (event) => {
        setUploading(true);
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", bookData.name);
        formData.append("author", bookData.author);
        formData.append("price", bookData.price);
        formData.append("description", bookData.description);
        formData.append("genre", bookData.genre);
        formData.append("imgfile", bookData.img); // Use 'imgfile' to match backend

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/sellbook`, formData, 
                {withCredentials:true},
                {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                
            });
            toast.success(res.data.message);
            navigate(-1);
        } catch (e) {
            console.error("Error occurred while selling book:", e.message);
            if (e.response) {
                toast.error(e.response.data.message);
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
        finally{
            setUploading(false);
        }
    };

    return (
        <div className="main">
            <img src={bg_img} alt="Background" className="backimg w-full h-screen object-cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <form className="form" encType='"multipart/form-data"'>
                    <p className="title">Welcome to ReBooks</p>
                    <p className="message">Add your book details here.</p>

                    <div className="flex">
                        <label>
                            <input name="name" value={bookData.name} onChange={changeHandler} required type="text" className="input" />
                            <span>Book Title</span>
                        </label>

                        <label>
                            <input name="author" value={bookData.author} onChange={changeHandler} required type="text" className="input" />
                            <span>Author</span>
                        </label>
                    </div>

                    <div className="flex">
                        <label>
                            <input name="price" value={bookData.price} onChange={changeHandler} required type="number" className="input" />
                            <span>Price(₹)</span>
                        </label>

                        <label>
                            <input name="genre" value={bookData.genre} onChange={changeHandler} required type="text" className="input" />
                            <span>Genre</span>
                        </label>
                    </div>

                    <label>
                        <input name="img" onChange={changeHandler} required type="file" className="imginput input bg-white" />
                        <span>Add book cover page</span>
                    </label>

                    <label>
                        <textarea name="description" value={bookData.description} onChange={changeHandler} required className="input" />
                        <span>Description of book</span>
                    </label>

                    <button onClick={submitHandler} className="submit">
                        {uploading ? "Publishing" : "Publish"}  
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SellBooks;
