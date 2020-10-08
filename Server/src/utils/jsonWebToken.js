import { verify, sign } from "jsonwebtoken";
import dotenvConfig from "../config/dotenvConfig";

dotenvConfig();

export const generateJWToken = (payload, expiresIn = "24h") => {
  return new Promise((resolve, reject) => {
    sign(
      payload,
      process.env.JWT_PRIVATE_KEY,
      expiresIn === "infinite"
        ? {}
        : {
            algorithm: "HS256",
            expiresIn,
          },
      (err, encoded) => {
        if (err) reject(err);
        resolve(encoded);
      }
    );
  });
};

export const verifyJWToken = (token) => {
  return new Promise((resolve, reject) => {
    const verifyStatus = verify(token, process.env.JWT_PRIVATE_KEY);
    if (verifyStatus) return resolve(verifyStatus);
    reject("Token is Invalid");
  });
};
