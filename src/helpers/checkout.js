"use client";
import { loadStripe } from "@stripe/stripe-js";


//  const getUserDetails = async () => {
//    try {
//      const res = await axios.get("/api/users/me");
//      console.log(res.data);
//      setUser(res.data.data);
//    } catch (error) {
//      console.error("Error fetching user details:", error);
//    }
//  };
//issubscribed true func-->cala apip
//  const handleUpdateLabTest = async () => {
//    try {
//      const response = await axios.put("/api/users/makeUserSubscribed", { id: params.id });

//      if (response.status === 200) {
//        console.log(response.data.message); // "User updated successfully"
//      } else {
//        console.error(response.data.message);
//      }
//    } catch (error) {
//      console.error("Error updating lab test:");
//    }
//  };


export async function checkout({ lineItems }) {
  console.log("clickd", lineItems);
  let stripePromise = null;
  const getstripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(
        "pk_test_51Nc1F5SBaY4bjToVkOGWmEpijcyiYPXW9yJrqehWCM3svZjXGAmLE76tXuMeSIqzC6SzGrpKkX9fMAaDml9OcvrB006sLmMow9"
      );
    }
    return stripePromise;
  };
  const stripe = await getstripe();
  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin,
  });

}
