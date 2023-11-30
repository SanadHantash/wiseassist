import React from "react";

function Faq() {
  return (
    <section className="dark:bg-gray-800 dark:text-gray-100">
      <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
        <p className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-indigo-950 dark:text-gray-200 sm:text-4xl">
          Frequently Asked Questions
        </p>
        <p className="mt-4 mb-8 dark:text-gray-400"></p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <details
            className="border rounded-lg"
            style={{ backgroundColor: "#F7F1EE" }}
          >
            <summary className="px-4 py-6 focus:outline-none focus-visible">
              How do I update my device's software?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
              For most devices, go to the settings menu, find the "Software
              Update" or "System Update" option, and follow the prompts to
              update your device.
            </p>
          </details>

          <details
            className="border rounded-lg"
            style={{ backgroundColor: "#F7F1EE" }}
          >
            <summary className="px-4 py-6 focus:outline-none focus-visible">
              Can you help me with installing and uninstalling apps?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
              Certainly! We can guide you through the process of installing and
              uninstalling apps on your device.
            </p>
          </details>

          <details
            className="border rounded-lg"
            style={{ backgroundColor: "#F7F1EE" }}
          >
            <summary className="px-4 py-6 focus:outline-none focus-visible">
              How do I connect to Wi-Fi?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
              Go to your device's settings, select "Wi-Fi," and choose the
              network you want to connect to. Enter the password if required.
            </p>
          </details>
          <details
            className="border rounded-lg"
            style={{ backgroundColor: "#F7F1EE" }}
          >
            <summary className="px-4 py-6 focus:outline-none focus-visible">
              How do I connect to Wi-Fi?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
              Go to your device's settings, select "Wi-Fi," and choose the
              network you want to connect to. Enter the password if required.
            </p>
          </details>
          <details
            className="border rounded-lg"
            style={{ backgroundColor: "#F7F1EE" }}
          >
            <summary className="px-4 py-6 focus:outline-none focus-visible">
              How do I connect to Wi-Fi?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
              Go to your device's settings, select "Wi-Fi," and choose the
              network you want to connect to. Enter the password if required.
            </p>
          </details>
          <details
            className="border rounded-lg"
            style={{ backgroundColor: "#F7F1EE" }}
          >
            <summary className="px-4 py-6 focus:outline-none focus-visible">
              How do I connect to Wi-Fi?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
              Go to your device's settings, select "Wi-Fi," and choose the
              network you want to connect to. Enter the password if required.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}

export default Faq;
