import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import "../../../styles/productReviewCreate.scss";
import { ProductReviewForm } from "../../Forms";
import { loadNewProductReview } from "../../../actions";

const ProductReviewCreate = ({
  loadPostProductReview,
  productReviewDetail,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    setShowReviewForm(false);
  }, []);

  return (
    <div className='product-review-create-container'>
      <button onClick={() => setShowReviewForm(!showReviewForm)}>
        Write Review
      </button>
      {showReviewForm ? (
        <div className='review-form'>
          <ProductReviewForm
            productReviewDetail={productReviewDetail}
            postReviewAction={loadPostProductReview}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadPostProductReview: (productType) =>
    dispatch(loadNewProductReview(productType)),
});

export default connect(null, mapDispatchToProps)(ProductReviewCreate);
