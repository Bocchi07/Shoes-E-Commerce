import React, {useState, useEffect} from 'react'
import UserProfile from "./UserProfile.jsx"
import UserAddress from "./UserAddress.jsx"
import CustomAddress from "../Checkout/CustomAddress.jsx";
import {motion} from "framer-motion"
import {CSSTransition} from "react-transition-group"


function UserAccount({ setAddress, clientAddressInfo, setClientAddressInfo, adress, setPersonalInfo, personalInfo, signupFormData}) {
	const [page, setPage] = useState("personal-info")
	const [clientAddressIsTrue, setClienAddresstIsTrue] = useState(false)
	const [removeItemPopup, setRemoveItemPopup] = useState(false)
	const [editAddressIsActive, setEditAddressIsActive] = useState(false)
	const [loadingPage, setLoadingPage] = useState(false);


	useEffect(() => {
		setLoadingPage(true)
	}, [])

	const handlePageBar = (param) => {
		setPage(param)
	}

	const closeEditAdrressPopup = () => {
		setEditAddressIsActive(false)
	}

	const editAdrressPopup = () => {
		setEditAddressIsActive(true)
	}

	return (
		<CSSTransition
			in={loadingPage}
			classNames="UserAccount"
			timeout={1000}
			unmountOnExit
		>
			<div className="bg-white w-full h-full p-4  -mt-4 rounded-md shadow-sm">
				<ul className="flex relative gap-x-8 sm:text-lg border-b-[1px] border-slate-200 pb-4">
					<li onClick={() => handlePageBar("personal-info")} className={`${page == "personal-info" ? "text-red-500 opacity-80 font-semibold" : "opacity-60"} transition-all ease-in-out cursor-pointer`}>Personal Info</li>
					<li onClick={() => handlePageBar("address-info")} className={`${page == "address-info" ? "text-red-500 opacity-80 font-semibold" : "opacity-60"} transition-all ease-in-out cursor-pointer`}>Address</li>

					<span className={`${page == "personal-info" ? "-left-0 w-28" : "left-32 w-20"} transition-all ease-in-out duration-200 border-b-[1px] border-red-400  absolute bottom-4 `}></span>
				</ul>

				{
					page === "personal-info"
						? <UserProfile
							 personalInfo={personalInfo}
							 setPersonalInfo={setPersonalInfo}
	 						 signupFormData={signupFormData}
						/>
						: <UserAddress
			 				 closeEditAdrressPopup={closeEditAdrressPopup}
							 setAddress={setAddress}
							 clientAddressInfo={clientAddressInfo}
							 setClientAddressInfo={setClientAddressInfo}
							 editAddressIsActive={editAddressIsActive}
							 editAdrressPopup={editAdrressPopup}
							 adress={adress}
							 personalInfo={personalInfo}
							 setPersonalInfo={setPersonalInfo}

						/>
				}
			</div>
		</CSSTransition>
	)
}

export default UserAccount;