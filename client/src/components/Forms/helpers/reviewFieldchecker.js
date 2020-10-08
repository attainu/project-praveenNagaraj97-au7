import { globalFailureMessenger } from "../../../actions";

export default (title, description, dispatch) => {
  if (!title && !description) {
    dispatch(
      globalFailureMessenger(
        "Please Enter title and description for the review"
      )
    );

    setTimeout(() => {
      dispatch(globalFailureMessenger(null));
    }, 3200);

    return false;
  }

  if (!title && description) {
    dispatch(globalFailureMessenger("Please Enter title for review"));

    setTimeout(() => {
      dispatch(globalFailureMessenger(null));
    }, 3200);

    return false;
  }

  if (title && !description) {
    dispatch(globalFailureMessenger("Please Enter description for review"));

    setTimeout(() => {
      dispatch(globalFailureMessenger(null));
    }, 3200);

    return false;
  }

  if (title.length < 4) {
    dispatch(
      globalFailureMessenger("Review Title should be atlease 4 character long")
    );

    setTimeout(() => {
      dispatch(globalFailureMessenger(null));
    }, 3200);

    return false;
  }

  if (description.length < 10) {
    dispatch(
      globalFailureMessenger(
        "Review Description should be atlease 10 character long"
      )
    );

    setTimeout(() => {
      dispatch(globalFailureMessenger(null));
    }, 3200);
    return false;
  }

  return true;
};
