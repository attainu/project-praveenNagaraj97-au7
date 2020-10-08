import React, { useState } from "react";
import { connect } from "react-redux";

import {
  setPageNumber,
  addItemToCart,
  loadViewProductDetail,
} from "../../actions";
import ProductFeatures from "./ProductFeatures";
import { ShowRating } from "../Rating";

import { useInfiniteScrolling } from "../../utils/useInfiniteScrolling";
import { useWindowSize } from "../../utils/useWindowResizeHook";

import "../../styles/productDisplay.scss";

const ProductList = ({
  productsList,
  loadMoreResults,
  addItemToCart,
  loadViewDetail,
  productsLoading,
}) => {
  const { products, query } = productsList;
  const [element, setElement] = useState(null);

  const loadMoreResultsOnScroll = () => {
    loadMoreResults((query.pageNumber += 1));
  };

  useInfiniteScrolling(element, loadMoreResultsOnScroll);

  const handleViewProduct = (id, category) => {
    const productModelled = {
      category,
      id,
    };

    loadViewDetail(productModelled);
  };

  const reviewStarRender = (review, reviewerCount) => {
    return (
      <div className='product-display-list-rating'>
        <ShowRating value={review} />
        {reviewerCount > 0 ? (
          <>
            <p>{reviewerCount}</p>
            <img
              src='https://img.icons8.com/material-sharp/24/000000/reviewer-female.png'
              alt='reviewers'
            />
          </>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <>
      {productsLoading ? (
        <div className='loading-container'>
          <img
            src='https://storage.googleapis.com/lexa-component-styles/loading.gif'
            alt='loading'
          />
        </div>
      ) : (
        ""
      )}

      {useWindowSize().width < 702 && products.length ? (
        <div className='products-container-filter-mobile'>
          {/* Filter options */}
          <ProductFeatures />
        </div>
      ) : (
        ""
      )}
      <div className='products-container'>
        {useWindowSize().width > 700 && products.length > 0 ? (
          <div className='products-container-filter-column'>
            {/* Filter options */}
            <ProductFeatures />
          </div>
        ) : (
          <></>
        )}
        <div className='product-cards-container'>
          <div className='product-cards'>
            {products.length > 0 ? (
              <>
                {products.map(
                  ({
                    _id,
                    productCoverImage,
                    productName,
                    productPrice,
                    averageReview,
                    categoryId: { categoryName },
                  }) => {
                    return (
                      <div key={_id} className='product-card'>
                        <div className='product-card-image_container'>
                          <img
                            className='product-card__image'
                            src={productCoverImage}
                            alt={productName}
                          />
                        </div>

                        <div className='product-card-contents_container'>
                          <h1 className='product-card__title'>{productName}</h1>
                          <div className='product-review-container'>
                            {reviewStarRender(
                              averageReview.length === 0
                                ? 0
                                : averageReview[0].averageReview,
                              averageReview.length === 0
                                ? 0
                                : averageReview[0].reviewersCount
                            )}
                          </div>
                          <p className='product-card__price'>₹{productPrice}</p>
                          <div className='product-card__view__cart_btn_option'>
                            <button
                              onClick={() => {
                                addItemToCart(_id);
                              }}
                              className='product-card__btn product__cart-btn'>
                              Add To Cart
                            </button>
                            <button
                              onClick={() =>
                                handleViewProduct(
                                  _id,
                                  categoryName.toLowerCase()
                                )
                              }
                              className='product-card__btn product__view-btn'>
                              View Product
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {products.length > 0 && query.moreResultsAvailable ? (
        <div
          className='products-loading'
          ref={setElement}
          style={{ color: "white" }}>
          <img
            className='loading-spinner-gif'
            src='https://storage.googleapis.com/lexa-component-styles/Curve-Loading.gif'
            alt='Loading...'
          />
        </div>
      ) : products.length > 0 ? (
        <h1 style={{ color: "white", textAlign: "center" }}>End Of Results</h1>
      ) : (
        <>
          {!productsLoading ? (
            <h1 style={{ color: "white", textAlign: "center" }}>
              No Results Found
            </h1>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ productsList, loader: { productsLoading } }) => ({
  productsList,
  productsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  loadMoreResults: (pageNumber) => dispatch(setPageNumber(pageNumber)),
  addItemToCart: (item) => dispatch(addItemToCart(item)),
  loadViewDetail: (productModel) =>
    dispatch(loadViewProductDetail(productModel)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
