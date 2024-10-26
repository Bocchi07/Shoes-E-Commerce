import React, {useState} from 'react';
import Colours from "./Colours.jsx";
import {useLocation} from "react-router-dom"
import { IoClose } from "react-icons/io5";

function Filter({handleFilterIsActive, isFilterActive, sortBy, handleFilterBy, handleColorFilter, color}) {

	return (
		<section className={`${isFilterActive ? "max-:top-0 max-sm:translate-y-[0] opacity-100" : " max-sm:top-[-50%] max-sm:translate-y-[-50%] max-sm:opacity-0"} transition-all duration-700 ease-in-out max-sm:fixed max-sm:bg-white max-sm:h-full max-sm:top-0 max-sm:left-0 max-sm:w-[100vw] max-sm:p-4 overflow-y-auto z-10 w-[20%] text-left flex flex-col gap-y-4 sm:pr-10`}>
			<IoClose onClick={handleFilterIsActive} className="sm:hidden absolute right-4 text-xl cursor-pointer opacity-60 hover:opacity-100 transition-all ease-in-out duration-300"/>

			<div className="pb-4 border-slate-300 border-b-[1px] max-sm:mt-4">
				<h2 className="text-2xl font-semibold">Filter</h2>
			</div>

			<div>
				<h4 className="text-lg font-semibold">Sort by</h4>
				<select onChange={sortBy} name="" id="" className="py-2 px-3 mt-2 bg-gray-200 rounded-md">
					<option value="">Default</option>
					<option value="low-to-high">Price: Low to High</option>
					<option value="high-to-low">Price: High to Low</option>
					<option value="a-to-z">A....Z</option>
					<option value="z-to-a">Z....A</option>
				</select>
			</div>

			<div className="">
				<h4 className="text-lg font-semibold mb-2">Gender</h4>
				<div className="flex gap-x-2">
					{
						useLocation().pathname == "/men"
							? <input type="checkbox" id="men" onChange={handleFilterBy} checked/>
							: <input type="checkbox" id="men" onChange={handleFilterBy}/>
					}

					<label htmlFor="men">Men</label>
				</div>

				<div className="flex gap-x-2">
					{
						useLocation().pathname == "/women"
							? <input type="checkbox" id="women" onChange={handleFilterBy} checked/>
							: <input type="checkbox" id="women" onChange={handleFilterBy}/>
					}
					<label htmlFor="women">Women</label>
				</div>

				<div className="flex gap-x-2">
					{
						useLocation().pathname == "/unisex"
							? <input type="checkbox" id="unisex" onChange={handleFilterBy} checked/>
							: <input type="checkbox" id="unisex" onChange={handleFilterBy}/>
					}

					<label htmlFor="unisex">Unisex</label>
				</div>
			</div>

			<div className="pb-4 border-slate-300 border-b-[1px]">
				<h4 className="text-lg font-semibold mb-2">Kids</h4>

				<div className="flex gap-x-2">
					<input type="checkbox" id="boys" onChange={handleFilterBy}/>
					<label htmlFor="boys">Boys</label>
				</div>

				<div className="flex gap-x-2">
					<input type="checkbox" id="girls" onChange={handleFilterBy}/>
					<label htmlFor="girls">Girls</label>
				</div>
			</div>

			<div >
				<h4 className="text-lg font-semibold mb-2">Color</h4>
				<div className="grid grid-cols-3 place-items-center">
					<Colours color="Red" colorArr={color} handleColorFilter={handleColorFilter} />
					<Colours color="Blue" colorArr={color} handleColorFilter={handleColorFilter}/>
					<Colours color="Green" colorArr={color} handleColorFilter={handleColorFilter}/>
					<Colours color="Yellow" colorArr={color} handleColorFilter={handleColorFilter}/>
					<Colours color="Black" colorArr={color}  handleColorFilter={handleColorFilter}/>
					<Colours color="White" colorArr={color} handleColorFilter={handleColorFilter}/>
					<Colours color="Gray" colorArr={color} handleColorFilter={handleColorFilter}/>
					<Colours color="Pink" colorArr={color}  handleColorFilter={handleColorFilter}/>
					<Colours color="Purple" colorArr={color} handleColorFilter={handleColorFilter}/>
					<Colours color="Orange" colorArr={color} handleColorFilter={handleColorFilter}/>
					<Colours color="Brown" colorArr={color} handleColorFilter={handleColorFilter}/>
					<Colours color="Lime" colorArr={color} handleColorFilter={handleColorFilter}/>
				</div>
			</div>


		</section>
	)
}

export default Filter
