import React from 'react'
import ProductList from "./Products/ProductList.jsx"
import products from "./Products/products.json"
import Filter from "./Filter/Filter.jsx"

function Page({viewProduct}) {
	return (
		<div className="flex gap-x-4 relative">
			<Filter />

			<section className=" flex-1 grid grid-cols-3 gap-4">
			  {
				products.map((product, index) => {
					return (<ProductList key={index} product={product} viewProduct={viewProduct}/>)
				})
			  }
			</section>

		</div>
	)
}

export default Page;