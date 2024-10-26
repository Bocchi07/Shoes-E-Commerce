import React, { useState, useEffect } from 'react';
import "../../App.css";
import Video from "../../assets/video/register.mp4";
import {Link, useNavigate } from "react-router-dom";
import SpinningSquares from "../Animation/Spinning Squares/SpinningSquares.jsx"
import { FaCheck } from "react-icons/fa6";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "../../App.css"
import {motion} from "framer-motion"

function RegistrationForm({ setSignupFormData, signupFormData }) {
    const navigate = useNavigate();
    const [signupForm, setSignupForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [bgIsActive, setBgIsActive] = useState(false)
    const [waitIsTrue, setWaitIsTrue] = useState(false)


    const [passwordNotMatch, setPasswordsNotMatch] = useState(false);

    useEffect(() => {
        setPasswordsNotMatch(signupForm.password !== signupForm.confirmPassword);
    }, [signupForm.password, signupForm.confirmPassword]);

    const handleSignupForm = (e) => {
        const { name, value } = e.target;
        setSignupForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleSubmitForm = async(e) => {
        e.preventDefault();

        if (passwordNotMatch || signupForm.username.length < 6 || !signupForm.email.includes("@gmail.com")) {
            return;
        }

        setSignupFormData(prevForm => [...prevForm, signupForm]);

        setSignupForm({
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        });

        setTimeout(() => {
            setBgIsActive(prev => !prev)
            setWaitIsTrue(prev => !prev)
        }, 100)

        setTimeout(() => {
            setWaitIsTrue(prev => !prev)
        }, 4500)

        setTimeout(() => {
            navigate('/login-form');
            setBgIsActive(prev => !prev)
        }, 6000)
    };

    return (
        <div className="form-container md:h-[100dvh] text-white -mt-4 max-md:mt-14">
            <video autoPlay muted loop className="background-video brightness-75">
                <source src={Video} type="video/mp4" />
            </video>

            <motion.div
                initial={{opacity: 0, y: -50, filter: "blur(5px)"}}
                animate={{opacity: 1, y: 0, filter: "blur(0)"}}
                transition={{duration: 1, ease: "easeInOut"}}
                className="z-20"
            >
                <h1 className="max-sm:text-[2.8rem] text-6xl font-bold">Join us and rock the world.</h1>
                <h4 className="max-sm:text-sm mb-2 text-xl">Join us to get shoes you like!</h4>
                <p className="border-b-[1px] border-white w-fit mx-auto hover:text-blue-400 hover:border-blue-600 cursor-pointer max-sm:text-sm">
                    <Link to="/login-form">Already have an account? Login here!</Link>
                </p>

                <form onSubmit={handleSubmitForm} className="md:w-[70%] text-left mt-4 p-2 mx-auto">
                    <div className="relative flex flex-col mb-5">
                        <label htmlFor="username" className="font-semibold">Name</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter your name..."
                            className="py-2 h-11 px-3 rounded-md text-white bg-black bg-opacity-50"
                            value={signupForm.username}
                            onChange={handleSignupForm}
                            required
                        />
                        <p className={`${signupForm.username.length >= 6 ? 'hidden' : 'block'} absolute -bottom-5 text-xs text-red-500 left-0`}>
                            <i>{signupForm.username && "Name must be at least 6 characters"}</i>
                        </p>
                    </div>

                    <div className="relative flex flex-col mb-5">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email..."
                            className="py-2 h-11 px-3 rounded-md text-white bg-black bg-opacity-50"
                            value={signupForm.email}
                            onChange={handleSignupForm}
                            required
                        />
                        <p className={`${signupForm.email.includes("@gmail.com") ? 'hidden' : 'block'} absolute -bottom-5 text-xs text-red-500 left-0`}>
                            <i>{!signupForm.email.includes("@gmail.com") && signupForm.email && "Invalid email"}</i>
                        </p>
                    </div>

                    <div className="relative flex flex-col mb-5">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password..."
                            className="py-2 h-11 px-3 rounded-md text-white bg-black bg-opacity-50"
                            value={signupForm.password}
                            onChange={handleSignupForm}
                            required
                        />
                        <p className={`${signupForm.password.length >= 6 ? 'hidden' : 'block'} absolute -bottom-5 text-xs text-red-500 left-0`}>
                            <i>{signupForm.password && "Password must be at least 6 characters"}</i>
                        </p>
                    </div>

                    <div className="relative flex flex-col mb-8">
                        <label htmlFor="confirmPassword" className="font-semibold">Confirm password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm your password..."
                            className="py-2 h-11 px-3 rounded-md text-white bg-black bg-opacity-50"
                            value={signupForm.confirmPassword}
                            onChange={handleSignupForm}
                            required
                        />
                        <p className={`${signupForm.confirmPassword.length >= 6 && !passwordNotMatch ? 'hidden' : 'block'} absolute -bottom-5 text-xs text-red-500 left-0`}>
                            <i>{passwordNotMatch && signupForm.confirmPassword && "Passwords do not match"}</i>
                        </p>
                    </div>

                    <button type="submit" className="text-black w-full bg-white font-bold py-2 h-12 px-3 font-semibold rounded-md">
                        Register
                    </button>
                </form>
            </motion.div>


        {
            bgIsActive &&
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
        }


        {
            waitIsTrue &&
             <div className="fixed top-1/2 left-1/2 -translate-y-1/2 flex flex-col justify-center items-center -translate-x-1/2 w-40 h-40 z-20 text-black flex items-center justify-center">
                    <SpinningSquares />
                    <p className="text-white mt-8">Loading...</p>
             </div>
        }






        </div>
    );
}

export default RegistrationForm;
