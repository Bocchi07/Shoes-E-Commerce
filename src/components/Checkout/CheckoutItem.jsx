import React, {useEffect} from 'react'
import { GoTrash } from "react-icons/go";

function CheckoutItem({cart, removeCheckoutItem, popUpMsg}) {
	useEffect(() => {

	}, [])



	return (
		<div className="grid grid-cols-2 p-2 max-sm:text-sm">
			<div className="flex gap-x-2 h-full ">
				<div className="w-[40%] max-sm:w-[50%] h-full] bg-gray-100 rounded-md flex justify-center items-center">
					<img src={`/images/${cart.image}`} alt="" className="  w-[80%] p-2"/>
				</div>

				<div className="flex-1">
					<h4 className="font-semibold text-base ">{cart.name}</h4>
					<p className=""><span className="font-semibold">Size:</span> {cart.size}</p>
				</div>
			</div>

			<div className="flex justify-between">
				<div>
					<p className="font-semibold text-base text-orange-500">₱{cart.price && cart.price.toLocaleString()}</p>
					<GoTrash onClick={() => popUpMsg(cart)} className="cursor-pointer hover:opacity-100 opacity-70 ease-in-out duration-200"/>
				</div>

				<div> <span className="opacity-70">Qty:</span> {cart.quantity}</div>
			</div>
		</div>
	)
}

export default CheckoutItem