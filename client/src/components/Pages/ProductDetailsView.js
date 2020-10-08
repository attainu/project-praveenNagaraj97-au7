import React from "react";

import {
  ProductMobileDetail,
  ProductComputersDetail,
  ProductElectronicsDetail,
  ProductBeautyDetail,
  ProductPetDetail,
  ProductsFashion,
  ProductKitchen,
  ProductFood,
} from "../ProductDetailView";
import history from "../../history";

const ProductDetailView = () => {
  const productCategory = history.location.pathname.split("/")[
    history.location.pathname.split("/").length - 3
  ];
  if (productCategory === "mobiles") return <ProductMobileDetail />;
  if (productCategory === "computers") return <ProductComputersDetail />;
  if (productCategory === "electronics") return <ProductElectronicsDetail />;
  if (productCategory === "beauty") return <ProductBeautyDetail />;
  if (productCategory === "pet") return <ProductPetDetail />;
  if (productCategory === "fashion") return <ProductsFashion />;
  if (productCategory === "kitchen") return <ProductKitchen />;
  if (productCategory === "food") return <ProductFood />;
  return <h1 style={{ color: "white" }}>Sorry Something went Wrong</h1>;
};

export default ProductDetailView;
