import React, { useEffect } from "react";

import "../../styles/productAdvertisement.scss";

const ProductAdvertisementBoard = () => {
  const advertisement = "https://i.ytimg.com/vi/cVEemOmHw9Y/maxresdefault.jpg";

  useEffect(() => {}, []);

  return (
    <div className='advertisement'>
      {advertisement ? <img src={advertisement} alt='adverstisement' /> : ""}
    </div>
  );
};

export default ProductAdvertisementBoard;
