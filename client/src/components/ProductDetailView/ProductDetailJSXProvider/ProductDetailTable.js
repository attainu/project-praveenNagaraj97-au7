import React from "react";

import "../../../styles/productDetailTable.scss";

const ProductDetailTable = ({ productDetails }) => {
  if (!productDetails) return <></>;

  return (
    <table className='product-detail-table'>
      <tbody>
        {Object.keys(productDetails).map((each) => {
          return (
            <tr key={each}>
              <td className='product-detail-table__data'>{each}</td>
              <td className='product-detail-table__data'>
                {productDetails[each]}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductDetailTable;
