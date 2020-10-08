import React from "react";

import "../../../styles/productBrief.scss";

const ProductBrief = ({ productDescription, productBoards }) => {
  if (!productDescription) return <></>;

  return (
    <>
      <h3 className='from-manufacturer-header'>From Manufacturer</h3>
      <p className='from-manufacturer__brief'>{productDescription}</p>

      {/* Product Boards */}
      {productBoards ? (
        <div className='product-based-boards'>
          {productBoards.map((board) => {
            return (
              <img key={board} width='100%' src={board} alt='ProductBoard' />
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductBrief;
