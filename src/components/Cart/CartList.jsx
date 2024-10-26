import React, {useState, useEffect, useContext} from 'react'
import { HiOutlinePlusSm } from "react-icons/hi";
import { HiMinusSm } from "react-icons/hi";
import {CartContext} from "../../App.jsx"
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function CartList({
	item,
	addQuantity,
	handleDeleteVerification,
	handleRemoveCart,
	numberOfProduct,
	handleTotalCartPrice,
	// handleIncPrice,
}) {
	const [cartListTotalPrice, setCartListTotalPrice] = useState(item.regularPrice)
	const [cartQuantity, setCartQuantity] = useState(item.quantity);

	const cart = useContext(CartContext);

	// const itemRegularPrice = useRef(item.regularPrice)

	useEffect(() => {
		setCartListTotalPrice(item.regularPrice)
		setCartQuantity(item.quantity)
    }, [item.regularPrice])

    useEffect(() => {
    	handleTotalCartPrice(cartListTotalPrice, item)
    	// handleIncPrice(cartListTotalPrice, itemRegularPrice);
    }, [cartListTotalPrice])

	const handleIncQuantity = () => {
	    cart.setCart(prevCart => {
	      const updatedCart = prevCart.map(c => {
	        if (c.id === item.id && c.size === item.size) {

	          return {
		          ...c,
		          quantity: c.quantity + 1,
		          price: (c.price / c.quantity) * (c.quantity + 1) // Calculate new price
			        };
		        }
	          return c
	      });

	      return updatedCart;
	    });

    	setCartQuantity(q => q += 1)
    	setCartListTotalPrice(c => cartListTotalPrice + item.regularPrice);
  	}

  	const handleRedQuantity = () => {
	    cart.setCart(prevCart => {
		  const updatedCart = prevCart.map(c => {
			        if (c.id === item.id && c.size === item.size) {

			          return {
				          ...c,
				          quantity: c.quantity <= 1 ? 1 : c.quantity - 1,
				          price: c.quantity <= 1 ? c.price : (c.price / c.quantity) * (c.quantity - 1) // Calculate new price
					        };
				        }
			          return c
	      });

	      return updatedCart;
	    });

    	setCartQuantity(q => Math.max(1, q - 1));
    	setCartListTotalPrice(c => c == item.regularPrice ? item.regularPrice : cartListTotalPrice - item.regularPrice);
  	}

	const formatTotalPrice = () => {
	  const numStr = item.price.toString().replace(/,/g, '');
	  const withCommas = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	  return withCommas.replace(/(\d+)(\d{3})$/, '$1;$2');
	};

	const formatOrigPrice = () => {
	  const numStr = item.regularPrice.toString().replace(/,/g, '');
	  const withCommas = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	  return withCommas.replace(/(\d+)(\d{3})$/, '$1;$2');
	};

	// console.log(formatTotalNumber())

	return (
		<div className="mt-4">
			<div className="flex h-28 text-left">
				<div className="w-[30%] bg-slate-100 p-2 flex justify-center items-center">
					<img src={`/images/${item.image}`} alt="img_not_found" />
				</div>

				<div className="flex-1 p-2 font-arial">
					<h3 className="text-base font-semibold w-full">{item.name}</h3>
					<p className="text-sm opacity-50 -mt-2 font-semibold ">{item.for}</p>
					<p className="text-sm font-semibold mt-2">Size: {item.size}</p>

					<div className="flex gap-x-4 items-center text-sm mt-2 font-semibold ">
						<HiMinusSm className="cursor-pointer" onClick={handleRedQuantity}/>
						<p>{item.quantity}</p>
						<HiOutlinePlusSm className="cursor-pointer" onClick={() => {
							handleIncPrice()
							handleIncQuantity()
						}}/>
					</div>
				</div>

				<div className="w-[25%] py-2">
					<div className="text-right">
						<p className="text-lg font-semibold">₱{formatTotalPrice()}</p>
						<p className=" text-sm">₱{formatOrigPrice()}</p>
					</div>
					<button type="button" className=" bg-black text-white w-full h-9 mt-3 rounded-md" onClick={() =>
						{
							// handleRemoveCart(item)
							handleDeleteVerification(item)
						}}>Remove</button>
				</div>
			</div>
		</div>
	)
}

export default CartList;