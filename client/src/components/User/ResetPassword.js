import React from "react";
import { reduxForm } from "redux-form";
import { useDispatch } from "react-redux";

import Form from "../Form";
import { resetFormFields } from "../../data";
import { loadResetPassword } from "../../actions";

const ResetPassword = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const onSubmitFormValues = () => dispatch(loadResetPassword());

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmitFormValues={onSubmitFormValues}
      resetForm={true}
      resetFormFields={resetFormFields}
    />
  );
};

const formWrapped = reduxForm({
  form: "resetForm",
})(ResetPassword);

export default formWrapped;
