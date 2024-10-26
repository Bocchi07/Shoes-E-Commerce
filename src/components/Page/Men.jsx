import React, { useState } from 'react';
import ProductList from "../Products/ProductList.jsx";
import products from "../Products/products.json";
import Filter from "../Filter/Filter.jsx";
import { CSSTransition } from 'react-transition-group';
import '../../App.css';
import filterIcon from "../../assets/img/filter.png"

function Men({ viewProduct }) {
  const [menShoes, setMenShoes] = useState(products);
  const [sortByValue, setSortByValue] = useState(["Men"]);
  const [colorArr, setColorArr] = useState([]);
  const [isFilterActive, setFilterActive] = useState(false);

  const handleFilterBy = (e) => {
    const value = e.target.id[0].toUpperCase() + e.target.id.slice(1);
    setSortByValue((prev) =>
      e.target.checked
        ? [...prev, value]
        : prev.filter((item) => item !== value)
    );
  };

  const handleColorFilter = (color) => {
    setColorArr((prev) =>
      prev.includes(color)
        ? prev.filter(item => item !== color)
        : [...prev, color]
    );

    setSortByValue((prev) =>
      prev.includes(color)
        ? prev.filter(item => item !== color)
        : [...prev, color]
    );
  };

  const handleSortBy = (e) => {
    const value = e.target.value;

    let sortedShoes = [...products]; // Use original products for sorting
    switch (value) {
      case "low-to-high":
        sortedShoes.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedShoes.sort((a, b) => b.price - a.price);
        break;
      case "a-to-z":
        sortedShoes.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-to-a":
        sortedShoes.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setMenShoes(sortedShoes);
  };

  const handleFilterIsActive = () => {
    setFilterActive((prev) => !prev);
  };

  // Filter and Sort Logic
  const filteredMenShoes = menShoes.filter((shoe) => {
    const isMen = shoe.for === "Men";
    const isInSortByValue = sortByValue.includes(shoe.for) || sortByValue.includes(shoe.kids);
    const isInColorArr = colorArr.includes(shoe.color);

    return (isMen || isInSortByValue) && (colorArr.length === 0 || isInColorArr);
  });

  return (
    <div className="sm:flex gap-x-4 relative ">
      <Filter
        handleFilterIsActive={handleFilterIsActive}
        isFilterActive={isFilterActive}
        sortBy={handleSortBy}
        handleFilterBy={handleFilterBy}
        handleColorFilter={handleColorFilter}
        color={colorArr}
      />

      <div
        onClick={handleFilterIsActive}
        className="sm:hidden py-2 px-2 flex items-center justify-center  gap-x-2 border-[1px] border-slate-400  mb-4 rounded-full w-full  ml-auto cursor-pointer"
      >
        <img src={filterIcon} alt="" className="w-4 h-4"/>
        <p >Filter</p>
      </div>

      <div className="flex-1 grid max-sm:grid-cols-2 grid-cols-3 gap-4">
        {filteredMenShoes.map((product) => (
          <CSSTransition key={product.id} timeout={300} classNames="fade">
            <ProductList product={product} viewProduct={viewProduct} />
          </CSSTransition>
        ))}
      </div>
    </div>
  );
}

export default Men;
