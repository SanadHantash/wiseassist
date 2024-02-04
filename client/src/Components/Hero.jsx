import React from "react";
// import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import hero1 from "../assets/hero.png";

function Hero() {
  const partners = [
    {
      title: "  100+",
      company: "Courses Available",
    },
    {
      title: " 70+",
      company: "Workshops Conducted",
    },
    {
      title: "200+",
      company: "Tech Tips Shared",
    },
  ];

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="py-8 lg:bg-gradient-to-r from-white via-white to-customPink md:bg-gradient-to-r from-white via-white to-customPink sm:bg-gradient-to-r from-white via-white to-customPink xs:bg-gradient-to-r from-white via-white to-customPink">
      <header className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-10 text-indigo-900 md:mx-auto md:flex-row md:items-center"></header>

      <div className="mx-auto px-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div className="lg:max-w-lg lg:pr-5">
            <div className="max-w-xl">
              <div className="flex flex-row flex-wrap">
                <h2 className="font_heading ml-4 mb-6 max-w-lg text-4xl leading-snug tracking-tight text-[#522883] sm:text-5xl sm:leading-snug md:max-w-xl">
                  Welcome to
                  <span className="inline-block ml-2 hero_font font-serif text-5xl text-white tracking-wider sm:text-6xl">
                    WiseAssist!
                  </span>
                </h2>
              </div>
              <p className="text-base ml-4 text-gray-700 sm:text-lg ">
                Thank you for choosing WiseAssist. We look forward to being your
                trusted partner on your tech journey. Let's navigate the digital
                landscape together!".
              </p>

              <div className="mt-8 sm:flex space-y-3 sm:space-y-0 sm:space-x-3">
                <Slider
                  {...settings}
                  className=" md:w-full sm:w-full xs:w-full"
                >
                  {partners.map((partner, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-xl border-4 border-[#522883] mr-4 bg-white shadow"
                    >
                      <div className="py-10 px-6">
                        <div className="flex items-center">
                          <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                            {partner.title}
                          </h3>
                          <span className="ml-3 text-base font-medium capitalize">
                            {partner.company}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
          <div className="relative text-[#522883] lg:ml-32 lg:w-1/2 hidden lg:block">
            <div className="border-b-8 border-b-[#522883] max-w-lg mx-auto mb-10">
              <img
                className="w-full h-full object-cover sm:object-contain"
                src={hero1}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
