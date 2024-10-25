import React, {useState, useEffect, useRef, useContext} from 'react';
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoIosClose } from "react-icons/io";
import {CSSTransition} from "react-transition-group"
import "../../App.css"
import {motion} from "framer-motion"

function ProductView({product, handleCart, handleCartIsActive, handleIncPrice}) {
	const [selectedSize, setSelectedSize] = useState(39);
	const [addedProduct, setAddedCart] = useState();
	const [price, setPrice] = useState(product.price)
	const [loadingImg, setLoadingImg] = useState(true)

	const regularPrice = useRef(product.price)
	const [sizeGuideIsActive, setSizeGuideIsActive] = useState(false)
 	const navigate = useNavigate();

	const handleSelectedSize = (size) => {
		if (selectedSize == size){
			return
		} else if (selectedSize !== size){
			setSelectedSize(size);
		}
	}

	const formatOrigPrice = () => {
	  const numStr = product.price.toString().replace(/,/g, '');
	  const withCommas = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	  return withCommas.replace(/(\d+)(\d{3})$/, '$1;$2');
	};

	useEffect(() => {
		setAddedCart(c => c = {
			id: product.id,
			name: product.name,
			price: product.price,
			regularPrice: product.price,
			image: product.image,
			for: product.for,
			size: selectedSize,
			quantity: 1
		})
	}, [selectedSize])

	// console.log(history)

  	const handleGoBack = () => {
	    navigate(-1); // Navigate back
	  };


	const handleSizeGuide = () => {
		setSizeGuideIsActive(size => !size)
	}

	return (
		<div className="md:grid grid-cols-2 gap-x-4 text-left">
			<motion.div
				className="bg-gray-200 max-md:h-[30rem] h-[40rem] flex justify-center items-center"
				animate={{x:0, filter: "blur(0px)"}}
				initial={{x:-50, filter: "blur(7px)"}}
				transition={{duration: 1, ease: "easeInOut"}}
			>
				<img
					src={`/images/${product.image}`}
					alt="img_not_found"
					className="w-[90%]"
			        onLoad={() => setLoadingImg(false)}
			        onError={() => setLoadingImg(false)}
				/>
			</motion.div>

			<motion.div
				className="flex flex-col gap-y-4 md:p-8 p-2 mt-4"
				initial={{x:50, filter: "blur(5px)"}}
				animate={{x:0, filter: "blur(0px)"}}
				transition={{duration:1, ease: "easeInOut"}}
			>
			  <div>
			 	 <h1 className="text-3xl font-bold">{product.name}</h1>
			 	 <p>{product.for}</p>
 			 	 <p className="flex items-center gap-x-2">{product.rating} <span><FaStar /></span></p>
			  </div>

			  <h4 className="text-2xl font-semibold mt-2">₱{formatOrigPrice()}</h4>

			  <div className="h-28 w-32 p-2 bg-slate-100 rounded-md border-[2px] border-slate-500 flex items-center">
			  	 <img src={`/images/${product.image}`} alt="" className="w-full"/>
			  </div>

			  <div className="my-2">
			  	<h4 className="mb-2 text-lg font-semibold cursor-pointer">Select size <span className="text-gray-400 text-sm" onClick={handleSizeGuide}>(Size guide)</span></h4>
			  	<div className="flex gap-x-2">
				  	{
				  		product && product.size.map((s, index) => {
				  			return (<button onClick={() => handleSelectedSize(s)} className={`${selectedSize == s ? 'bg-black text-white duration-100' : 'bg-white'} border-[1px] border-black w-20 py-1 h-9 hover:bg-black hover:text-white transition-all ease-in-out duration-100 px-2 rounded-md text-sm font-semibold`} key={index}>{s}</button>)
				  		})
				  	}
			  	</div>
			  </div>

			  <div className="font-sans	">
			  	<p>{product.description}</p>
			  </div>

			  <div className="border-b-[1px] border-gray-300 pb-4">
  			 	 <button type="button" onClick={() => handleCart(addedProduct)}className="text-white bg-black w-32 h-12 rounded-md">Add to cart</button>
			  </div>

			  <p onClick={handleGoBack} className="border-b-[1px] border-gray-500 w-fit font-semibold cursor-pointer">Shipping & Returns</p>

			</motion.div>


			<CSSTransition
				in={sizeGuideIsActive}
				timeout={400}
				classNames="popupBox"
				unmountOnExit
			>
				<div className={` fixed flex flex-col items-center  justify-center text-center z-20 h-40 md:w-[22rem] max-md:w-[17rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-md`}>
					<div className="">
						<h2 className="max-md:text-2xl text-3xl font-bold ">Size guide</h2>
						<IoIosClose onClick={handleSizeGuide} className="absolute top-1 right-1 cursor-pointer text-3xl opacity-80 hover:opacity-100"/>
					</div>

					<div >
						<h4 className="max-md:text-base text-xl font-semibold opacity-80">Choose the size that fits you best.</h4>
						<ul className="flex justify-between text-sm w-[70%] text-sm mx-auto mt-2">
							<li>S</li>
							<li>M</li>
							<li>L</li>
							<li>XL</li>
							<li>XXL</li>
							<li>XXXL</li>
						</ul>
					</div>
				</div>
			</CSSTransition>

			{
				sizeGuideIsActive && <div className="fixed z-10 bg-black inset-0 opacity-20"></div>
			}

		</div>
	)
}

export default ProductView
