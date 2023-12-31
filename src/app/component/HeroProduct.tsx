"use client";

import Link from "next/link";
import Image from "next/image";
import HeroComponentImage from "../../assets/hero-product-img.png";
import { checkout } from "../../helpers/checkout";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { UserContext } from '../context/UserContext';



interface User {
  username: string;
  email: string;
  isAdmin: boolean;
  isSubscribed: boolean;
}

export default function HeroComponent() {

  const router = useRouter();
  const { checkUser } = useContext(UserContext);

  const [loader, setLoader] = useState(false);
  // const [user, setUser] = useState<User | null>(null);
  

  // useEffect(() => {
  //   getUserDetails();
  // },[]);


  // const clickBtn = () => {
  //   console.log("Clicked");
  // };

//    const getUserDetails = async () => {
//    try {
//      const res = await axios.get("/api/users/me");
//      console.log(res.data);
//       setUser(res.data.data);
//    } catch (error) {
//      console.error("Error fetching user details:", error);
//    }
//  };

 function goToLogin(){
    router.push("/login");
    toast.success("Please, Login First"); 
 }

  return (
    <div className="flex-none h-[40vh] w-full mb-7 sm:h-[30vh] md:h-[30vh] lg:flex lg:h-1/4 lg:justify-center lg:truncate">
      <div className="hero-section-data flex-none w-full p-2 lg:flex lg:flex-col lg:justify-center lg:items-center lg:w-[35%] lg:whitespace-break-spaces">
        <h1 className="capitalize font-bold mb-[1rem] text-2xl lg:text-3xl">
          Welcome to Oxign{" "}
        </h1>
        <p>
          Subscribe to our Exclusive Lab Test Card and gain access to government
          rates for a wide range of lab tests. Enjoy the convenience of
          affordable and high-quality lab services. Our subscription card
          ensures you get the tests you need without breaking the bank.
          <b>only for Rs.150 per year</b>
        </p>
        <button
          type="button"
          onClick={() => { 
            checkUser ? (
            checkout({
              lineItems: [
                { price: "price_1Nc1P0SBaY4bjToVfiuN8LkU", quantity: 1 },
              ],
              user: checkUser
            },)
            ): 
            goToLogin()
          }
        }
          className="inline-flex items-center px-4 py-2 ml-4 mt-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
          disabled={checkUser?.isSubscribed ? true : false}
        >
          {checkUser?.isSubscribed ? "Member" : "Subscribe to the card"}
        </button>
        
      </div>
      {/* Hero-Section-Image */}
      <div className="hero-section-image flex w-full h-2/5 mb-8  justify-center items-center sm:h-2/4 md:h-[55%] lg:h-2/3 lg:w-[35%]">
        <Image
          src={HeroComponentImage}
          alt="hero-section-image"
          className="h-full object-contain"
        />
      </div>
    </div>
  );
}
