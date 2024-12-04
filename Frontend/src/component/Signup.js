import React, { useState } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import axios from 'axios'
import {useUser} from './context'
import {toast} from 'react-toastify'


const Signup =  () => {
    const {loggedIn , setLoggin} = useUser();
    const bg_img = "https://res.cloudinary.com/dttwn5t0v/image/upload/v1730906241/glen-noble-o4-YyGi5JBc-unsplash_dl3kof.jpg"

    const {setUser} = useUser();

    const [sentOTP , setSentOTP] = useState(false);
    const [OTPBtn , setOTPBtn] = useState("Send OTP");
    const [OTPVerify , setOTPVerify] = useState(false);
    const [verifyEmail , setVerifyEmail] = useState("");  //this is the email used for verification and it should be same as register email
    const [processing,setProcessing] = useState(false);

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmpassword: "",
        otp:""
    });

    function changeHandler(e) {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    }
    async function OTPHandler(e){
        e.preventDefault();
        if(sentOTP === false){
            //OTP is not send yet
            try{
                setProcessing(true);
                const mailSend = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/sendMail`,
                {email:userData.email},
                {withCredentials:true}
                )
                setVerifyEmail(userData.email)
                toast.info(mailSend.data.message)
                setSentOTP(true)
                setOTPBtn("Verify OTP");
                setProcessing(false);
            }
            catch(e){
                console.log(e.message)
                if(e.response){
                    toast.info(e.response.data.message)
                }
                else{
                    toast.error("Something went wrong")
                }
            }
            return;
        }
        else{
            //otp is sent now verify it
            try{
                const verify = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/authOTP`,
                {otp : userData.otp},
                {withCredentials:true}
                )
                
                toast.success(verify.data.message)
                setOTPBtn("Verified!");
                setOTPVerify(true);
                
            }
            catch(e){
                console.log(e.message);
                console.log("Error at authenticate OTP")
                if (e.response) {
                    toast.error(e.response.data.message || "Invalid OTP");
                } else {
                    toast.error("Network error. Please try again.");
                }
            }
        }
    }

    async function submitHandler(event) {
        event.preventDefault();
        if(OTPVerify === false){
            toast.error("Verify email please");
            return;
        }
        if(verifyEmail !== userData.email){
            toast.error("Verification email and Registering email are different");
            return;
        }
        try{
            //backend api
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/signup`, 
            userData,
            {withCredentials:true}
        );
            toast.success(response.data.message);
            localStorage.setItem('loggedIn', 'true');
            setUser(userData.firstname);
            setLoggin(true)
            navigate('/buybooks')
        }
        catch(e){
            console.log("Error Occurred at Signing In");
            console.log("Message", e.message);

        // Check if the error is from the response (backend-side error)
            if (e.response) {
                // If the backend provides an error message
                toast.error(e.response.data.message);
            } else {
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
                            <p className="title">Welcome to ReBooks</p>
                            <p className="message">Signup now and get full access to our app.</p>
                            <div className="flex">
                                <label>
                                    <input 
                                        name='firstname' 
                                        value={userData.firstname} 
                                        onChange={changeHandler} 
                                        required 
                                        type="text" 
                                        className="input" 
                                    />
                                    <span>Firstname</span>
                                </label>

                                <label>
                                    <input 
                                        name='lastname' 
                                        value={userData.lastname} 
                                        onChange={changeHandler} 
                                        required 
                                        type="text" 
                                        className="input" 
                                    />
                                    <span>Lastname</span>
                                </label>
                            </div>

                            <label>
                                <input 
                                    name='email' 
                                    value={userData.email} 
                                    onChange={changeHandler} 
                                    required 
                                    type="email" 
                                    className="input" 
                                />
                                <span>Email</span>
                            </label>

                            <div className="flex">
                                <label>
                                    <input
                                    name='password'
                                    value={userData.password}
                                    onChange={changeHandler}
                                    required
                                    placeholder= ""
                                    type={passwordVisible ? 'text' : 'password'}
                                    className="input"
                                    />
                                    <span>Password</span>
                                    <span
                                    className="eye-icon absolute top-3 right-3 cursor-pointer text-xl"
                                    onClick={() => togglePasswordVisibility('password')}
                                    >
                                    {passwordVisible ? '🙈' : '👁️'}
                                    </span>
                                </label>

                                <label>
                                        <input
                                        name='confirmpassword'
                                        value={userData.confirmpassword}
                                        onChange={changeHandler}
                                        required
                                        type={confirmPasswordVisible ? 'text' : 'password'}
                                        className="input"
                                        />
                                        <span>Confirm password</span>
                                        <span
                                        className="eye-icon absolute top-3 right-3 cursor-pointer text-xl"
                                        onClick={() => togglePasswordVisibility('confirmpassword')}
                                        >
                                        {confirmPasswordVisible ? '🙈' : '👁️'}
                                        </span>
                                </label>
                            </div>

                        
                                <div className="flex">
                                    <label>
                                        <input 
                                            name='otp' 
                                            value={userData.otp} 
                                            onChange={changeHandler} 
                                            required 
                                            type= 'number' 
                                            className="input" 
                                        />
                                        <span>OTP</span>
                                    </label>
                                    <button className='submit w-full' onClick={OTPHandler} disabled={processing}>
                                        {
                                            processing? "Sending..." : OTPBtn
                                        }
                                        </button>
                                </div>
                            


                            <button onClick={submitHandler} className="submit">Submit</button>
                            <p className="signin">Already have an account? <a onClick={()=>{navigate('/login')}}>LogIn</a></p>
                </form>
                </div>
            </div>
        </>
    );
}

export default Signup;
