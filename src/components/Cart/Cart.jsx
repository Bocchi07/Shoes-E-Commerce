import React, {useState, useEffect, useContext} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {CartContext} from "../../App.jsx"
import { IoClose } from "react-icons/io5";
import { PiPackageBold } from "react-icons/pi";
import "../../App.css"
import CheckoutBtn from "./CheckoutBtn.jsx"
import CartList from "./CartList.jsx";
import RemoveCart from "./RemoveCart.jsx"
import RemoveAllCart from "./RemoveAllCart.jsx"

function Cart({
	handleCart,
	cartIsActive,
	handleDeleteAllVerification,
	handleDeleteVerification,
	handleCartIsActive,
	addQuantity,
	regularPrice,
	handleRemoveCart,
	handleClearCart,
	handleIncPrice,
	deleteItemIsActive,
	deleteAllItemIsActive
  }) {

	const [totalCartListPrice, setTotalCartListPrice] = useState(0);
	const [checkPrice, setCheckPrice] = useState([])
	const [cartId, setCartId] = useState([])
	const [cartIsEmpty, setCartIsEmpty] = useState(false)
	const [isDeleteAllTrue, setIsDeleteAllTrue] = useState(false)

	const cart = useContext(CartContext);
	let renderCheckoutCart;

	useEffect(() => {
		handleTotalPrice()
		cart.setCheckOutTotalPrice(formatTotalNumber)
	}, [cart.cart.map(p => p.price)])




	const handleTotalCartPrice = (price, item) => {
		if(cartId.some(prevId => prevId.id == item.id && prevId.size == item.size)){
			return
		}
		setCheckPrice(prevPrice => [...prevPrice, totalCartListPrice])
		setCartId(prevId => [...prevId, item])
	}

	const handleTotalPrice = () => {
	  const totalPrice = cart.cart.reduce((acc, item) => {
	    return acc + (item.price );
	  }, 0);

	  setTotalCartListPrice(totalPrice);
	};

	const formatTotalNumber = () => {
	  const numStr = totalCartListPrice.toString().replace(/,/g, '');
	  const withCommas = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	  return withCommas.replace(/(\d+)(\d{3})$/, '$1;$2');
	};


	const handleDeleterAllItem = () => {
		setIsDeleteAllTrue(prev => !prev)
	}

	const handleDeleterAllItemYes = () => {
		setIsDeleteAllTrue(prev => !prev)

		handleClearCart()
	}

	return (
	    <div className={`${cartIsActive ? 'right-0 opacity-100 md:w-[30rem]' : '-right-[75%] opacity-100 translate-x-[0rem] max-md:translate-x-[12rem] md:w-[30rem]'} w-full fixed p-4 pb-20 transition-all duration-[1s] fixed z-40 bg-white  h-full top-0 `}>
	    	<div className="flex justify-between items-center pb-4">
	    		<h3 className="text-xl font-semibold">Cart ({cart.cart.length}) <span onClick={handleDeleterAllItem} className={`text-sm opacity-50 hover:opacity-100 transition-all hover:border-b-[1px] hover:text-red-400 pb-1 border-red-400 cursor-pointer`}>(Clear cart)</span></h3>
	    		<IoClose onClick={handleCartIsActive} className="text-xl opacity-50 transition-all hover:opacity-100 cursor-pointer mt-2"/>
	    	</div>

	    	<div className="cart-list h-[72%] overflow-y-auto scrollbar-thin  scrollbar-track-black pr-4">
	    		{
    			  cart && cart.cart.map((item, index) => {
    			  	return <CartList
		    			  		item={item}
		    			  		key={index}
		    			  		addQuantity={addQuantity}
		    			  		regularPrice={regularPrice}
		    			  		handleRemoveCart={handleRemoveCart}
		    			  		handleTotalCartPrice={handleTotalCartPrice}
		    			  		handleDeleteVerification={handleDeleteVerification}
		    			  		handleIncPrice={handleIncPrice}
		    			  	/>
    			  })
	    		}
	    	</div>

    		<div className="absolute -bottom-4 left-0 right-0 p-4 h-32  ">
    			<div className="flex justify-between items-center mb-2">
    				<p className="font-semibold text-lg">Total: ₱{formatTotalNumber()}</p>
    				<p className="flex gap-x-2 text-sm items-center"><PiPackageBold /> Free shipping</p>
    			</div>

    			<CheckoutBtn cartIsEmpty={cartIsEmpty} handleCartIsActive={handleCartIsActive}/>
    		</div>

		{
			deleteItemIsActive || isDeleteAllTrue
			  ?  <div className="fixed inset-0 bg-black bg-opacity-20 z-10 "></div>
			  : " "
		}


    	<RemoveCart
	        handleDeleteVerification={handleDeleteVerification}
	        handleRemoveCart={handleRemoveCart}
	        deleteItemIsActive={deleteItemIsActive}
	      />

	     <RemoveAllCart
	        deleteAllItemIsActive={deleteAllItemIsActive}
	        handleDeleteVerification={handleDeleteAllVerification}
	        handleClearCart={handleDeleterAllItemYes}
	        cart={cart}
	        isDeleteAllTrue={isDeleteAllTrue}
	        handleDeleterAllItem={handleDeleterAllItem}
	      />
        </div>
	)
}

export default Cart;