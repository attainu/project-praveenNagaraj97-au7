import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core";

import { scrollToTop } from "../../../utils/scrollTopOnRouteChange";
import ProductImageAndBrief from "../ProductDetailJSXProvider/ProductImageAndBrief";
import ProductDetailTable from "../ProductDetailJSXProvider/ProductDetailTable";
import VideoPlayer from "../../VideoPlayer";
import ProductManufacturer from "../ProductDetailJSXProvider/ProductManufacturer";
import ProductBrief from "../ProductDetailJSXProvider/ProductBrief";
import ProductReview from "../ProductDetailJSXProvider/ProductReview";

const useStyles = makeStyles((theme) => ({
  technicalDetails: {
    color: "white",
  },
}));

const productDetails = ["beauty", "kitchen", "pet", "food", "fashion"];

const ALLProductDetail = (props) => {
  scrollToTop();

  const pid = props.id;

  const classes = useStyles();

  if (props.images) {
    return (
      <>
        {/* Product Images | Info-features | AddTocart - direct-buy */}
        <ProductImageAndBrief
          images={props.images}
          productBriefInfo={props.productInfo}
          currentProductId={props.id}
          quantity={props.quantity}
          similarProducts={props.similarProducts}
        />
        <hr style={{ width: "65%" }} />

        {/* As Server doesn't provide video intro for all products this column will be null if no video */}
        {props.video ? (
          <>
            <VideoPlayer src={props.video} />
            {/* <ProductAdvertiseBoard /> */}
            <hr style={{ width: "65%" }} />
          </>
        ) : (
          ""
        )}

        {/* Product Description by Manufacturer as a statement*/}
        {props.productDescription ? (
          <>
            <ProductBrief
              productDescription={props.productDescription}
              productBoards={props.productBoards}
            />
            <hr style={{ width: "65%" }} />
          </>
        ) : (
          ""
        )}

        {/* Product Details in table */}

        {props.productDetails ? (
          <>
            <div className={classes.technicalDetails}>
              <h2>
                {" "}
                {pid
                  ? productDetails.includes(pid.productCategory)
                    ? `Product Details`
                    : "Technical Details"
                  : "Details"}{" "}
              </h2>
              <ProductDetailTable productDetails={props.productDetails} />
            </div>
            <hr style={{ width: "65%" }} />
          </>
        ) : (
          ""
        )}

        {/* About manufacturer */}
        {props.manufacturer ? (
          <>
            <ProductManufacturer manufacturer={props.manufacturer} />
            <hr style={{ width: "65%" }} />
          </>
        ) : (
          ""
        )}

        {/* Product Review Loads on scroll to bottom */}
        <ProductReview
          productReviewDetail={{
            category: props.productReviewFor,
            productId: props.id.productId,
          }}
        />
      </>
    );
  }
  return <h1 style={{ color: "white" }}>Server failed to respond</h1>;
};

const mapStateToProps = ({ productDetail }) => ({
  images: productDetail.images,
  productInfo: productDetail.productInfo,
  video: productDetail.productVideo,
  productDetails: productDetail.productDetails,
  manufacturer: productDetail.manufacturer,
  productDescription: productDetail.productBrief,
  productBoards: productDetail.productBoards,
  id: productDetail.productType,
  quantity: productDetail.quantity,
  similarProducts: productDetail.similarProducts,
});

export default connect(mapStateToProps)(ALLProductDetail);
