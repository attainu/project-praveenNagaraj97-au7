import React from "react";
import Rating from "@material-ui/lab/Rating";

export const ShowRating = ({ value, name, input = false, getValue }) => {
  if (input)
    return (
      <Rating
        name={name}
        precision={0.5}
        value={value}
        onChange={(event) => {
          getValue(Number(event.target.value));
        }}
      />
    );

  return (
    <Rating
      name='simple-controlled'
      precision={0.5}
      readOnly={true}
      value={value}
    />
  );
};
