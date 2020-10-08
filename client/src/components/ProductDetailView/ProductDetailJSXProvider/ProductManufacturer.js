import React from "react";

import "../../../styles/productManufacturer.scss";

const ProductManufacturer = ({ manufacturer }) => {
  if (!manufacturer) return <></>;
  return (
    <>
      <div className='product-manufacturer-container'>
        <h3>Manufacturer Details</h3>
        <div className='product-manufacturer__details'>
          <p>Manufacturer : {manufacturer.companyName}</p>
          <p>Country Of Origin : {manufacturer.countryofOrigin}</p>
        </div>
      </div>
    </>
  );
};

export default ProductManufacturer;
