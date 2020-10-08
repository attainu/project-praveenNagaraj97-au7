import React, { useState } from "react";
import { connect } from "react-redux";

import UserDetail from "../User/UserDetail";
import { loadUser } from "../../actions";

import "../../styles/settings.scss";

const Settings = ({ loadUser, userDetail }) => {
  const [showUserData, setShowUserData] = useState(false);

  const handleManageData = () => {
    loadUser();

    setShowUserData(!showUserData);
  };

  return (
    <>
      <div className='settings-container'>
        <h1>Manage your Lexa Settings</h1>
        <p>
          Manage your info, privacy and security to make Lexa work better for
          you
        </p>
        <hr style={{ width: "80%" }} />
        <div className='settings-container__options'>
          <div className='settings-container__personal-info settings-container_box'>
            <h3>Personal info</h3>
            <p>Manage your personal info.</p>
            <button
              className='settings-container_btn'
              onClick={handleManageData}>
              Manage your data
            </button>
          </div>
        </div>
      </div>
      {showUserData ? (
        <div className='settings-container_show-user-data'>
          <UserDetail userDetail={userDetail} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(loadUser()),
});

const mapStateToProps = ({ userDetails }) => ({ userDetail: userDetails.user });

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
