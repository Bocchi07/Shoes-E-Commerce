import React from 'react'
import ProductList from "../Products/ProductList.jsx"
import {useState, useEffect} from "react"
import products from "../Products/products.json"
import Filter from "../Filter/Filter.jsx"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../../App.css'; // Ensure you import your CSS for transitions
import filterIcon from "../../assets/img/filter.png"

function Women({viewProduct}) {
  const [womenShoes, setWomenShoes] = useState(products);
  const [sortByValue, setSortByValue] = useState(["Women"]);
  const [colorArr, setColorArr] = useState([])
  const [isFilterActive, setFilterActive] = useState(false);

  const handleFilterBy = (e) => {
    const value = e.target.id[0].toUpperCase() + e.target.id.slice(1)

    setSortByValue((prev) =>
              e.target.checked
                  ? [...prev, value]
                  : prev.filter((item) => item !== value)
          );
   }

  const handleColorFilter = (color) => {
    setSortByValue(prev => {
      if(prev.includes(color)){
        return prev.filter(item => item !== color)
      } else {
        return [...prev, color]
      }
    })

    setColorArr(prev => {
      if(prev.includes(color)){
        return prev.filter(item => item != color)
      } else {
        return [...prev, color]
      }
    })
   }

     console.log(sortByValue)

  const handleSortBy = (e) => {
      const value = e.target.value;

      let sortedShoes;

      switch (value) {
        case "low-to-high":
          sortedShoes = [...womenShoes].sort((a, b) => a.price - b.price);
          break;
        case "high-to-low":
          sortedShoes = [...womenShoes].sort((a, b) => b.price - a.price);
          break;
        case "a-to-z":
          sortedShoes = [...womenShoes].sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "z-to-a":
          sortedShoes = [...womenShoes].sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          sortedShoes = products; // Reset to original array or handle default
          break;
      }

      setWomenShoes(sortedShoes);
    };

  const filteredWomenShoes = womenShoes.filter((shoe) => {
    const isMen = shoe.for === "Women";
    const isInSortByValue = sortByValue.includes(shoe.for) || sortByValue.includes(shoe.kids);
    const isInColorArr = colorArr.includes(shoe.color);

    return (isMen || isInSortByValue) && (colorArr.length === 0 || isInColorArr);
  });


  const handleFilterIsActive = () => {
    setFilterActive((prev) => !prev);
  };

	return (
		<div className="sm:flex  gap-x-4 relative">
		  <Filter isFilterActive={isFilterActive} handleFilterIsActive={handleFilterIsActive} sortBy={handleSortBy} handleFilterBy={handleFilterBy} handleColorFilter={handleColorFilter} color={colorArr}/>

        <div
        onClick={handleFilterIsActive}
        className="sm:hidden py-2 px-2 flex items-center justify-center  gap-x-2 border-[1px] border-slate-400  mb-4 rounded-full w-full  ml-auto cursor-pointer"
      >
        <img src={filterIcon} alt="" className="w-4 h-4"/>
        <p >Filter</p>
      </div>


        <TransitionGroup className="flex-1 grid max-sm:grid-cols-2 grid-cols-3 gap-4">
          {filteredWomenShoes.map((product) => (
            <CSSTransition key={product.id} timeout={300} classNames="fade">
              <ProductList product={product} viewProduct={viewProduct} />
            </CSSTransition>
          ))}
        </TransitionGroup>

		</div>
	)
}

export default Women;