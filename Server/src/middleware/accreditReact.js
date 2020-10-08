// Don't Edit This File
// This is Exclusive for React App Only.

export const accreditReact = (req, res, next) => {
  res.status(200).json({
    message: true,
    userId: req.user._id,
  });
};
