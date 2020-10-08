import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import "../../styles/searchBar.scss";
import useHandleClose from "../../utils/useHandleClose";
import { apiBaseEndpoint } from "../../api";

import { loadViewProductDetail, loadGetProductsOnQuery } from "../../actions";

import history from "../../history";

const getSearchResults = async (searchTerm) => {
  return await apiBaseEndpoint.get(
    `/product/getProducts?searchin=productName&searchTerm=${searchTerm}&page=1&limit=4`
  );
};

const ProductSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [showHandle, setShowHandle] = useState(false);
  const ref = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const timeId = setTimeout(() => {
      (async (searchTerm) => {
        try {
          if (searchTerm) {
            const response = await getSearchResults(searchTerm);

            if (response.data.message !== "No Document Found")
              setProducts(response.data.details);
            else {
              setProducts([]);
            }
          }
        } catch (err) {
          console.clear();
          setProducts([]);
        }
      })(searchTerm);
    }, 700);

    return () => {
      clearTimeout(timeId);
    };
  }, [searchTerm]);

  useHandleClose(ref, () => {
    setShowHandle(false);
  });

  const handleProductView = (id, categoryName) => {
    setShowHandle(false);
    dispatch(
      loadViewProductDetail({
        category: categoryName.toLowerCase(),
        id,
      })
    );
  };

  const handleSearchList = (categoryId) => {
    setShowHandle(false);

    dispatch(
      loadGetProductsOnQuery(
        `?searchin=productName&searchTerm=${searchTerm}&categoryId=${categoryId._id}&page=1&limit=6`
      )
    );

    history.push(`/category/${categoryId.categoryName.toLowerCase()}`);
  };

  return (
    <div ref={ref} className='products-search__bar'>
      <input
        onChange={(ev) => {
          setSearchTerm(ev.target.value);
          setShowHandle(true);
        }}
        className='input-bar'
        spellCheck={false}
        placeholder='🔎'
        value={searchTerm}
      />

      {products.length > 0 && showHandle ? (
        <div
          onClick={() => setSearchTerm("")}
          className='searched-product__details'>
          <div
            onClick={() => handleSearchList(products[0].categoryId)}
            className='search-in-option'>
            {`Search for ${searchTerm} in ${products[0].categoryId.categoryName}`}
            <img
              src='https://img.icons8.com/fluent/50/000000/arrow.png'
              alt='arrow-forward'
            />
          </div>
          <hr />
          {products.map(
            ({ _id, productName, categoryId: { categoryName } }) => {
              return (
                <Fragment key={_id}>
                  <div
                    onClick={() => handleProductView(_id, categoryName)}
                    className='search-products-results'>
                    <h5>{productName}</h5>
                    <p>in {categoryName}</p>
                  </div>
                  <hr />
                </Fragment>
              );
            }
          )}
        </div>
      ) : showHandle && products.length === 0 ? (
        <div className='searched-product__details'>No Products Found</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductSearchBar;
