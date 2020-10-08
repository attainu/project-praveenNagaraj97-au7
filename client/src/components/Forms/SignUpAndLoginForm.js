import React from "react";
import { Field } from "redux-form";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";

export const SignUpAndLoginForm = ({
  signedInOption,
  handleSubmit,
  onSubmitFormValues,
  formSelected,
  buttonToShow,
  forgotPasswordLink,
}) => {
  const loading = useSelector(({ loader: { authLoading } }) => authLoading);

  return (
    <div className='form-container'>
      <form
        style={{ padding: "8% 0%" }}
        autoComplete={process.env.NODE_ENV === "development" ? "on" : "off"}
        onSubmit={handleSubmit(onSubmitFormValues)}
        noValidate>
        <>
          {formSelected.map(({ htmlFor, label, type }, index) => {
            return (
              <div className='form-input' key={index}>
                <label className='form-input__label' htmlFor={htmlFor}>
                  {label}
                </label>
                <Field
                  className='form-input__field'
                  name={htmlFor}
                  component='input'
                  type={type}
                />
              </div>
            );
          })}
          {!loading ? signedInOption : ""}
          {!loading ? forgotPasswordLink : ""}

          {loading ? (
            <img
              className='loading-spinner'
              src='https://storage.googleapis.com/lexa-component-styles/loading.gif'
              alt='Loading...'
            />
          ) : (
            <Button
              style={{ backgroundColor: "white" }}
              disabled={loading}
              type='submit'>
              {buttonToShow}
            </Button>
          )}
        </>
      </form>
    </div>
  );
};
