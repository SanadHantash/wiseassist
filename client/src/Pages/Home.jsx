import React, { useState } from "react";

import Hero from "../Components/Hero";
// import OurPurpose from "../Components/OurPurpose";
// import OurServices from "../Components/OurServices";
import Cards from "../Components/Cards";
import RecentWorkshops from "../Components/RecentWorkshops";
import Guide from "../Components/Guide";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function Home() {
  const [isSignIn, setSignin] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  return (
    <div>
      <Header
        setSignin={setSignin}
        setAdmin={setAdmin}
        isAdmin={isAdmin}
        isSignIn={isSignIn}
      />
      <Hero />
      <Cards />
      <RecentWorkshops />
      <Guide />

      <Footer />
    </div>
  );
}

export default Home;
