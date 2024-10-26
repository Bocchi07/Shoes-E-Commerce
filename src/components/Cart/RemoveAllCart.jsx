import React, {useState} from 'react'

function RemoveAllCart({isDeleteAllTrue, deleteItemIsActive, handleDeleterAllItem, handleClearCart, cart}) {
	return (
		  <div className={`${isDeleteAllTrue ? 'block opacity-100' : 'hidden opacity-0' } transition-all ease-in-out duration-300 fixed bg-white shadow  w-80 p-3 rounded-md top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 shadow-lg`}>
	        <h3 className="font-semibold">Confirm to delete?</h3>
	        <p className="text-sm mt-2">Are you sure you want to delete this {cart.length} item(s) from the cart?</p>
	        <div className="w-full flex justify-center mt-5 gap-x-2">
	          <button onClick={handleDeleterAllItem} className="border-red-500 border-[1px] w-1/2 opacity-80 font-semibold rounded-md py-1 text-red-500 hover:opacity-100 duration-200 ease-in-out">Cancel</button>
	          <button onClick={handleClearCart} className="w-1/2 rounded-md py-1 text-white font-semibold bg-black opacity-90 hover:opacity-100 duration-200 ease-in-out">Delete</button>
	        </div>
	      </div>
	)
}

export default RemoveAllCart;