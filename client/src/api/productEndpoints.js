import { apiBaseEndpoint } from "./index";

export const getAllCategoriesEndpoint = async () => {
  return await apiBaseEndpoint.get(`/category/getAllCategories`);
};

export const getLatestProductsOnStore = async () =>
  await apiBaseEndpoint.get(
    `/product/getProducts?sort=-createdAt&page=1&limit=6`
  );

export const getProductsBasedOnQuery = async (query) => {
  return await apiBaseEndpoint.get(
    `/product/getProducts${query}&sort=-createdAt`
  );
};

export const getProductsDetailsForGrpIdsEndPoint = async (data) => {
  return await apiBaseEndpoint.post(
    `/product/getProductDetailsWithProductIds`,
    data
  );
};

export const getProductDetailEndPoint = async (id) => {
  return await apiBaseEndpoint.get(`/product/getProduct`, {
    params: { id },
  });
};

export const getListOfProductReviewsEndPoint = async (id) => {
  return await apiBaseEndpoint.get(
    `/product_review/getReviews?productId=${id}&sort=-createdAt&page=1&limit=6`
  );
};

export const reviewFoundHelpfulEndpoint = async (authToken, reviewId) => {
  return await apiBaseEndpoint.post(
    `/product_review/foundHelpful/true`,
    { reviewId },
    {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    }
  );
};
