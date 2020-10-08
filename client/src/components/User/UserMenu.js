import React, { useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";

import history from "../../history";
import { loadLogout } from "../../actions";

const UserMenu = ({ userAccredited, loadLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirectToAuth = () => {
    handleClose();
    history.push("/user_auth");
  };

  const onClickLogout = () => {
    handleClose();
    loadLogout();
  };

  const handleSettings = () => {
    handleClose();
    history.push("/settings");
  };

  useEffect(() => {
    if (userAccredited) {
      if (history.location.pathname === "/user_auth") history.goBack();
    }
  }, [userAccredited]);

  return (
    <>
      <Button
        style={{ width: "12vw" }}
        aria-controls='simple-menu'
        aria-haspopup='true'
        className='nav-links'
        onClick={handleClick}
        animated>
        <Button.Content hidden>Account</Button.Content>
        <Button.Content visible>
          <Icon name='user' />
        </Button.Content>
      </Button>

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted={true}
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {!userAccredited ? (
          <MenuItem onClick={redirectToAuth}>
            Login/ Create New Account
          </MenuItem>
        ) : (
          <div>
            <MenuItem onClick={handleSettings}>Settings</MenuItem>
          </div>
        )}

        {userAccredited ? (
          <MenuItem onClick={onClickLogout}>LogOut</MenuItem>
        ) : (
          ""
        )}
      </Menu>
    </>
  );
};

const mapStateToProps = ({ userAccredited: { isSigned = false } }) => ({
  userAccredited: isSigned,
});

const mapDispatchToProps = (dispatch) => ({
  loadLogout: () => dispatch(loadLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
