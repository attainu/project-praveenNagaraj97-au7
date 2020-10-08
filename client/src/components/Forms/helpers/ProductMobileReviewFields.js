import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { ShowRating } from "../../Rating";
import UploadedImageViewer from "../../UploadedImageViewer";
import { addMobileReview } from "../../../api";
import {
  globalSuccesMessenger,
  globalFailureMessenger,
  loadNewProductReview,
} from "../../../actions";

import reviewFieldchecker from "./reviewFieldchecker";

export const ProductMobileReview = ({ productReviewDetail: { productId } }) => {
  const [faceRecognition, setFaceRecognition] = useState(5);
  const [cameraQuality, setCameraQuality] = useState(5);
  const [pictureQuality, setPictureQuality] = useState(5);
  const [screenQuality, setScreenQuality] = useState(5);
  const [soundQuality, setSoundQuality] = useState(5);
  const [batteryLife, setBatteryLife] = useState(5);
  const [valueForMoney, setValueForMoney] = useState(5);
  const [reviewImages, setReviewImages] = useState([]);
  const [processedImages, setProcessedImages] = useState([]);
  const [reviewImageLimitBreach, setImageLimitBreach] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [disableSubmit, setSubmitbutton] = useState(false);

  const dispatch = useDispatch();

  // Looper
  const mobileReviewFields = [
    {
      title: "Face Recognition",
      value: faceRecognition,
      setter: setFaceRecognition,
      eleName: "faceRecognition",
    },
    {
      title: "Camera Quality",
      value: cameraQuality,
      setter: setCameraQuality,
      eleName: "cameraQuality",
    },
    {
      title: "Picture Quality",
      value: pictureQuality,
      setter: setPictureQuality,
      eleName: "pictureQuality",
    },
    {
      title: "Screen Quality",
      value: screenQuality,
      setter: setScreenQuality,
      eleName: "screenQuality",
    },
    {
      title: "Sound Quality",
      value: soundQuality,
      setter: setSoundQuality,
      eleName: "soundQuality",
    },
    {
      title: "Battery Life ",
      value: batteryLife,
      setter: setBatteryLife,
      eleName: "batteryLife",
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

  const uploadMobileReview = () => {
    setSubmitbutton(true);
    if (!reviewFieldchecker(title, description, dispatch)) {
      setSubmitbutton(false);
      return;
    }

    const mobileReviewFormData = new FormData();

    for (let each of mobileReviewFields) {
      mobileReviewFormData.append(each.eleName, each.value);
    }

    if (processedImages.length > 0 && title && description) {
      for (let i = 0; i < processedImages.length; i++) {
        mobileReviewFormData.append("productReviewImage", processedImages[i]);
      }
    }

    if (title && description) {
      mobileReviewFormData.append("title", title);
      mobileReviewFormData.append("description", description);
    }

    mobileReviewFormData.append("productId", productId);

    addMobileReview(mobileReviewFormData)
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
            err.response.data.message ===
            "MobileReview validation failed: userId: You can only review once"
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
        {mobileReviewFields.map(({ title, value, setter, eleName }, index) => {
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
          <button type='submit' onClick={uploadMobileReview}>
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
