import React from "react";
import { connect } from "react-redux";

import "../../styles/productCart.scss";
import {
  addItemToCart,
  removeItemFromCart,
  loadProductCart,
  loadCheckout,
} from "../../actions";
import history from "../../history";

const ProductCart = ({
  productCart,
  addItem,
  removeItem,
  loadCart,
  loadCheckout,
  isSigned,
}) => {
  if (productCart.hasOwnProperty("productsInCart")) {
    if (productCart.productsInCart.length < 1) {
      return (
        <div className='product-cart'>
          <div className='product-card-header'>
            <h1>No Items in cart</h1>
          </div>
        </div>
      );
    }

    return (
      <div className='product-cart'>
        <div className='product-card-header'>
          <h1>Shopping Cart</h1>
          <h4 className='product-card-header__price'>Price</h4>
        </div>

        <hr />

        {productCart.productsInCart.map(
          ({ _id, productName, price, productCoverImage, quantity }, index) => {
            return (
              <div className='product-card__item-box' key={index}>
                <div className='product-card__item-image__container'>
                  <img
                    className='product-card__item-image'
                    src={productCoverImage}
                    alt={productName}
                  />
                </div>
                <div className='product-card__nameandquantity'>
                  <h3>{productName}</h3>
                  <h4>Qty : {quantity}</h4>
                  <div>
                    {/* <button
                      onClick={() => {
                        addItem(_id);
                        loadCart();
                      }}>
                      +
                    </button> */}
                    <button
                      onClick={() => {
                        removeItem(_id);
                        loadCart();
                      }}>
                      remove from cart
                    </button>
                  </div>
                </div>
                <div className='product-card__price'>
                  <h3 className='product-card__item-price'>₹{price}</h3>
                </div>
              </div>
            );
          }
        )}
        <hr />
        <div className='product-cart-checkout'>
          <div className='sub-total'>
            <p>
              Subtotal ({productCart.cart.length} items) :{productCart.subTotal}
            </p>
          </div>
          {isSigned ? (
            productCart.cart.length ? (
              <button onClick={loadCheckout}>Checkout</button>
            ) : (
              ""
            )
          ) : (
            <button onClick={() => history.push("/user_auth")}>Login</button>
          )}
        </div>
      </div>
    );
  }
  return <h1 style={{ color: "white" }}>No Items In Cart</h1>;
};

const mapStateToProps = ({
  productCart,
  userAccredited: { isSigned = false },
}) => ({
  productCart,
  isSigned,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (id) => dispatch(addItemToCart(id)),
  removeItem: (id) => dispatch(removeItemFromCart(id)),
  loadCart: () => dispatch(loadProductCart()),
  loadCheckout: () => dispatch(loadCheckout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCart);
