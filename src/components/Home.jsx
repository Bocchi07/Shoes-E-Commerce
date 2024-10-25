import React, {useState, useEffect} from 'react'
import Hero from "../assets/img/main.jpg"
import Men from "../assets/img/men.jpg"
import Women from "../assets/img/women.jpg"
import Kids from "../assets/img/kid.jpg"
import Unisex from "../assets/img/unisex.jpg"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "../App.css"
import {Link, useLocation} from "react-router-dom";
import {motion, AnimatePresence } from "framer-motion"

function Home() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
		}, []);
	
	  const scrollToTop = () => {
	    window.scrollTo({
	      top: 0,
	      behavior: 'smooth',
	    });
	  };

	return (
		<div>
			<div className=" flex flex-col">
				<motion.h1
					initial={{y:50, filter: "blur(10px)", opacity: 0}}
					animate={{y: 0, filter: "blur(0)", opacity: 1}}
					transition={{duration: 2, ease: "easeInOut"}}
					className="max-md:text-4xl md:text-7xl font-extrabold font-arial text-left h-[20%]"
				>Sport, <br /> the smart choice.
				</motion.h1>


				<motion.img
					src={Hero}
					alt="main.jpg"
					className="hero object-center w-full  object-cover h-[80vh]"
				    initial={{ y:-100, width: "200vw", height: "200vh", filter: "blur(10px)" }}
				    animate={{ y:0,width: "100%", height: "60vh", filter: "blur(0)" }}
				    transition={{ duration: 2, ease: "easeInOut" }}
				/>
			</div>

			<AnimatePresence>
				<div className="text-left gap-x-4 md:h-[24rem] md:flex max-md:grid max-md:grid-cols-2 md:ml-40 mt-12">
					<img src={Men} alt="" className="h-full md:w-80"/>

					<div className="my-auto md:mt-10 md:w-52">
						<h4 className="max-sm:text-3xl text-4xl font-bold ">Men</h4>
						<p className="max-sm:text-sm">See our men collection for style and comfort</p>
						<Link to="/men"><button onClick={scrollToTop} className="bg-black text-white p-2 px-3 mt-2 font-semibold">Explore</button> </Link>
					</div>
				</div>
			</AnimatePresence>

			<div className=" flex justify-end text-left gap-x-4  md:h-[24rem] flex md:mr-40 my-12 max-md:grid max-md:grid-cols-2 ">
				<img src={Women} alt="" className="w-72 object-cover"/>

				<div className="my-auto md:mt-10 order-first md:w-56">
					<h4 className="max-sm:text-3xl text-4xl font-bold">Women</h4>
					<p className="max-sm:text-sm">Explore our women’s collection   for elegance and flair</p>
					<Link to="/women"><button className="bg-black text-white p-2 px-3 mt-2 font-semibold">Explore</button></Link>
				</div>
			</div>

			<div className="text-left  mb-2 gap-x-4 md:h-[24rem] md:flex md:ml-40 max-md:grid max-md:grid-cols-2 ">
				<img src={Kids} alt="" className="md:h-full md:w-72 max-md:w-[1/2] object-cover"/>

				<div className="my-auto md:mt-10 md:w-52">
					<h4 className="max-sm:text-3xl text-4xl font-bold">Kids</h4>
					<p className="max-sm:text-sm">Check out our kids’ collection for fun and adventure</p>
					<Link to="/kids"><button className="bg-black text-white p-2 px-3 mt-2 font-semibold">Explore</button></Link>
				</div>
			</div>

			<div className="text-left  gap-x-4 md:h-[24rem] flex md:mr-40 my-12 justify-end max-md:grid max-md:grid-cols-2 ">
				<img src={Unisex} alt="" className=" object-cover w-80"/>

				<div className="my-auto md:mt-10 order-first md:w-56">
					<h4 className="max-sm:text-3xl text-4xl font-bold">Unisex</h4>
					<p className="max-sm:text-sm">Discover our unisex collection for versatile footwear</p>
					<Link to="/unisex"><button className="bg-black text-white p-2 px-3 mt-2 font-semibold">Explore</button></Link>
				</div>
			</div>
		</div>
	)
}

export default Home
