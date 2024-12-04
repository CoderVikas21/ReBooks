import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUser } from './context';

const Login = () => {
    const {loggedIn , setLoggin} = useUser();
    const bg_img = "https://res.cloudinary.com/dttwn5t0v/image/upload/v1730906241/glen-noble-o4-YyGi5JBc-unsplash_dl3kof.jpg"
    const [passwordVisible, setPasswordVisible] = useState(false);

    const {setUser} = useUser();

    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    function changeHandler(e) {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    }

    async function submitHandler(e) {
        e.preventDefault();
        try{
            //backend api
            //the withCredential is true for sending and recieving cookies in future
            console.log(process.env.REACT_APP_BACKEND_URL)
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/login`,
                userData,
                { withCredentials: true }
            );
            
            toast.success(response.data.message);
            localStorage.setItem('loggedIn', 'true');
            setUser(response.data.user);
            setLoggin(true)
            navigate('/buybooks')
        }
        catch(e){
            console.log("Error Occurred at Loging In");
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

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
          setPasswordVisible(!passwordVisible);
        } else if (field === 'confirmpassword') {
          setConfirmPasswordVisible(!confirmPasswordVisible);
        }
      };
  return (
    <>
        <div className="main">
                <img src={bg_img} alt="Background" className="backimg w-full h-screen object-cover" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                <form className="form">
                    <p class="title">Welcome Back! </p>
                    <p class="message">LogIn now and to access coollection of books. </p>  
                            
                    <label>
                        <input name = "email" value={userData.email} required placeholder="" type="email" class="input"
                        onChange={changeHandler}/>
                        <span>Email</span>
                    </label> 
                        
                    <label>
                        <div className="">
                            <input
                            name="password"
                            value={userData.password}
                            onChange={changeHandler}
                            required
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder=""
                            className="input"
                            />
                            <span>Password</span>
                                <span
                                className="eye-icon absolute top-3 right-3 cursor-pointer text-xl"
                                onClick={() => togglePasswordVisibility('password')}
                                >
                                {passwordVisible ? '🙈' : '👁️'}
                                </span>
                        </div>
                    </label>
                    <button class="submit" onClick = {submitHandler} >LogIn</button>
                    <p class="signin">Don't have an acount ? <a onClick = {()=>{navigate('/signup')}}>SignIn</a> </p>
                </form>
                </div>
            </div>
    </>
  )
}

export default Login
