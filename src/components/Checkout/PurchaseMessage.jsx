import React, {useEffect, useState} from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FaCheck } from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import { motion } from 'framer-motion';

function PurchaseMessage({checkoutItem, setCheckOutItem, setCart}) {
	console.log("checkout Item: ", checkoutItem)
	const [totalPrice, setTotalPrice] = useState()
	const navigation = useNavigate();

	useEffect(() => {
		const total = checkoutItem.reduce((accumulator, item) => {
			return accumulator + item.price
		}, 0)

	    const formattedTotal = total.toLocaleString();
   		setTotalPrice(formattedTotal);
	}, [checkoutItem])

	const backToHomeBtn = () => {
		setCheckOutItem([])

		navigation("/")
		setCart([])
	}

	return (
		<div>
				<motion.div
					className="bg-white md:w-[80vw] mx-auto flex flex-col items-center justify-center  rounded-xl md:p-6 p-2 py-10 shadow-xl"
			        initial={{opacity: 0, y: -50, filter: "blur(5px)"}}
	                animate={{opacity: 1, y: 0, filter: "blur(0)"}}
	                transition={{duration: 1.5, ease: "easeInOut"}}
				>
						<div className="text-sm text-center">
							<FaCheck className="bg-green-400 text-white mx-auto h-16 w-16 p-4 rounded-full my-2"/>
							<h1 className="max-sm:text-2xl text-3xl font-bold mb-2">Thank you for your purchase</h1>
							<p className="opacity-90">We received your order and will ship in 5-7 days.</p>
							<p className="opacity-90 mb-6">Your order number is #kl0YisP0G3</p>
						</div>

						<div className="bg-gray-50 p-4 max-md:w-[100%] md:w-[40rem] rounded-xl shadow-sm">
							<h4 className="text-xl text-left text-3xl font-semibold mb-4">Order Summary</h4>
							<div className="flex-col">
								 {
								    checkoutItem && checkoutItem.map((item, i) => {
								      return (
								        <div key={i} className="flex h-24 mb-2 items-center justify-between p-4 gap-2 border-b-[1px] border-slate-200">
								          <div className="w-[20%] h-full flex items-center justify-center">
			        				          <img src={`/images/${item.image}`} alt="" className="max-h-full w-full object-contain"/>
								          </div>
								          <div className="text-left flex-1">{item.name}</div>
								          <div className="font-semibold w-[20%]">₱{item.price}</div>
								        </div>
								      );
								    })
								  }
							</div>

							<div className="flex justify-evenly items-center mt-4">
								<p>Total:</p>
								<p className="font-semibold">₱{totalPrice}</p>
							</div>
						</div>

						<button onClick={backToHomeBtn} className="border-[1px] border-black py-2 px-8 mt-8 hover:opacity-100 opacity-80 cursor-pointer text-nowrap bg-white rounded-lg">Back to home</button>
				</motion.div>
		</div>

	)
}

export default PurchaseMessage;
