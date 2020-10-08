import { apiBaseEndpoint } from "../index";

export const getTopLevelAdvertiseEndpoint = async () =>
  await apiBaseEndpoint.get("/advertise/getTopLevelAdvertise");
