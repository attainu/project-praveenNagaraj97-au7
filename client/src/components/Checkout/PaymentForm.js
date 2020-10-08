import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector, useDispatch } from "react-redux";
import history from "../../history";
import { retrievePaymentIntent } from "../../api";
import {
  orderSuccess,
  orderFailed,
  globalSuccesMessenger,
} from "../../actions";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const PAY_STYLES = {
  margin: "auto",
  textAlign: "right",
  position: "relative",
  top: "60px",
};

const promise = loadStripe(
  "pk_test_51HYtDFLCMj9x3nR3UVeGBuAyKSdyjCNZkou1DUa4vpJoIspv2xVyH0H2Bzzk3e4jJplpqWuE44dn6Nz4zwW8jmJk00DxC4rymc"
);

const PaymentForm = ({ Getters }) => {
  const [error, setError] = useState(null);
  const [nameOnCard, setNameOnCard] = useState("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const cartItems = useSelector(({ productCart: { cart } }) => cart);
  const dispatch = useDispatch();

  const clientSecret = useSelector(
    ({ payment: { payment_intent } }) => payment_intent
  );

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (!nameOnCard) {
      return setError("Enter your name on card");
    }

    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handlePlaceOrder = async () => {
    if (!clientSecret) {
      setError(
        "Something went Wrong, we found that you tried to modify payment details"
      );
      setTimeout(() => {
        history.push("/cart");
      }, 2000);
      return;
    }

    try {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      if (payload.error) {
        setLoading(false);
        setError(payload.error.message);
        return;
      }

      const modelledData = {
        address: Getters,
        products: cartItems,
      };

      try {
        setLoading(true);
        const { data } = await retrievePaymentIntent(
          payload.paymentIntent.id,
          modelledData
        );
        dispatch(globalSuccesMessenger("Order Placed Successfully"));
        dispatch(orderSuccess(data.details));

        const timeId = setTimeout(() => {
          setLoading(false);
          dispatch(globalSuccesMessenger(null));
          history.push("/orders");
        }, 3200);

        return () => clearTimeout(timeId);
      } catch (err) {
        console.clear();
        try {
          dispatch(orderFailed(err.response.data.message));
        } catch (e) {
          dispatch(orderFailed("Something went wrong"));
        }
      }
    } catch (err) {}
  };

  if (loading) {
    return (
      <div style={{ width: "100px", margin: "auto" }}>
        <img
          style={{ width: "100%" }}
          className='loading-spinner'
          src='https://storage.googleapis.com/lexa-component-styles/loading.gif'
          alt='Loading...'
        />
      </div>
    );
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='name'
            name='nameonCard'
            label='Name on Card'
            value={nameOnCard}
            onChange={(ev) => setNameOnCard(ev.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
      <div style={{ marginTop: "20px" }}>
        <CardElement
          id='card-element'
          options={CARD_ELEMENT_OPTIONS}
          onChange={handleChange}
        />
      </div>
      <div className='card-errors' role='alert'>
        {error}
      </div>
      <div style={PAY_STYLES} className='payment-container'>
        <Button
          onClick={handlePlaceOrder}
          variant='contained'
          color='secondary'>
          Place Order
        </Button>
      </div>
    </>
  );
};

export default ({ Getters }) => (
  <Elements stripe={promise}>
    <PaymentForm Getters={Getters} />
  </Elements>
);
