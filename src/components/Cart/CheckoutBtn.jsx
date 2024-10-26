import React, {useContext, useEffect, useState} from 'react'
import {CartContext} from "../../App.jsx"
import {Link} from 'react-router-dom'

function CheckoutBtn({cartIsEmpty, handleCartIsActive}) {

	const cart = useContext(CartContext);

	if(!cart.isCartEmpty && cart.hasUserAccount){
 	  		return(
				<Link to="/checkout">
	    			<button onClick={handleCartIsActive} type="button" className=" w-full bg-black text-white mt-auto h-12 mt-7 rounded-md">
	    				Checkout
	    			</button>
				</Link>)
 	  } else if(!cart.isCartEmpty && !cart.hasUserAccount){
 	  	 	 return(
				<Link to="/signup-form">
	    			<button onClick={handleCartIsActive} type="button" className=" w-full bg-black text-white mt-auto h-12 mt-7 rounded-md">
	    				Checkout
	    			</button>
				</Link>)
 	  } else if(cart.isCartEmpty){
	 	  	return(
				<button type="button" onClick={() => alert("Please add a cart first!")}
				 className=" w-full bg-black text-white mt-auto h-12 mt-7 rounded-md">
					Checkout
				</button>
				)
 	  }
}

export default CheckoutBtn