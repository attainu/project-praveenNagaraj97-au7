import React, { useEffect } from "react";

import "../styles/user.scss";
import { scrollToTop } from "../utils/scrollTopOnRouteChange";

import { SignUpAndLoginForm, ResetPasswordForm } from "./Forms";

const Form = (props) => {
  const {
    handleSubmit,
    onSubmitFormValues,

    // User Auth
    formSelected,
    buttonToShow,
    signedInOption,
    forgotPasswordLink,
    authForm,

    // resetForm
    resetForm,
    resetFormFields,
  } = props;

  useEffect(() => {
    scrollToTop();
  });

  if (authForm) {
    return (
      <SignUpAndLoginForm
        signedInOption={signedInOption}
        handleSubmit={handleSubmit}
        onSubmitFormValues={onSubmitFormValues}
        formSelected={formSelected}
        buttonToShow={buttonToShow}
        forgotPasswordLink={forgotPasswordLink}
      />
    );
  } else if (resetForm) {
    return (
      <ResetPasswordForm
        handleSubmit={handleSubmit}
        onSubmitFormValues={onSubmitFormValues}
        resetFormFields={resetFormFields}
      />
    );
  } else {
    return (
      <h1 style={{ color: "white", textAlign: "center" }}>
        Something went Wrong
      </h1>
    );
  }
};

export default Form;
