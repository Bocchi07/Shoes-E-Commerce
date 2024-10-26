import React from 'react'
import { IoIosCheckmark } from "react-icons/io";
import { BsCheck2Circle } from "react-icons/bs";

function Colours({color, handleFilterBy, handleColorFilter, colorArr}) {
	const backgroundColor = {
		Red: "rgba(245, 39, 39, 0.8)",
		Blue: "rgba(39, 136, 245, 0.8)",
		Green: "rgba(45, 208, 111, 0.8)",
		Yellow: "rgba(240, 225, 39, 0.8)",
		Black: "rgba(25, 25, 25, 0.7)",
		White: "rgba(255, 255, 255, 0.79)",
		Gray: "rgba(141, 145, 145, 0.79)",
		Pink: "rgba(238, 74, 226, 0.79)",
		Purple: "rgba(165, 5, 170, 0.79)",
		Orange: "rgba(249, 111, 25, 0.79)",
		Brown: "rgba(156, 62, 4, 0.79)",
		Lime: 'rgba(174, 245, 39, 0.8)'
	}

	const currentColor = backgroundColor[color] || "#fff";

	return (
		<section className=" flex text-sm flex-col justify-center items-center mb-2">
			<div onClick={() => handleColorFilter(color)} className={`relative overflow-hidden h-6 w-6 rounded-full border-[1px] border-gray-200 `} style={{backgroundColor : currentColor}}>
				<input type="checkbox" className="cursor-pointer w-full h-full bg-black text-white opacity-0"/>

				<IoIosCheckmark className={`${colorArr.includes(color) ? "block" : "hidden"} cursor-pointer absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  text-xl text-black `}/>
			</div>
			<p>{color[0].toUpperCase() + color.slice(1)}</p>
		</section>
	)
}

export default Colours