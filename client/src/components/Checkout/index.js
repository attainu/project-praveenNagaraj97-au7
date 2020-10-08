import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";

import { useDispatch, useSelector } from "react-redux";

import { globalFailureMessenger } from "../../actions";
import history from "../../history";
import { states } from "../../data";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    padding: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Shipping address", "Payment details"];

const Checkout = () => {
  const classes = useStyles();
  const user = useSelector(({ userAccredited }) => userAccredited);
  const [activeForm, setActiveForm] = useState(0);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState(states[0].name);
  const [postalCode, setPostalCode] = useState("");

  if (user.hasOwnProperty("isSigned")) {
    if (!user.isSigned) {
      history.push("/user_auth");
      return null;
    }
  }

  const Getters = { name, address, city, state, postalCode };
  const Setters = {
    setName,
    setAddress,
    setCity,
    setState,
    setPostalCode,
  };
  const handleFormSubmit = () => {
    if (!name || !address || !city || !state || !postalCode) {
      dispatch(globalFailureMessenger("Please Fill All Fields"));
      setTimeout(() => {
        dispatch(globalFailureMessenger(null));
      }, 3200);
      return;
    }

    console.log(Getters);
    setActiveForm(1);
  };

  return (
    <div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeForm} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeForm === 0 ? (
              <AddressForm
                Getters={Getters}
                Setters={Setters}
                states={states}
              />
            ) : (
              <PaymentForm Getters={Getters} />
            )}
          </>
          {activeForm === 1 ? (
            <Button
              variant='contained'
              onClick={() => setActiveForm(0)}
              className={classes.button}>
              Back
            </Button>
          ) : (
            <Button
              style={{ textAlign: "right" }}
              variant='contained'
              color='primary'
              onClick={handleFormSubmit}
              className={classes.button}>
              Next
            </Button>
          )}
        </Paper>
      </main>
    </div>
  );
};

export default Checkout;
