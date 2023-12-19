import React from "react";
import axios from "axios";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import { useCookies } from "react-cookie";
import CardSection from "./CardSection";

const CheckoutForm = (props) => {
  const [cookies] = useCookies(["token"]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { stripe, elements } = props;
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token);
      const token = cookies.Token;

      try {
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(
          "http://localhost:8080/subscribtion",
          {
            token: result.token.id,
          }
        );
        const sessionId = response.data.id;

        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });

        console.log("Response from backend:", response.data);
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };

  return (
    <div>
      {/* <div className="product-info">
        <h3 className="product-title">Apple MacBook Pro</h3>
        <h4 className="product-price">$999</h4>
      </div> */}
      <form onSubmit={handleSubmit}>
        <CardSection />
        <button disabled={!props.stripe} className="btn-pay">
          Buy Now
        </button>
      </form>
    </div>
  );
};

const InjectedCheckoutForm = () => {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
};

export default InjectedCheckoutForm;
