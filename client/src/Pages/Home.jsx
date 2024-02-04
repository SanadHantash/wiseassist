import React, { useEffect } from "react";

import Hero from "../Components/Hero";

import Cards from "../Components/Cards";
import RecentWorkshops from "../Components/RecentWorkshops";
import Guide from "../Components/Guide";

import ChatBot from "../Components/ChatBot";
import Testimonials from "../Components/Testimonials";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
    <></>;
  }, []);
  return (
    <div>
      <Hero />
      <Cards />
      <RecentWorkshops />
      <Guide />
      <Testimonials />
      <ChatBot />
    </div>
  );
}

export default Home;
