import React, {useState, useEffect} from 'react'
import { LuUser } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
import {Link, useLocation} from "react-router-dom"
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import {motion} from "framer-motion"
import {CSSTransition} from "react-transition-group"
import "../App.css"

function Header({handleCart, cart, setIsGenderActive, isGenderActive, signupFormData, loginSuccessfully}) {
	const location = useLocation();
	const [headerAnimation, setHeaderAnimation] = useState(false)

	useEffect(() => {
		setHeaderAnimation(true)

	}, [location.pathname,]);

	const handleGenderPopup = () => {
		setIsGenderActive((prev) => prev ? false : true)
	}

	return (
		<CSSTransition
			in={headerAnimation}
			classNames="header"
			timeout={2000}
			unmountOnExit
		>
		    <div className={`${location.pathname === "/signup-form" || location.pathname === "/login-form" ? "text-white" : "text-black"} flex justify-between items-center mb-14 z-20`}>
				<div className="font-bold font-mono text-3xl"><Link to="/">E-Shoes</Link></div>

				<ul className={`max-sm:hidden relative flex gap-x-8 font-semibold `}>
					<li><Link to="/men" className="">Men</Link></li>
					<li><Link to="/women" className=" border-black">Women</Link></li>
					<li><Link to="/kids">Kids</Link></li>
					<li><Link to="/unisex">Unisex</Link></li>

					<span className={`${useLocation().pathname == "/men" && '-left-3 opacity-100'} ${useLocation().pathname == "/women" && 'left-[4.1rem] opacity-100'} ${useLocation().pathname == "/kids" && 'left-[8.7rem] w-10 opacity-100'} ${useLocation().pathname == "/unisex" && 'left-[13.3rem] opacity-100'} opacity-0 transition-all ease-in-out duration-500 w-14 h-[1px] rounded-md bg-black absolute  bottom-0`}></span>
				</ul>

				<div className="flex gap-x-4 mr-4">
					{loginSuccessfully
						?
							<Link to="/userAccount">
								<div className="flex flex-col justify-center items-center">

										<LuUser className="cursor hover:scale-110 transition-all text-xl"/>
										<p className='max-md:hidden max-w-20 overflow-x-hidden'>{signupFormData[0].username}</p>
								</div>
							</Link>
						: <Link to="/signup-form"><LuUser className="cursor hover:scale-110 transition-all text-xl"/></Link>
					}

					{
						location.pathname === "/checkout"
							? 	<div className="relative cursor-pointer">
									<FiShoppingCart  className={`cursor-pointer hover:scale-110 transition-all text-xl`}/>
									{
										cart.length >= 1 && <p className="bg-red-500 absolute -top-3 border-2 border-white -right-2 font-bold text-[8px] text-white  py-[2px] px-[6px] text-center rounded-full">{cart.length}</p>
									}
								</div>
							: 	<div className="relative cursor-pointer" onClick={handleCart}>
									<FiShoppingCart  className={`cursor-pointer hover:scale-110 transition-all text-xl`}/>
									{
										cart.length >= 1 && <p className="bg-red-500 absolute -top-3 border-2 border-white -right-2 font-bold text-[8px] text-white  py-[2px] px-[6px] text-center rounded-full">{cart.length}</p>
									}
								</div>
					}


					<RxHamburgerMenu onClick={handleGenderPopup} className="max-sm:block cursor-pointer sm:hidden cursor hover:scale-110 transition-all text-xl"/>
				</div>

				<div className={`${isGenderActive ? 'block left-0 translate-x-0' : "-left-1/2 -translate-x-1/2"} text-black md:hidden z-10 fixed top-0  transition-all ease delay-800 duration-300 w-full h-full bg-white`}>
					<ul className={`${isGenderActive ? 'translate-x-0 opacity-100' : "-left-1/2 -translate-x-1/2 opacity-0"} transition-all ease delay-400 duration-700 sm:hidden flex flex-col gap-y-4 text-xl h-full my-auto justify-center items-center gap-x-8 font-semibold `}>
						<li onClick={handleGenderPopup}><Link to="/men" className={` hover:border-b-2 hover:border-black hover:opacity-100 opacity-80 transition-all duration-300 ease-in-out`}>Men</Link></li>
						<li onClick={handleGenderPopup}><Link to="/women" className="hover:border-b-2 hover:border-black hover:opacity-100 opacity-80 transition-all duration-300 ease-in-out">Women</Link></li>
						<li onClick={handleGenderPopup}><Link to="/kids" className="hover:border-b-2 hover:border-black hover:opacity-100 opacity-80 transition-all duration-300 ease-in-out">Kids</Link></li>
						<li onClick={handleGenderPopup}><Link to="/unisex" className="hover:border-b-2 hover:border-black hover:opacity-100 opacity-80 transition-all duration-300 ease-in-out">Unisex</Link></li>
					</ul>

					<IoClose onClick={handleGenderPopup} className="absolute z-20 top-4 right-4 text-xl opacity-80 hover:opacity-100 cursor-pointer transition-all ease-in-out duration-300"/>
				</div>

				<div className={`${isGenderActive ? 'block left-1/2 translate-x-1/2 ' : "-left-1/2 -translate-x-1/2"} md:hidden z-10 fixed top-0 delay-600 transition-all ease-in-out duration-[.9s] w-full h-full bg-black`}></div>
			</div>
		</CSSTransition>
	)
}

export default Header