import React, {useState} from 'react'
import { PiOfficeChairFill } from "react-icons/pi";
import { IoHome } from "react-icons/io5";
import { MdClose } from "react-icons/md";

function CustomAddress({setAddress, closeEditAdrressPopup, setClientAddressInfo, clientAddressInfo, editAddressIsActive}) {
	const [labelAddress, setLabelAddress] = useState("HOME");

	const handleLabelAddress = (address) => {
		setLabelAddress(prevAddress => prevAddress !== address ? address : prevAddress);
		setClientAddressInfo(prevState => ({
					...prevState, "labelAddress" : address
				}))
	}

	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setClientAddressInfo(prevState => ({
					...prevState, [name] : value
				}))
	}

	const handleSubmitForm = (e) => {
		e.preventDefault()

		setAddress(clientAddressInfo)
		closeEditAdrressPopup()
	}

	return (

		<div className={`text-left overflow-y-auto z-30 max-md:w-full max-md:h-full min-w-[70%] fixed p-4  rounded-md shadow-md top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white`}>
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold mb-4">Add new shipping Address</h2>
				<MdClose onClick={closeEditAdrressPopup} className="text-xl opacity-50 -translate-y-2 cursor-pointer hover:opacity-100 duration-500"/>
			</div>

			<form action="" onSubmit={handleSubmitForm}>
				<div className="md:grid md:grid-cols-2 gap-x-4">
					<div className="">
						<div className="flex flex-col mb-2">
							<label htmlFor="full-name">Full name</label>
							<input name="fullName" onChange={handleInputChange} id="full-name" value={clientAddressInfo.fullName} type="text" placeholder="First Last" className="border-[1px] border-slate-200 py-2 px-2 mt-1" required/>
						</div>

						<div  className="flex flex-col mb-2">
							<label htmlFor="full-name">Mobile Number</label>
							<input name="mobileNumber" onChange={handleInputChange} value={clientAddressInfo.mobileNumber} id="full-name" type="text" placeholder="Please enter your mobile number" className="border-[1px] border-slate-200 py-2 px-2 mt-1" required/>
						</div>

						<div className="flex flex-col mb-2">
							<label htmlFor="full-name">Postcode </label>
							<input name="notes" onChange={handleInputChange} value={clientAddressInfo.notes} id="full-name" type="text" placeholder="Please enter your notes" className="border-[1px] border-slate-200 py-2 px-2 mt-1" required/>
						</div>
					</div>


					<div>
						<div className="flex flex-col mb-2">
							<label htmlFor="house-address">House Number, Building and Street Name </label>
							<input name="houseAddress" onChange={handleInputChange} value={clientAddressInfo.houseAddress} id="house-address" type="text" required placeholder="Please enter your house number, building and street name" className="border-[1px] border-slate-200 py-2 px-2 mt-1"/>
						</div>


						<div className="flex flex-col mb-2">
							<label htmlFor="province-address">Province</label>
							<input name="province" onChange={handleInputChange} value={clientAddressInfo.province} id="province-address" type="text" required placeholder="Please enter your province name"  className="border-[1px] border-slate-200 py-2 px-2 mt-1"/>
						</div>


						<div className="flex flex-col mb-2">
							<label htmlFor="municipality">City/Municipality</label>
							<input name="municipality" onChange={handleInputChange} value={clientAddressInfo.municipality} id="municipality" type="text" required placeholder="Please enter your city/municipality"  className="border-[1px] border-slate-200 py-2 px-2 mt-1"/>
						</div>


						<div className="flex flex-col mb-4">
							<label htmlFor="barangay-address">Barangay</label>
							<input name="barangay" onChange={handleInputChange} value={clientAddressInfo.barangay} id="barangay-address" type="text" required placeholder="Please enter your barangay name " className="border-[1px] border-slate-200 py-2 px-2 mt-1"/>
						</div>

						<div className="">
							<p>Select a label for effective delivery:</p>

							<div className="flex  gap-x-2 mt-2">
								<div onClick={() => handleLabelAddress("HOME")} className={`${labelAddress == "HOME" && 'bg-black text-white border-none'} flex gap-x-2 items-center text-sm rounded-md font-semibold border-[1px] shadow-md border-red-500 py-3 px-4 cursor-pointer`}>
									<IoHome />
									<h5>HOME</h5>
								</div>

								<div onClick={() => handleLabelAddress("OFFICE")} className={`${labelAddress == "OFFICE" && 'bg-black text-white border-none'} flex gap-x-2 items-center text-sm rounded-md font-semibold border-[1px] shadow-md border-blue-500 py-3 px-4 cursor-pointer`}>
									<PiOfficeChairFill />
									<h5>OFFICE</h5>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full flex justify-end gap-x-2 mt-8">
					<button onClick={closeEditAdrressPopup} type="button" className="w-32 py-2 text-sm font-semibold rounded-md  border-[1px] border-red-400 text-red-400">CANCEL</button>
					<button onSubmit={handleSubmitForm} type="submit" className="w-32 py-2 text-sm font-semibold bg-black text-white rounded-md">SAVE</button>
				</div>
			</form>

			<div>

			</div>
		</div>
	)
}

export default CustomAddress