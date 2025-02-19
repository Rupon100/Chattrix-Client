import { Helmet } from "react-helmet-async";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./../UserDash/checkoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);

const Membership = () => {
  return (
    <div className="bg-gradient-to-r from-black to-sky-950 min-h-screen text-white dark:bg-sky-100 dark:bg-none dark:text-black p-4 md:p-8 flex flex-col gap-4 justify-center items-center ">
      <Helmet>
        <title>Chattrix | Membership</title>
      </Helmet>
      <div className="flex gap-2 md:gap-4 flex-col justify-between items-center" >
        <h2 className="text-2xl md:text-4xl font-semibold ">
          Become a member and get Gold badge!!!
        </h2>
        <div className="border w-full max-w-2xl mx-auto border-gray-600 p-4 rounded-lg dark:bg-sky-50">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-xl">Total Payment Amount</h2>
              <h2 className="flex font-semibold text-xl bg-gray-50/10 p-2 rounded-lg">
                $12.99
              </h2>
            </div>
            <div className="p-2">
              <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
