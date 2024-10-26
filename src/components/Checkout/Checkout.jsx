import React, {useState, useEffect} from 'react'
import CheckoutItem from "./CheckoutItem.jsx"
import COD from "../../assets/icons/cash-on-delivery.png";
import Gcash from "../../assets/icons/gcash.png";
import "../../App.css"
import { MdClose } from "react-icons/md";
import CustomAddress from "./CustomAddress.jsx"
import { CSSTransition } from 'react-transition-group';
import '../../App.css'
import SpinningSquares from "../Animation/Spinning Squares/SpinningSquares.jsx"
import {motion} from "framer-motion"
import { LuCheck } from "react-icons/lu";
import {useNavigate} from "react-router-dom"

function Checkout({cart, totalPrice, clientAddressInfo, setClientAddressInfo, setAddress, adress, setCheckOutItem, checkoutItem}) {
	const [total, setTotal] = useState();
	const [totalOfItems, setTotalOfItems] = useState(0)
	const [removeItemPopup, setRemoveItemPopup] = useState(false)
	const [editAddressIsActive, setEditAddressIsActive] = useState(false)
	const [selectedRemovingItem,setSelectedRemovingItem] = useState();
	const [placeOrderIsActive, setPlaceOrderIsActive] = useState(false)
	const [subtotal, setSubtotal] = useState()
	const [isAdressActive, setIsAdressActive] = useState(false);
	const [checkoutItemIsEmpty, setCheckOutItemIsEmpty] = useState(false)
	const [processingOrder, setProcessingOrder] = useState(false)
	const [orderedMessage, setOrderedMessage] = useState(false)


	const navigate = useNavigate()

	useEffect(() => {
		const total = checkoutItem.reduce((accumulator, item) => {
			return accumulator + item.price
		}, 0)

		setSubtotal(total)

	}, [checkoutItem])

	useState(() => {
		setTotal(prevPrice => totalPrice)
	}, [checkoutItem])

	useEffect(() => {
		const totalQuantity = checkoutItem.reduce((accumulator, item) => accumulator + item.quantity , 0);
		setTotalOfItems(totalQuantity)
	}, [checkoutItem, totalPrice])

	useEffect(() => {
		setCheckOutItem(cart)
	}, [cart])

	useEffect(() => {
		let timeoutID;

		if(isAdressActive){
			timeoutID = setTimeout(() => {
				setIsAdressActive(false)
			}, 3000)
		}

		return () => {
			clearTimeout(timeoutID)
		};
	}, [adress, isAdressActive])

	useEffect(() => {
		let timeoutID;

		if(checkoutItemIsEmpty){
			timeoutID = setTimeout(() => {
				setCheckOutItemIsEmpty(false)
			}, 3000)
		}

		return () => {
			clearTimeout(timeoutID)
		};
	}, [checkoutItem, checkoutItemIsEmpty])

	useEffect(() => {
		let timeoutID;

		if(processingOrder){
			setTimeout(() => {
				setProcessingOrder(prev => !prev)
			}, 6000)
		}
	}, [processingOrder])

	console.log("hello", checkoutItem)

	useEffect(() => {
		if(processingOrder){
			setTimeout(() => {
				setOrderedMessage(prev => !prev)
			}, 10000)
		}
	}, [orderedMessage])

	const removeCheckoutItem = (data) => {
	    setCheckOutItem(prevCart =>
	      prevCart.filter(item =>
	        item.size !== selectedRemovingItem.size || item.id !== selectedRemovingItem.id
	      )
	    );

		closePopUpMsg()
	}

	const popUpMsg = (data) => {
		setRemoveItemPopup(true)
		setSelectedRemovingItem(data)
	}

	const closePopUpMsg =  () => {
		setRemoveItemPopup(false)
	}

	const editAdrressPopup = () => {
		setEditAddressIsActive(true)
	}

	const closeEditAdrressPopup = () => {
		setEditAddressIsActive(false)
	}

	const handlePlaceOrderBtn = () => {
		setPlaceOrderIsActive(prev => !prev)
	}

	const handlePlaceOrder = async() => {
		if(checkoutItem.length === 0){
			setCheckOutItemIsEmpty(true)
		}else{
			setCheckOutItemIsEmpty(false)
		}

		if (clientAddressInfo.fullName === ""){
			setIsAdressActive(true)
		}

		if (checkoutItem.length == 0){
			setCheckOutItemIsEmpty(true)
		}

		if(clientAddressInfo.fullName && checkoutItem.length !== 0){
				setPlaceOrderIsActive(prev => !prev)
				setProcessingOrder(prev => !prev)
				setTimeout(() => {
					setOrderedMessage(prev => !prev)
					// setPlaceOrderIsActive(true)
				}, 6000)

				setTimeout(() => {
					navigate("/purchase-successfull")
				}, 8000)
		}
	}

	return (
		<div className="md:flex justify-between text-left gap-x-2">
			<motion.div
				initial={{opacity: .8, x: -30, filter: "blur(5px)"}}
				animate={{opacity: 1, x: 0, filter: "blur(0)"}}
				transition={{duration: 2, ease: "easeInOut"}}
				className="md:flex-1  flex flex-col gap-y-4 text-sm mb-10"
			>
				<div className="bg-white shadow-sm">
					<div className="flex justify-between  bg-gray-200 ">
						<h4 className="text-base font-semibold p-2 ">Shipping Address</h4>
						<p onClick={editAdrressPopup} className="text-blue-500 p-2 hover:underline cursor-pointer mr-4 font-semibold">Edit</p>
					</div>

					{
						clientAddressInfo.fullName && <div className="p-2">
												<div className="flex gap-x-4 mb-2">
													<h4 className="">{clientAddressInfo.fullName}</h4>
													<p>{clientAddressInfo.mobileNumber}</p>
												</div>

												<div className="flex gap-x-4">
													<div className=" bg-black text-white px-3 rounded-full font-bold py-[1px] pb-[3px]">{clientAddressInfo && clientAddressInfo.labelAddress}</div>
													<p>{`${clientAddressInfo.houseAddress}, ${clientAddressInfo.barangay}, ${clientAddressInfo.municipality} ${clientAddressInfo.province}`}</p>
												</div>
											</div>
					}

				</div>

				<div className="bg-white shadow-sm pb-2">
					<div className=" border-slate-300 p-2 bg-gray-200 shadow-sm font-semibold">Package {totalOfItems} of {totalOfItems}</div>
					{
					  checkoutItem && checkoutItem.map((c, index) => <CheckoutItem key={index} cart={c} removeCheckoutItem={removeCheckoutItem} popUpMsg={popUpMsg}/>)
					}
				</div>
			</motion.div>

			<motion.div
				initial={{opacity: .8, x: 30, filter: "blur(5px)"}}
				animate={{opacity: 1, x: 0, filter: "blur(0)"}}
				transition={{duration: 2, ease: "easeInOut"}}
				className="md:w-[35%] bg-white shadow-sm h-fit"
			>
				<h4 className="text-base font-semibold bg-gray-200 p-2">Select Payment Method</h4>
				<div className="p-4 py-4">
					<div className=" w-full flex flex-col gap-y-2 ">
						<div className="border-blue-300 border-2 p-2 cursor-pointer rounded-sm">
								<div className="flex justify-between items-center ">
									<div className="flex items-center gap-x-2">
										<img src={COD} alt="" className="h-9"/>
										<h4 className="font-semibold">Cash On Delivery</h4>
									</div>
									<input type="radio" name="payment-method" id="cash-on-delivery" readOnly checked/>
								</div>

								<p className="text-sm mt-2 opacity-70">Pay when you recieve</p>
						</div>


						<div className="gcash-container border-[1px] border-slate-200 relative p-2 cursor-pointer rounded-sm">
								<div className="flex justify-between items-center ">
									<div className="flex items-center gap-x-2">
										<img src={Gcash} alt="" className="h-9"/>
										<h4 className="font-semibold">GCash e-Wallet</h4>
									</div>
									<input type="radio" name="payment-method"  />
								</div>

								<p className="text-sm mt-2 opacity-70">GCash e-wallet</p>

							  <div className="gcash-not-avail justify-center items-center absolute z-10 top-0 left-0 right-0 bottom-0 ">
							  	<p className="text-red-500 font-bold text-xl">Not available</p>
							  </div>
						</div>
					</div>

					<div className="mt-4 border-b-[1px] border-gray-200 pb-4 ">
						<h4 className="font-semibold mb-2">Order Summary</h4>
						<div className="flex justify-between items-center mb-2">
							<p className="opacity-70">Subtotal ({totalOfItems} items) </p>
							<p className="font-semibold">₱{subtotal && subtotal.toLocaleString()}</p>
						</div>

						<div className="flex justify-between items-center">
							<p className="opacity-70">Free Shipping Fee</p>
							<p className="font-semibold">₱0</p>
						</div>
					</div>

					<div className="mt-4">
						<div className="flex justify-between items-center mb-4 font-semibold">
							<p>Total</p>
							<p>₱{subtotal && subtotal.toLocaleString()}</p>
						</div>
						<button onClick={handlePlaceOrderBtn} className="bg-black text-white font-bold w-full h-10 text-sm rounded-md">PLACE ORDER NOW</button>
					</div>
				</div>
			</motion.div>


			<CSSTransition
				in={removeItemPopup}
				timeout={400}
				classNames="popupBox"
				unmountOnExit
			>

				<div className={` z-20 fixed top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%] w-80 shadow-md p-4 rounded-sm bg-white`}>
					<div className="flex items-center justify-between mb-4 -mt-1">
						<h4 className="font-semibold">Remove from checkout?</h4>
						<MdClose onClick={closePopUpMsg} className="opacity-50 hover:opacity-100 ease duration-200 cursor-pointer text-xl"/>
					</div>

					<p>Item(s) will be removed from order</p>

					<div className="flex justify-center gap-x-4 mt-4">
						<button onClick={closePopUpMsg} type="button" className="border-[1px] border-red-400 text-red-400 p-2 w-full rounded-md font-semibold text-sm">CANCEL</button>
						<button onClick={() => removeCheckoutItem(cart)} type="button" className="text-white bg-black w-full rounded-md font-semibold text-sm">REMOVE</button>
					</div>
				</div>
			</CSSTransition>

			<div className=	{`${removeItemPopup ? 'block opacity-100' : "hidden opacity-0"} backdrop-blur-lg fixed top-0 bottom-0 left-0 right-0 bg-black opacity-20`}></div>
			<div className=	{` ${editAddressIsActive ? 'block opacity-100' : "hidden opacity-0"} backdrop-blur-lg fixed top-0 bottom-0 left-0 right-0 bg-black opacity-20`}></div>

			<CSSTransition
				in={editAddressIsActive}
				timeout={400}
				classNames="popupBox"
				unmountOnExit
			>
				 <CustomAddress
					closeEditAdrressPopup={closeEditAdrressPopup}
					setAddress={setAddress}
					clientAddressInfo={clientAddressInfo}
					setClientAddressInfo={setClientAddressInfo}
				  />
			</CSSTransition>


			{
				placeOrderIsActive || processingOrder || orderedMessage
					? <div className="fixed inset-0 bg-black opacity-30"></div>
					: " "
			}

			<CSSTransition
				in={placeOrderIsActive}
				timeout={400}
				classNames="popupBox"
				unmountOnExit
			>
				<div className="z-20  rounded-md shadow-sm p-4  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2  text-center">
					<h3 className="font-semibold text-lg max-sm:text-balance">Are you sure you want to place your order?</h3>
	                <p className="text-sm text-nowrap">Please review your selection before confirming.</p>
					<div className="flex gap-x-2 justify-center mt-4">
						<button onClick={handlePlaceOrderBtn} className="bg-white border-[1px] border-red-400 text-red-500 py-2 px-2 w-32 text-sm rounded-md opacity-80 hover:opacity-100 transition-all ease-in-out duration-400">NO</button>
						<button onClick={handlePlaceOrder} className="bg-black text-white py-2 px-2 w-32 text-sm rounded-md opacity-80 hover:opacity-100 transition-all ease-in-out duration-400">YES</button>
					</div>
				</div>
			</CSSTransition>

			<CSSTransition
				in={isAdressActive}
				timeout={400}
				classNames="popupBox"
				unmountOnExit
			>
					<div className="fixed text-nowrap text-center top-[10%] z-40 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-black bg-opacity-70 px-4  py-3 backdrop-blur-sm rounded-xl text-white">
						Please add your address first to complete your order.
					</div>
			</CSSTransition>

			<CSSTransition
				in={checkoutItemIsEmpty}
				timeout={400}
				classNames="popupBox"
				unmountOnExit
			>

				<div className="fixed text-nowrap text-center top-[16%] z-40 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-black bg-opacity-70 px-4  py-3 backdrop-blur-sm rounded-xl text-white">
					Please add a product first to complete your order.
				</div>
			</CSSTransition>

			<CSSTransition
				in={processingOrder}
				timeout={400}
				classNames="popupBox"
				unmountOnExit
			>
				<div className="text-center z-50 text-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<SpinningSquares/>
					<p className='loading -mt-12 text-xl'>Loading...</p>
				</div>
			</CSSTransition>


			<CSSTransition
				in={false}
				timeout={400}
				classNames="popupBox"
				unmountOnExit
			>
					<div className="fixed text-nowrap text-center top-[10%] z-40 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-green-400 bg-opacity-70 px-4  py-3 backdrop-blur-sm rounded-xl text-black">
						Thank you for your order! Your items will arrive within 3 days.
					</div>
			</CSSTransition>

			<CSSTransition
				in={orderedMessage}
				timeout={400}
				classNames="popupBox"
				unmountOnExit
			>
				<div className="z-40 rounded-xl flex flex-col items-center justify-center p-8 bg-white text-green-500 text-center fixed top-[15vh] left-1/2 -translate-x-1/2 -translate-y-1/2">
					<LuCheck  className="border-2 border-green-400 h-16 w-16 p-2 rounded-full"/>
					<h2 className="text-xl text-nowrap font-semibold">Order Successfully Placed!</h2>
				</div>
			</CSSTransition>

		</div>
	)
}

export default Checkout