import React, { useState } from "react";
import { connect } from "react-redux";

import {
  loadGetProductsOnQuery,
  sortProductListASCE,
  sortProductListDESC,
  sortProductListFEATURED,
} from "../../actions";

import "../../styles/productFeatures.scss";

const ProductFeatures = ({
  loadProductByFilterApplied,
  query,
  sortProductListASCE,
  sortProductListDESC,
  sortProductListFEATURED,
}) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [lessThanPrice, setLessThanPrice] = useState("");
  const [moreThanPrice, setMoreThanPrice] = useState("");

  const handleProductPriceFilter = (type, price) => {
    const currentCategoryId = query.current
      .split("categoryId=")[1]
      .split("&")[0];
    const priceQueryApplied = `?categoryId=${currentCategoryId}&productPrice[${type}]=${price}`;
    loadProductByFilterApplied(priceQueryApplied);
  };

  const handleProductWithPriceRange = () => {
    const currentCategoryId = query.current
      .split("categoryId=")[1]
      .split("&")[0];
    const priceQueryApplied = `?categoryId=${currentCategoryId}&productPrice[gt]=${minPrice}&productPrice[lt]=${maxPrice}`;
    loadProductByFilterApplied(priceQueryApplied);
  };

  return (
    <div className='product-features'>
      <div className='price-container'>
        <h4>Price</h4>
        <hr style={{ width: "98%" }} />
        <div className='sort-options'>
          <p onClick={() => handleProductPriceFilter("lt", 10000)}>
            less than ₹10000
          </p>
          <p onClick={() => handleProductPriceFilter("lt", 20000)}>
            less than ₹20000
          </p>
          <p onClick={() => handleProductPriceFilter("gt", 20000)}>
            greater than ₹20000
          </p>
        </div>

        <div className='price-lessthan'>
          <input
            onClick={() => setLessThanPrice("")}
            type='number'
            min={1}
            value={lessThanPrice}
            onChange={(ev) => setLessThanPrice(ev.target.value)}
            placeholder='PRICE <'
          />
          <button onClick={() => handleProductPriceFilter("lt", lessThanPrice)}>
            Go
          </button>
        </div>

        <div className='price-greaterthan'>
          <input
            onClick={() => setMoreThanPrice("")}
            type='number'
            min={1}
            value={moreThanPrice}
            onChange={(ev) => setMoreThanPrice(ev.target.value)}
            placeholder='PRICE >'
          />
          <button onClick={() => handleProductPriceFilter("gt", moreThanPrice)}>
            Go
          </button>
        </div>

        <div className='price-in__range'>
          <input
            onClick={() => setMinPrice("")}
            type='number'
            min={1}
            value={minPrice}
            onChange={(ev) => setMinPrice(ev.target.value)}
            placeholder='MIN'
          />
          <input
            onClick={() => setMaxPrice("")}
            type='number'
            min={1}
            value={maxPrice}
            placeholder='MAX'
            onChange={(ev) => setMaxPrice(ev.target.value)}
          />
          <button onClick={handleProductWithPriceRange}>Go</button>
        </div>
      </div>

      {/* <div className='brand__container'>
        <h4>Brand</h4>
        <hr style={{ width: "98%" }} />
        <p onClick={() => handleProductPriceFilter("lt", 10000)}>Apple</p>
        <p onClick={() => handleProductPriceFilter("lt", 20000)}>Samsung</p>
        <p onClick={() => handleProductPriceFilter("gt", 20000)}>Nokia</p>
        <p onClick={() => handleProductPriceFilter("gt", 20000)}>Vivo</p>
        <p onClick={() => handleProductPriceFilter("gt", 20000)}>One Plus</p>
        <p onClick={() => handleProductPriceFilter("gt", 20000)}>Mi</p>
      </div> */}

      <div className='sort-by__container'>
        <h4>Sort By</h4>
        <hr style={{ width: "98%" }} />
        <p onClick={sortProductListFEATURED}>Featured</p>
        <p onClick={sortProductListASCE}>Price: Low to High</p>
        <p onClick={sortProductListDESC}>Price: High to Low</p>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadProductByFilterApplied: (query) =>
    dispatch(loadGetProductsOnQuery(query)),
  sortProductListASCE: () => dispatch(sortProductListASCE()),
  sortProductListDESC: () => dispatch(sortProductListDESC()),
  sortProductListFEATURED: () => dispatch(sortProductListFEATURED()),
});

const mapStateToProps = ({ productsList: { query } }) => ({ query });

export default connect(mapStateToProps, mapDispatchToProps)(ProductFeatures);
