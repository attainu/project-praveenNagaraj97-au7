import React from "react";
import { Menu, Segment, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import ProductSearchBar from "../Product/ProductSearchBar";
import DropdownMenu from "../DropdownMenu";
import CartIcon from "../Product/CartIcon";
import UserMenu from "../User/UserMenu";

import "../../styles/topHeader.scss";
import { useWindowSize } from "../../utils/useWindowResizeHook";
import history from "../../history";

const Header = (props) => {
  const renderMobileView = () => {
    return <DropdownMenu navItems={props.navItems} />;
  };
  const { navItems } = props;
  if (useWindowSize().width > 702)
    return (
      <Segment inverted className='top-header-menu'>
        <Menu inverted secondary className='top-header'>
          <div
            onClick={() => history.push("/")}
            className='top-header-brand__name'>
            Lexa
          </div>
          {navItems.map(({ name, icon, route }) => {
            return (
              <Link to={route} className='nav-links' key={name}>
                <Button className='nav-links' animated>
                  <Button.Content hidden>{name}</Button.Content>
                  <Button.Content visible>
                    <Icon name={icon} />
                  </Button.Content>
                </Button>
              </Link>
            );
          })}

          <ProductSearchBar />
          <CartIcon />
          <UserMenu />
        </Menu>
      </Segment>
    );

  return (
    <>
      <div onClick={() => history.push("/")} className='top-header-brand__name'>
        Lexa
      </div>
      <Segment inverted className='top-header-mobile-menu'>
        <Menu inverted secondary className='top-header-mobile'>
          {renderMobileView()}
          <ProductSearchBar />
          <CartIcon />
          <UserMenu />
        </Menu>
      </Segment>
    </>
  );
};

export default Header;
