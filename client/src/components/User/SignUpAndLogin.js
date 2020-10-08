import React, { useState } from "react";
import { reduxForm, Field } from "redux-form";
import { useDispatch } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles, Button } from "@material-ui/core";

import Form from "../Form";
import {
  loginFormFields,
  signUpFormFields,
  forgotPasswordFields,
} from "../../data";

import { loadLogin, loadSignUp, loadForgotPassword } from "../../actions";

const useStyles = makeStyles(() => ({
  formContainer: {
    margin: "auto",
    marginTop: "5vh",
    display: "flex",
    justifyContent: "space-evenly",
    marginBottom: "3vh",
  },
  keepmesigned: {
    padding: "4%",
    color: "white",
  },
  labelSignedIn: {
    padding: "0 8px",
  },
  forgotPassword: {
    color: "blue",
    textDecoration: "underline",
    cursor: "pointer",
    display: "inline-block",
  },
}));

const SignUpAndLogin = ({ handleSubmit }) => {
  const classes = useStyles();
  const [showForm, setShowForm] = useState("login");

  const dispatch = useDispatch();

  const keepMeSignedIn = () => {
    return (
      <div className={classes.keepmesigned}>
        <label className={classes.labelSignedIn} htmlFor='signedIn'>
          Keep Signed In
        </label>
        <Field
          name='signedIn'
          id='signedIn'
          component='input'
          type='checkbox'
        />
      </div>
    );
  };

  const forgotPasswordLink = () => {
    return (
      <>
        <p
          onClick={() => setShowForm("forgotPassword")}
          className={classes.forgotPassword}
          href='/forgot'>
          Forgot Password ?
        </p>
        <br />
      </>
    );
  };

  const onSubmitForm = () => {
    if (showForm === "login") {
      dispatch(loadLogin());
    }
    if (showForm === "forgotPassword") {
      dispatch(loadForgotPassword());
    }
    if (showForm === "signup") {
      dispatch(loadSignUp());
    }
  };

  const handleFormSelection = () => {
    if (showForm === "login") {
      return loginFormFields;
    }
    if (showForm === "forgotPassword") {
      return forgotPasswordFields;
    }
    if (showForm === "signup") {
      return signUpFormFields;
    }
  };

  const handleButtonShow = () => {
    if (showForm === "login") {
      return "Login";
    }
    if (showForm === "forgotPassword") {
      return "Continue";
    }
    if (showForm === "signup") {
      return "Sign Up";
    }
  };

  return (
    <>
      <CssBaseline />
      <Container className={classes.formContainer} maxWidth='md'>
        <Button onClick={() => setShowForm("login")} variant='contained'>
          Login
        </Button>
        <Button
          onClick={() => setShowForm("signup")}
          variant='contained'
          color='primary'>
          Sign Up
        </Button>
      </Container>

      <Form
        handleSubmit={handleSubmit}
        onSubmitFormValues={onSubmitForm}
        formSelected={handleFormSelection()}
        buttonToShow={handleButtonShow()}
        signedInOption={showForm === "login" ? keepMeSignedIn() : ""}
        forgotPasswordLink={showForm === "login" ? forgotPasswordLink() : ""}
        authForm={true}
      />
    </>
  );
};

const reduxFormWrapper = reduxForm({
  form: "SignUpOrLogin",
})(SignUpAndLogin);

export default reduxFormWrapper;
