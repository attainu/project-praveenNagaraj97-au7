import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { userPasswordUpdate } from "../../actions";

import "../../styles/settings.scss";

const UserDetail = ({ userDetail }) => {
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const handlePasswordChange = () => {
    setShowPasswordFields(true);
  };

  const handlePasswordSubmit = () => {
    const data = {
      currentPassword: currentPassword || null,
      password: password || null,
      confirmPassword: confirmPassword || null,
    };

    dispatch(userPasswordUpdate(data));
    setShowPasswordFields(false);
    setPassword("");
    setCurrentPassword("");
    setConfirmPassword("");
  };

  if (userDetail)
    return (
      <div className='settings-user-details'>
        <table className='settings-user-detail-table'>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{userDetail.name.toUpperCase()}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <input
                  className='table-input'
                  type='email'
                  value={userDetail.email}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <td>
                <input
                  className='table-input'
                  type='email'
                  value={userDetail.phoneNumber}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <input
                  style={{
                    border: showPasswordFields ? "solid 1px" : "none",
                    borderRadius: "5px",
                  }}
                  onChange={(ev) => setCurrentPassword(ev.target.value)}
                  className='table-input'
                  type='password'
                  value={
                    !showPasswordFields ? "**************" : currentPassword
                  }
                  disabled={!showPasswordFields}
                />
                {!showPasswordFields ? (
                  <img
                    onClick={handlePasswordChange}
                    className='settings-user-detail-table__edit'
                    src={
                      "https://img.icons8.com/plasticine/50/000000/pencil.png"
                    }
                    alt='edit'
                  />
                ) : (
                  ""
                )}
              </td>
            </tr>

            {/* Show on password change button */}
            {showPasswordFields ? (
              <>
                <tr>
                  <td>New Password</td>
                  <td>
                    <input
                      onChange={(ev) => setPassword(ev.target.value)}
                      style={{
                        border: showPasswordFields ? "solid 1px" : "none",
                        borderRadius: "5px",
                      }}
                      value={password}
                      className='table-input'
                      type='password'
                    />
                  </td>
                </tr>
                <tr>
                  <td>Confirm Password</td>
                  <td>
                    <input
                      value={confirmPassword}
                      onChange={(ev) => setConfirmPassword(ev.target.value)}
                      style={{
                        border: showPasswordFields ? "solid 1px" : "none",
                        borderRadius: "5px",
                      }}
                      className='table-input'
                      type='password'
                    />
                    <img
                      onClick={handlePasswordSubmit}
                      className='settings-user-detail-table__edit'
                      src={
                        "https://img.icons8.com/color/48/000000/approve-and-update.png"
                      }
                      alt='edit'
                    />
                  </td>
                  <td>
                    <img
                      onClick={() => setShowPasswordFields(false)}
                      style={{
                        position: "relative",
                        bottom: "-6px",
                        width: "25px",
                        left: "10px",
                      }}
                      src='https://img.icons8.com/office/80/000000/cancel.png'
                      alt='cancel'
                    />
                  </td>
                </tr>
              </>
            ) : (
              <tr></tr>
            )}
          </tbody>
        </table>
      </div>
    );

  return <></>;
};

export default UserDetail;
