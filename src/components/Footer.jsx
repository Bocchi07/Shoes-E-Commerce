import React from 'react'
import {useLocation} from "react-router-dom"

function Footer() {
	return (
		<div className={`${useLocation().pathname === "/signup-form" || useLocation().pathname == "/login-form" ? "text-white" : ""} text-left  border-t-[1px] mt-20 sm:p-4 border-slate-200`}>
			<h2 className="max-sm:text-2xl text-3xl font-extrabold">Sport,<br/> the smart choice.</h2>

			<p className="sm:mt-4 max-sm:text-sm text-base">Shop by Jeaven, all product images from <a href="https://nike.com/" target="_blank" className="font-semibold">nike.com</a></p>
		</div>
	)
}

export default Footer