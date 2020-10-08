import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "../styles/notifier.scss";

const AlertWithImage = ({ showAlert, globalSuccessWithImg }) => {
  if (showAlert && globalSuccessWithImg !== null)
    return (
      <div style={{ color: "white" }} className='show-success-notify-with__img'>
        <img
          className='show-success-notify__image'
          height='70px'
          src={globalSuccessWithImg.image}
          alt='tes'
        />
        <div className='show-success__message'>
          {globalSuccessWithImg.success}
        </div>
      </div>
    );

  return <></>;
};

const Notifer = ({ error, success, globalSuccessWithImg }) => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("grey");

  useEffect(() => {
    const colourCode = {
      SUCCESS: "rgba(95, 236, 52, 0.932)",
      FAILURE: "rgba(238, 91, 91, 0.932)",
    };

    if (success !== null) {
      setOpen(true);
      setTheme(colourCode.SUCCESS);
    }

    if (error !== null) {
      setOpen(true);
      setTheme(colourCode.FAILURE);
    }

    if (globalSuccessWithImg !== null && globalSuccessWithImg.image !== null) {
      setOpen(true);
      setTheme(colourCode.SUCCESS);
    }

    const timeOutId = setTimeout(() => {
      setOpen(false);
      setTheme("grey");
    }, 3100);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [success, error, globalSuccessWithImg]);

  if (globalSuccessWithImg !== null && globalSuccessWithImg.image !== null) {
    return (
      <AlertWithImage
        globalSuccessWithImg={globalSuccessWithImg}
        showAlert={open}
      />
    );
  }
  return (
    <>
      {open && (success || error) ? (
        <div style={{ backgroundColor: theme }} className='notifier-container'>
          <div className='notifier__message'>{success || error}</div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const mapStateToProps = ({
  userAuthorization: { authFailueMessage = null, authSuccessMessage = null },
  globalErrorOrSuccessMessage: {
    globalError = null,
    globalSuccess = null,
    globalSuccessWithImg = null,
  },
}) => ({
  error: authFailueMessage || globalError,
  success: authSuccessMessage || globalSuccess,
  globalSuccessWithImg,
});

export default connect(mapStateToProps, null)(Notifer);
