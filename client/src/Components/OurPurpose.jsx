import React from "react";

function OurPurpose() {
  return (
    <>
      <div
        class="container my-24 mx-auto md:px-6"
        style={{ backgroundColor: "#F7F1EE " }}
      >
        <section class="mb-32">
          <div class="flex flex-wrap">
            <div class="w-full shrink-0 grow-0 basis-auto md:w-2/12 lg:w-3/12">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).jpg"
                class="mb-6 w-full rounded-full shadow-lg dark:shadow-black/20"
                alt="Avatar"
              />
            </div>

            <div class="w-full mt-16 shrink-0 grow-0 basis-auto text-center md:w-10/12 md:pl-6 md:text-left lg:w-9/12">
              <h5 class="mb-6 text-xl font-semibold">Our Purpose</h5>

              <p>
                A Learning Community for Older Adults WiseAssist is about much
                more than the latest gadgets, apps, and websites. Our platform’s
                purpose is to enable older adults to come together and find ways
                to learn, work, create, exercise, and thrive in today’s digital
                age.!
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default OurPurpose;
