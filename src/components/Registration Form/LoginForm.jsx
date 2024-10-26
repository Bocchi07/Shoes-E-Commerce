import React, {useState, useEffect} from 'react'
import Video from "../../assets/video/register.mp4"
import "../../App.css";
import {Link, useNavigate} from "react-router-dom"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FaCheck } from "react-icons/fa6";
import SpinningSquares from "../Animation/Spinning Squares/SpinningSquares.jsx"
import { IoClose } from "react-icons/io5";
import {motion} from "framer-motion"
import "../../App.css"

function LoginForm({signupFormData, setLoginSuccessfully, loginSuccessfully}) {
    const [completeIsTrue, setCompleteIsTrue] = useState(false)
    const [bgIsActive, setBgIsActive] = useState(false)
    const [waitIsTrue, setWaitIsTrue] = useState(false)
    const [loginInput, setLoginInput] = useState({
		      email: '',
		      password: ''
		    })
    const [alertMessage, setAlertMessage] = useState(" ")
    const [alertMessageIsActive, setAlertMessageIsActive] = useState(false)
    const [switchEffect, setSwitchEffect] = useState(false)
    const [pageLoad, setPageLoad] = useState(false)

    const navigate = useNavigate();



    useEffect(() => {
		setPageLoad(true)
    }, [])

    useEffect(() => {
        let timeoutId;

    	if(alertMessageIsActive){
	  		timeoutId = setTimeout(() => {
				setAlertMessageIsActive(prev => !prev)
	    	}, 3000)
    	}

        return () => {
            clearTimeout(timeoutId);
        };
    }, [alertMessage, alertMessageIsActive, ])

    const handleLoginFormChange = (e) => {
    	const {name, value} = e.target

		setLoginInput(prev => ({...prev, [name]: value}))
    }

    const handleLoginForm = async(e) => {
    	e.preventDefault();

    	console.log(signupFormData)
    	if(signupFormData.some(data => data.email === loginInput.email && data.password === loginInput.password)){
		    setSwitchEffect(prev => !prev)


		    setTimeout(() => {
		    	setWaitIsTrue(prev => !prev)
		    	setBgIsActive(prev => !prev)
		    }, 200)

		    setTimeout(() => {
		    	setWaitIsTrue(prev => !prev)
		    	setCompleteIsTrue(prev => !prev)
		    }, 7000)

		    setTimeout(() => {
		    	setCompleteIsTrue(prev => !prev)
		    	setBgIsActive(prev => !prev)
		    	navigate("/")
		    },8500)

		    setTimeout(() => {
			    setLoginSuccessfully(true)
		    }, 12000)

    	} else if (signupFormData.some(data => data.email === loginInput.email && data.password !== loginInput.password)){
    		setAlertMessage("Incorrect password. Please try again.")
    		setAlertMessageIsActive(prev => !prev)
    	} else if (signupFormData.some(data => data.email !== loginInput.email) || signupFormData.length === 0){
    		setAlertMessage("Email not found. Please check your email address or register.")
    		setAlertMessageIsActive(prev => !prev)
    	} else if (signupFormData.some(data => data.email !== loginInput.email && data.password !== loginInput.password)){
    		setAlertMessage("Email not found. Please check your email address or register.")
    		setAlertMessageIsActive(prev => !prev)
    	}

    }



	return (
		<div className="text-white">
			<video autoPlay muted loop className="background-video brightness-75">
	        <source src={Video} type="video/mp4" />
	        </video>

	       <motion.div
                initial={{opacity: 0, y: -50, filter: "blur(5px)"}}
                animate={{opacity: 1, y: 0, filter: "blur(0)"}}
                transition={{duration: 1, ease: "easeInOut"}}
	       >
		        <div className="">
		        	<h2 className="max-sm:text-4xl text-6xl font-bold">Login to enjoy full services.</h2>
		        	<Link to="/signup-form"><p className="border-b-[1px] w-fit mx-auto max-sm:mt-2 max-sm:text-sm mt-4 cursor-pointer hover:text-blue-400 hover:border-blue-600">Don't have account? Register here!</p></Link>
		        </div>

		        <form onSubmit={handleLoginForm} action="" className="text-left md:w-1/2 mx-auto md:mt-10 max-md:mt-4 p-4">
		        	<div className="flex flex-col mb-1">
		        		<label htmlFor="email" className="font-semibold">Email</label>
		        		<input onChange={handleLoginFormChange} value={loginInput.name} name="email" id="email" type="email" placeholder="Enter your email.." className="text-white bg-black bg-opacity-50 h-12 px-3 py-2 px-3 rounded-md" required />
		        	</div>

		        	<div className="flex flex-col mb-1">
		        		<label htmlFor="password" className="font-semibold">Password</label>
		        		<input onChange={handleLoginFormChange} value={loginInput.password} name="password" type="password" placeholder="Enter your password" className="text-white bg-black bg-opacity-50 py-2 h-12 px-3 rounded-md" required/>
		        	</div>

		        	<button type="submit" className="w-full bg-white text-black font-bold h-12 py-2 px-4 mt-4 rounded-md">
		        		Login
		        	</button>
		        </form>

		        <CSSTransition
		            in={completeIsTrue}
		            classNames="popupBox"
		            timeout={1000}
		            unmountOnExit
		        >
		             <div className="bg-green-500 rounded-md  p-2 fixed top-[0vh] left-1/2 -translate-y-1/2 -translate-x-1/2 h-20 z-20 text-black flex flex-col items-center justify-center">
		              	<h4 className="flex items-center font-semibold text-lg">Signup Successful! <FaCheck  className="ml-3"/></h4>

						<p className="text-sm text-nowrap">Your account has been created successfully</p>
		             </div>
		        </CSSTransition>


		        {
		        	bgIsActive && <div className="fixed z-10 inset-0 bg-black bg-opacity-30"></div>
		        }



		        {
		        	waitIsTrue &&
		        	         <div className="fixed top-1/2 left-1/2 -translate-y-1/2 flex flex-col justify-center items-center -translate-x-1/2 w-40 h-40 z-20 text-black flex items-center justify-center">
			                    <SpinningSquares />
			                    <p className="text-white mt-8">Loading...</p>
					         </div>
		        }



		        <CSSTransition
					in={alertMessageIsActive}
					timeout={400}
					classNames="popupBox"
					unmountOnExit
		        >
			        <div className="fixed max-sm:w-80 p-3 text-center flex  justify-start rounded-xl bg-white text-black bg-opacity-60 backdrop-blur-sm -translate-x-1/2 -translate-y-1/2 -top-[2vh] left-1/2 font-semibold">
			        	{alertMessage}
			        </div>
		        </CSSTransition>

		       </motion.div>
		</div>
	)
}

export default LoginForm