import React, {useState, useEffect} from 'react'
import "./product.css"
import {Link} from "react-router-dom"
import { CSSTransition} from 'react-transition-group';
import "../../App.css"
import {motion} from "framer-motion"


function ProductList({product, viewProduct}) {
	const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(true);

	useEffect(() => {
	  setIsVisible(true);
	}, []);

	return (
		<motion.section
			className="transition-all  ease-in-out duration-300 product-section text-left md:mb-4 cursor-pointer"
			onClick={() => viewProduct(product)}
			initial={{ opacity: 0, filter: 'blur(1px)' }}  // Use 'filter' for blur
			animate={{ opacity: 1, filter: 'blur(0px)' }}
			transition={{ duration: 1, ease: "easeInOut" }}
		>
			<Link to="/view-product">
					<CSSTransition
						in={isVisible}
						timeout={4000}
						classNames="shoes"
						appear={true}
						unmountOnExit
					>
						<div className={`bg-gray-200 max-md:h-48 h-60 rounded-md flex justify-center items-center transition-all ease-in-out duration-600  ${loading ? 'filter blur-md' : 'filter blur-0 '}`}>
							<img src={`../../assets/images/${product.image}`}
							 alt="img_not_found"
							 className={`w-[90%] `}
							 onLoad={() => setLoading(false)}
							 onError={() => setLoading(false)}
							/>
						</div>
					</CSSTransition>

				<div className="p-1 text-sm">
					<div className="flex justify-between font-semibold">
						<h4>Haha{product.name}</h4>
						<p>₱{product.price}</p>
					</div>

					<p className="text-xs opacity-40">{product.for}</p>
				</div>
			</Link>
		</motion.section>
	)
}

export default ProductList
