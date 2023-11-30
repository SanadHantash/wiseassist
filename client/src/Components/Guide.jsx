import React from "react";

function Guide() {
  return (
    <section>
      <div
        class=" text-indigo-950 py-8"
        style={{ backgroundColor: "#F7F1EE " }}
      >
        <div class="container mx-auto  mb-10 flex flex-col items-start md:flex-row my-12 md:my-24">
          <div class="flex flex-col w-full sticky md:top-36 lg:w-1/3 mt-2 md:mt-12 px-8">
            <p class="text-3xl font-bold md:text-4xl leading-normal md:leading-relaxed mb-2">
              Our Services
            </p>
            <p class="text-sm md:text-base text-indigo-950 mb-4">
              Elevate your online presence with our comprehensive suite of
              services. Our skilled team specializes in web development,
              creating modern, responsive websites tailored to your unique
              business needs.
            </p>
            <button class="bg-indigo-950 mr-auto hover:text-indigo-950 text-white rounded shadow hover:shadow-lg py-2 px-4 border text-indigo-950 hover:bg-white">
              Explore Now
            </button>
          </div>
          <div class="ml-0 md:ml-12 lg:w-2/3 sticky">
            <div class="container mx-auto w-full h-full">
              <div class="relative wrap overflow-hidden p-10 h-full">
                <div
                  class="border-2-2 border-yellow-555 absolute h-full border"
                  style={{
                    right: "50%",
                    border: "2px solid #10184b",
                    borderRadius: "1%",
                  }}
                ></div>
                <div
                  class="border-2-2 border-yellow-555 absolute h-full border"
                  style={{
                    right: "50%",
                    border: "2px solid #10184b",
                    borderRadius: "1%",
                  }}
                ></div>
                <div class="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                  <div class="order-1 w-5/12"></div>
                  <div class="order-1 w-5/12 px-1 py-4 text-right">
                    <h4 class="mb-3 font-bold text-lg md:text-2xl">
                      Digital Literacy Training
                    </h4>
                    <p class="text-sm md:text-base leading-snug text-indigo-950 text-opacity-100">
                      Provide training and resources to improve digital
                      literacy, covering topics like using social media, online
                      shopping, and video conferencing.
                    </p>
                  </div>
                </div>
                <div class="mb-8 flex justify-between items-center w-full right-timeline">
                  <div class="order-1 w-5/12"></div>
                  <div class="order-1  w-5/12 px-1 py-4 text-left">
                    <h4 class="mb-3 font-bold text-lg md:text-2xl">
                      Mobile Apps Assistance
                    </h4>
                    <p class="text-sm md:text-base leading-snug text-indigo-950 text-opacity-100">
                      Help seniors install, use, and troubleshoot mobile
                      applications, including health and wellness apps.
                    </p>
                  </div>
                </div>
                <div class="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                  <div class="order-1 w-5/12"></div>
                  <div class="order-1 w-5/12 px-1 py-4 text-right">
                    <h4 class="mb-3 font-bold text-lg md:text-2xl">
                      Tech Workshops and Webinars
                    </h4>
                    <p class="text-sm md:text-base leading-snug text-indigo-950 text-opacity-100">
                      Host online or in-person workshops and webinars to teach
                      specific tech skills and answer user questions.
                    </p>
                  </div>
                </div>

                <div class="mb-8 flex justify-between items-center w-full right-timeline">
                  <div class="order-1 w-5/12"></div>

                  <div class="order-1  w-5/12 px-1 py-4">
                    <h4 class="mb-3 font-bold  text-lg md:text-2xl text-left">
                      Community And Social interaction
                    </h4>
                    <p class="text-sm md:text-base leading-snug text-indigo-950 text-opacity-100">
                      Foster a sense of community through forums, social groups,
                      and connections with other seniors on similar tech
                      journeys.
                    </p>
                  </div>
                </div>
              </div>
              <img
                class="mx-auto -mt-36 md:-mt-36"
                src="https://user-images.githubusercontent.com/54521023/116968861-ef21a000-acd2-11eb-95ac-a34b5b490265.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Guide;
