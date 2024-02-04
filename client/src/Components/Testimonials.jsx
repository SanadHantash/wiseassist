import React, { useEffect, useState, useRef } from "react";
import KeenSlider from "keen-slider";
import axios from "axios";
import "keen-slider/keen-slider.min.css";

function Testimonials() {
  const sliderRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/testimonials")
      .then((response) => {
        if (response.data.success) {
          setTestimonials(response.data.testimonials);
        } else {
          console.error("Failed to fetch testimonials.");
        }
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
      });
  }, []);

  useEffect(() => {
    if (sliderRef.current && testimonials.length > 0) {
      const keenSlider = new KeenSlider(sliderRef.current, {
        loop: true,
        slides: {
          origin: "center",
          perView: 1.25,
          spacing: 16,
        },
        breakpoints: {
          "(min-width: 1024px)": {
            slides: {
              origin: "auto",
              perView: 2.5,
              spacing: 32,
            },
          },
        },
      });

      const keenSliderPrevious = document.getElementById(
        "keen-slider-previous"
      );
      const keenSliderNext = document.getElementById("keen-slider-next");

      if (keenSliderPrevious && keenSliderNext) {
        keenSliderPrevious.addEventListener("click", () => {
          if (keenSlider) {
            keenSlider.prev();
          }
        });
        keenSliderNext.addEventListener("click", () => {
          if (keenSlider) {
            keenSlider.next();
          }
        });
      }

      return () => {
        if (keenSlider) {
          keenSlider.destroy();
        }
      };
    }
  }, [sliderRef, testimonials]);
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/keen-slider.min.css"
      ></link>
      <section class="bg-white">
        <div class="mx-auto max-w-[1340px] px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
          <div class="max-w-7xl items-end justify-between sm:flex sm:pe-6 lg:pe-8">
            <h2 class="max-w-xl text-4xl font-bold tracking-tight text-indigo-950 sm:text-5xl">
              Read trusted reviews from our customers
            </h2>

            <div class="mt-8 flex gap-4 lg:mt-0">
              <button
                aria-label="Previous slide"
                id="keen-slider-previous"
                class="rounded-full border border-indigo-950 p-3 text-indigo-950 transition hover:bg-indigo-950 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 rtl:rotate-180"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <button
                aria-label="Next slide"
                id="keen-slider-next"
                class="rounded-full border border-indigo-950 p-3 text-indigo-950 transition hover:bg-indigo-950 hover:text-white"
              >
                <svg
                  class="h-5 w-5 rtl:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="-mx-6 mt-8 lg:col-span-2 lg:mx-0">
            <div id="keen-slider" class="keen-slider" ref={sliderRef}>
              {testimonials.map((testimoniall, index) => (
                <div key={index} class="keen-slider__slide">
                  <blockquote class="flex h-full flex-col justify-between bg-[#d5c5df] rounded-lg p-6 shadow-lg sm:p-8 lg:p-12">
                    <div>
                      <p class="text-2xl font-bold text-indigo-950 sm:text-3xl">
                        {testimoniall.user_name}
                      </p>
                      <p class="mt-6 text-lg font-medium text-black">
                        {testimoniall.testimonial}
                      </p>
                    </div>

                    <footer class="mt-4 text-sm font-medium text-black sm:mt-6">
                      &mdash; {testimoniall.user_name}
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonials;
