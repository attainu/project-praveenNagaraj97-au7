import React from "react";

import "../../styles/home.scss";
import { scrollToTop } from "../../utils/scrollTopOnRouteChange";
// import BlogAboutProduct from "./BlogAboutProducts";
// import LevelOneAds from "./LevelOneAds";
import RecentSearchedItems from "./RecentSearchedItems";
import PetSection from "./PetSection";
import NewOnStore from "./NewOnStore";

const HomePage = () => {
  scrollToTop();
  return (
    <>
      <h1 className='home-page-lexa-tagline'>
        <span className='a1'>Everything you love,</span>
        <span className='a2'>is online.</span>
      </h1>

      {/* Link To Pet section */}
      <PetSection />

      {/* New Items On Store */}
      <NewOnStore />

      {/* Recent searched items /last 4 */}
      <RecentSearchedItems />
    </>
  );
};

export default HomePage;
