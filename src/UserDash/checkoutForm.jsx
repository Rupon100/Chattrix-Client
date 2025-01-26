import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAuth from "./../Hooks/useAuth";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetch("http://localhost:4000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 12.99, currency: "usd" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error(
            "Failed to get client secret:",
            data.error || "Unknown error"
          );
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!stripe || !elements) {
      setError("Stripe is not properly initialized.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Card element is not available.");
      setLoading(false);
      return;
    }

    try {
      const { error: paymentError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: user?.displayName,
              email: user?.email,
            },
          },
        });

      if (paymentError) {
        setError(paymentError.message);
      } else if (paymentIntent?.status === "succeeded") {
        setSuccess("Payment successful! ✔️");
        setPaymentSucceeded(true);

        const userData = {
          userId: user?.displayName,  
          email: user?.email,  
        };

        await fetch("http://localhost:4000/update-user-role", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4  rounded shadow">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
          className="p-2 border rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button
          type="submit"
          disabled={loading || paymentSucceeded}
          className={`w-full py-2 rounded transition ${
            paymentSucceeded ? "bg-green-500" : "bg-blue-500"
          } text-white`}
        >
          {paymentSucceeded
            ? "Payment Successful"
            : loading
            ? "Processing..."
            : "Pay $12.99"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
