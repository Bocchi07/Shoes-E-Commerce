import React, {useState, useEffect} from 'react'
import CustomAddress from "../Checkout/CustomAddress.jsx";
import { IoLocationSharp } from "react-icons/io5";
import {CSSTransition} from "react-transition-group"
import "../../App.css"

function UserAddress({
		adress,
		editAdrressPopup,
		closeEditAdrressPopup,
		setAddress,
		clientAddressInfo,
		setClientAddressInfo,
		editAddressIsActive,
	}) {

	const [loadPage, setLoadPage] = useState(false)

	useEffect(() => {
		setLoadPage(true)
	}, [])

//editAddressIsActive
	return (
		<div className="max-sm:text-sm">
			<div className="w-full">

				<h1 className="md:text-3xl max-sm:text-xl max-sm:text-center font-bold my-6 text-left">Address Book</h1>

				 <table className="max-sm:hidden w-full border-b-[1px] border-slate-200">
				      <thead className="bg-slate-100 h-10 border-b-[1px] ">
				        <tr className='opacity-60'>
				          <th>Full Name</th>
				          <th>Address</th>
				          <th>Postcode</th>
				          <th>Phone Number</th>
				        </tr>
				      </thead>
				      <tbody className="">
				        	{
				        		clientAddressInfo.fullName &&
				        		   <tr className="pt-4 h-20">
				        			  <td>{clientAddressInfo.fullName}</td>
							          <td className="">
							          	<span className="bg-black text-white text-xs py-1 px-2 rounded-full mr-2">{clientAddressInfo.labelAddress}</span>
							  			{`${clientAddressInfo.houseAddress}, ${clientAddressInfo.barangay}, ${clientAddressInfo.municipality} ${clientAddressInfo.province}`}</td>
							          <td>{clientAddressInfo.notes}</td>
							          <td>{clientAddressInfo.mobileNumber}</td>
          				           </tr>
				        	}
				      </tbody>
			    </table>

			    	{
			    		clientAddressInfo.fullName &&
				    		 <div className="flex sm:hidden">
						    	<IoLocationSharp className="text-blue-600 w-[10%] my-2"/>
						    	<div className="flex flex-col gap-y-1 flex-1 text-left">
						    		<div className='flex items-center'>
						    			<p className="font-semibold mr-4 text-lg max-sm:text-base">{clientAddressInfo.fullName}</p>
						    			<p className="opacity-60">{clientAddressInfo.mobileNumber}</p>
						    		</div>

						    		<div>
						    			<div>{`${clientAddressInfo.houseAddress}, ${clientAddressInfo.barangay}, ${clientAddressInfo.municipality} ${clientAddressInfo.province}`}</div>
						    		</div>

						    		<div className="flex text-sm">
						    			<div className="border-[1px] border-black p-1 mr-2  rounded-md">{clientAddressInfo.labelAddress}</div>
						    			<div className="border-[1px] border-red-500 text-red-500 p-1 mr-2  rounded-md">default Address</div>
						    		</div>
						    	</div>
						    </div>
			    	}


			    	{
			    		clientAddressInfo.fullName
			    			? <button onClick={editAdrressPopup} className="flex bg-black text-white py-2 px-4 ml-auto rounded-md mt-8 border-none">EDIT ADDRESS</button>
			    			:  <button onClick={editAdrressPopup} className="flex bg-black text-white py-2 px-4 mx-auto rounded-md mt-8 border-none">ADD ADDRESS</button>
			    	}
			</div>
			 <div className={`${editAddressIsActive ? 'block' : "hidden"} fixed top-0 bottom-0 left-0 right-0 bg-black opacity-20`}></div>


			 <CSSTransition
			 	in={editAddressIsActive}
			 	classNames="popupBox"
			 	timeout={500}
			 	unmountOnExit
			 >
				<CustomAddress
				 closeEditAdrressPopup={closeEditAdrressPopup}
				 setAddress={setAddress}
				 clientAddressInfo={clientAddressInfo}
				 setClientAddressInfo={setClientAddressInfo}
				 editAddressIsActive={editAddressIsActive}
				 adress={adress}
	 			/>
			 </CSSTransition>

		</div>
	)
}

export default UserAddress