import React from "react";
import { Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";

const DropdownMenu = (props) => {
  const { navItems } = props;
  const navItemsWithKey = [...navItems];

  navItemsWithKey.forEach((item, index) => {
    item.key = index;
    item.text = item.name;
    item.value = item.name;
    item.as = Link;
    item.to = item.route;
  });

  return (
    <Dropdown
      style={{ borderRadius: "20px", width: "35vw", height: "2vh" }}
      placeholder='Options'
      fluid
      selection
      options={navItemsWithKey}
    />
  );
};

export default DropdownMenu;
