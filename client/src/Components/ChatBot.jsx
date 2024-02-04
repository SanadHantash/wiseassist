import React, { useState } from "react";
import axios from "axios";

function ChatBot() {
  const [typedMessage, setTypedMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [conversation, setConversation] = useState([]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleMessageChange = (e) => {
    setTypedMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    setConversation([...conversation, { text: typedMessage, isBot: false }]);

    try {
      const response = await axios.post("http://localhost:8080/chatbot", {
        messages: [typedMessage],
      });

      const botRequest = response.data.responses[0].question;
      const botResponse = response.data.responses[0].answer;

      setConversation([
        ...conversation,
        { text: typedMessage, isBot: false },
        { text: botResponse, isBot: true },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setTypedMessage("");
  };

  return (
    <>
      <button
        class="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-indigo-950 hover:bg-indigo-900 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-white"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        data-state="closed"
        onClick={toggleChat}
      >
        <svg
          xmlns=" http://www.w3.org/2000/svg"
          width="30"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-white block border-gray-200 align-middle"
        >
          <path
            d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
            class="border-gray-200"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div
          style={{
            boxShadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(28, 49, 105)",
          }}
          className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[400px] overflow-y-auto "
        >
          {conversation.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.isBot ? "justify-start" : "justify-end"
              } gap-3 mb-2`}
            >
              {message.isBot ? (
                <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                  <div class="rounded-full bg-gray-100 border p-1">
                    <svg
                      stroke="none"
                      fill="black"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                      ></path>
                    </svg>
                  </div>
                </span>
              ) : null}
              <p
                className={`leading-relaxed rounded-md p-2 ${
                  message.isBot ? "bg-gray-100" : "bg-indigo-950 text-white"
                }`}
              >
                <span class="block font-bold text-gray-700">
                  {message.isBot ? "AI" : "You"}
                </span>
                {message.text}
              </p>
            </div>
          ))}

          <div class="flex items-center pt-0">
            <form
              class="flex items-center justify-center w-full space-x-2"
              onSubmit={handleSendMessage}
            >
              <input
                type="text"
                name="message"
                value={typedMessage}
                onChange={handleMessageChange}
                class="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                placeholder="Type your message"
              />
              <button
                type="submit"
                class="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-indigo-950 hover:bg-indigo-900 h-10 px-4 py-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
