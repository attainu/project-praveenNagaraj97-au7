import React from "react";

import "../styles/uploadedImageViewer.scss";

const UploadedImageViewer = ({ images, imageRemover }) => {
  if (!images) {
    return <></>;
  }

  return (
    <div className='uploaded-image-viewer'>
      {images.map((each) => {
        return (
          <img
            key={each.name}
            src={(window.URL || window.webkitURL).createObjectURL(each)}
            alt='review-images'
            onClick={() => imageRemover(each)}
          />
        );
      })}
    </div>
  );
};

export default UploadedImageViewer;
