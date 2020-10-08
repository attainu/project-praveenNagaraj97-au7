import React from "react";
import { useSelector, useDispatch } from "react-redux";

import "../../styles/recentSearched.scss";

import { loadViewProductDetail } from "../../actions";
import { ShowRating } from "../Rating";

/**
 * @description last 10 user viewed Products
 *              irrespective of category!
 *
 * @borrows - this component borrows data from store without making any api calls!!
 */

const RecentSearchedItems = () => {
  const recentviewedItems = useSelector(({ landing }) => landing);
  const dispatch = useDispatch();

  if (!recentviewedItems || !recentviewedItems.hasOwnProperty("viewedItems"))
    return null;
  if (recentviewedItems.viewedItems.length === 0) return null;

  const { viewedItems } = recentviewedItems;

  const handleViewProduct = (id) => {
    const {
      categoryId: { categoryName },
    } = viewedItems.find(({ _id }) => _id === id);

    const productModelled = {
      category: categoryName.toLowerCase(),
      id,
    };
    dispatch(loadViewProductDetail(productModelled));
  };

  const reviewStarRender = (review, reviewerCount) => {
    return (
      <div className='recent-product-display-list-rating'>
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
    <div className='recent-viewed-items__container'>
      <div className='recent-viewed-items__title'>
        Products we think you love the most
      </div>
      <div className='viewed-items'>
        {viewedItems.map(
          ({ productName, productCoverImage, _id, averageReview }) => {
            return (
              <div
                onClick={() => handleViewProduct(_id)}
                key={_id}
                className='recent-view-product-card'>
                <div className='prd-rct-img-container'>
                  <img src={productCoverImage} alt='product-cover' />
                </div>
                <div className='recent-view-product-details'>
                  <p>{productName}</p>
                  <div className='recent-product-review-container'>
                    {reviewStarRender(
                      averageReview.length === 0
                        ? 0
                        : averageReview[0].averageReview,
                      averageReview.length === 0
                        ? 0
                        : averageReview[0].reviewersCount
                    )}
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};
export default RecentSearchedItems;
