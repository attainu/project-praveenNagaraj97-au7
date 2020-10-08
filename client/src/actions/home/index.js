import { RECENT_VIEWED } from "../../constants";

export const recentlyViewedItems = (data) => ({
  type: RECENT_VIEWED,
  data,
});
