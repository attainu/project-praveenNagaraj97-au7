import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Badge from "@material-ui/core/Badge";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { loadProductCart } from "../../actions";

const StyledBadge = withStyles((theme) => ({
  badge: {},
}))(Badge);

const useStyles = makeStyles((theme) => ({
  cartIcon: {
    padding: "0",
  },
  cartBottonContainer: {
    backgroundColor: "#cacbcd",
    padding: "8px",
    borderRadius: "3px",
    textAlign: "center",
  },
}));

const CartIcon = ({ productCart, loadProductCart }) => {
  const classes = useStyles();
  return (
    <Link className='nav-links' to='/cart'>
      <div onClick={loadProductCart} className={classes.cartBottonContainer}>
        <IconButton className={classes.cartIcon} aria-label='cart'>
          <StyledBadge badgeContent={productCart.cart.length} color='secondary'>
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </div>
    </Link>
  );
};

const mapStateToProps = ({ productCart }) => ({ productCart });

const mapDispatchToProps = (dispatch) => ({
  loadProductCart: () => dispatch(loadProductCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
