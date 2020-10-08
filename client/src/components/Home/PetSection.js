import React from "react";
import { useDispatch, useSelector } from "react-redux";
import history from "../../history";

import { loadGetProductsOnQuery, globalFailureMessenger } from "../../actions";

const PetSection = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    ({ productCategories: { categories } }) => categories
  );

  const selectCategoryOnClick = () => {
    if (categories) {
      const categoryId = categories.find(
        ({ categoryName }) => categoryName === "Pet"
      )._id;

      history.push(`/category/pet`);
      const query = `?categoryId=${categoryId}`;
      dispatch(loadGetProductsOnQuery(query));
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } else {
      dispatch(globalFailureMessenger("Sorry Something went wrong"));

      const timeID = setTimeout(() => {
        dispatch(globalFailureMessenger(null));
      }, 3200);
      return () => clearTimeout(timeID);
    }
  };

  return (
    <div onClick={selectCategoryOnClick} className='pet-section'>
      <div className='pet-section__description'>
        <h1>
          Accessories and food for your <span>furry friends</span>
        </h1>
        <h3>A true friend leaves paw prints on your heart</h3>
      </div>
      <div className='info-notify'>Buy Pet Food & Accessories</div>
    </div>
  );
};

export default PetSection;
