import { verifyJWToken } from "../../utils/jsonWebToken";

export default async (req, context, auth_token = null) => {
  const output = { error: null, user: null };
  let authToken;

  if (auth_token === null && req !== null) {
    if (!req.headers.authorization)
      return { ...output, error: "Please Login First" };

    if (req.headers.authorization) {
      if (!req.headers.authorization.startsWith("Bearer")) {
        return { ...output, error: "Bearer token Not Found" };
      }
    }
    authToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    authToken = auth_token.split("Bearer ")[1];
  }

  const tokenDetails = await verifyJWToken(authToken);
  const user = await context.findById(tokenDetails.id);
  // if user account is deleted
  if (!user) return { ...output, error: "Authentication Error Invalid Token" };

  return { ...output, user };
};
