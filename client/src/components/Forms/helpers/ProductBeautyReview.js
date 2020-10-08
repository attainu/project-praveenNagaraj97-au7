import React, { useEffect, useState } from "react";

import { ShowRating } from "../../Rating";
import UploadedImageViewer from "../../UploadedImageViewer";
import { addBeautyReview } from "../../../api";
import reviewFieldchecker from "./reviewFieldchecker";
import { useDispatch } from "react-redux";
import {
  globalFailureMessenger,
  globalSuccesMessenger,
  loadNewProductReview,
} from "../../../actions";

export const ProductBeautyReview = ({ productReviewDetail: { productId } }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reviewImages, setReviewImages] = useState([]);
  const [disableSubmit, setSubmitbutton] = useState(false);
  const [processedImages, setProcessedImages] = useState([]);
  const [reviewImageLimitBreach, setImageLimitBreach] = useState(false);

  const [valueForMoney, setValueForMoney] = useState(5);
  const [freshness, setFreshness] = useState(5);
  const [packaging, setPackaging] = useState(5);

  const dispatch = useDispatch();

  // Looper
  const reviewFields = [
    {
      title: "Freshness",
      value: freshness,
      setter: setFreshness,
      eleName: "freshness",
    },

    {
      title: "Packaging",
      value: packaging,
      setter: setPackaging,
      eleName: "packaging",
    },

    {
      title: "Value For Money",
      value: valueForMoney,
      setter: setValueForMoney,
      eleName: "valueForMoney",
    },
  ];

  useEffect(() => {
    setTitle("");
    setDescription("");
  }, []);

  useEffect(() => {
    const images = [];
    for (let image of reviewImages) {
      images.push(image);
    }
    if (images.length > 5) {
      setImageLimitBreach(true);
      return;
    } else {
      setImageLimitBreach(false);
    }
    setProcessedImages(images);
  }, [reviewImages]);

  const imageDeselecterHandle = (image) => {
    const images = [...processedImages];
    const indexOfDeselectImage = images.indexOf(image);
    images.splice(indexOfDeselectImage, 1);
    setProcessedImages(images);
  };

  const uploadReview = () => {
    setSubmitbutton(true);

    if (!reviewFieldchecker(title, description, dispatch)) {
      setSubmitbutton(false);
      return;
    }

    const reviewFormData = new FormData();

    for (let each of reviewFields) {
      reviewFormData.append(each.eleName, each.value);
    }

    if (processedImages.length > 0 && title && description) {
      for (let i = 0; i < processedImages.length; i++) {
        reviewFormData.append("productReviewImage", processedImages[i]);
      }
    }

    if (title && description) {
      reviewFormData.append("title", title);
      reviewFormData.append("description", description);
    }

    reviewFormData.append("productId", productId);

    addBeautyReview(reviewFormData)
      .then((res) => {
        dispatch(globalSuccesMessenger("Thanks for feedback"));

        setSubmitbutton(false);
        dispatch(loadNewProductReview(res.data.details));
        setTimeout(() => {
          dispatch(globalSuccesMessenger(null));
        }, 3200);
      })
      .catch((err) => {
        try {
          if (
            err.response.data.message.split("userId: ")[1] ===
            "You can only review once"
          )
            dispatch(
              globalFailureMessenger(
                "Sorry you are allowed to review only once"
              )
            );
          setSubmitbutton(false);
          setTimeout(() => {
            dispatch(globalFailureMessenger(null));
          }, 3200);
        } catch (error) {
          dispatch(globalFailureMessenger("Something went wrong"));
          setSubmitbutton(false);
          setTimeout(() => {
            dispatch(globalFailureMessenger(null));
          }, 3200);
          setSubmitbutton(false);
        }
      });
  };

  return (
    <div className='product-review-container__input'>
      <div className='product-review__input'>
        <label htmlFor='reviewTitle'>
          Title <span className='optional-review-tab'>(required)</span>
        </label>
        <input
          type='input'
          name='reviewTitle'
          onChange={(ev) => setTitle(ev.target.value)}
        />
      </div>
      <div className='product-review__input'>
        <label htmlFor='reviewDescription'>
          Description <span className='optional-review-tab'>(required)</span>
        </label>
        <textarea
          name='reviewDescription'
          onChange={(ev) => setDescription(ev.target.value)}
        />
      </div>

      <>
        {reviewFields.map(({ title, value, setter, eleName }, index) => {
          return (
            <div key={index} className='product-review-input__box'>
              <p>{title}</p>
              <ShowRating
                value={value}
                name={eleName}
                input={true}
                getValue={(value) => {
                  setter(value);
                }}
              />
            </div>
          );
        })}
      </>

      <div className='product-review__imageUploader'>
        <h3>
          Add Images <span className='optional-review-tab'>(optional)</span>
        </h3>
        <p>Shoppers find images more helpful than text alone.</p>
        {processedImages.length > 0 ? (
          <UploadedImageViewer
            images={processedImages}
            imageRemover={imageDeselecterHandle}
          />
        ) : (
          ""
        )}

        <div className='review-image-selector'>
          <p>Select Images</p>
          <input
            name='review-image'
            type='file'
            multiple
            accept='.png, .jpg, .jpeg'
            onChange={(ev) => {
              setReviewImages(ev.target.files);
            }}
          />
        </div>

        {reviewImageLimitBreach ? (
          <p className='images-warning'>Upto 5 Images are only allowed</p>
        ) : (
          ""
        )}

        {!disableSubmit ? (
          <button type='submit' onClick={uploadReview}>
            Submit
          </button>
        ) : (
          <h6>Loading...</h6>
        )}
      </div>
      <hr style={{ width: "65%" }} />
    </div>
  );
};
