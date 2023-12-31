"use client";
import Image from 'next/image'
import {  useEffect, useState, useContext } from 'react';
import axios from "axios";
import Link from "next/link";
import { UserContext } from '../context/UserContext';




const Card = ({resData, labData}: any) => {
  

  interface User {
    username: string;
    email: string;
    isAdmin: boolean;
    isSubscribed: boolean;
  }

  const {testName, price ,expectedResults, image, _id, isFeatured,description,govPrice} = resData;
  // const [user, setUser] = useState({});
  // const [user, setUser] = useState<User | null>(null);
  const { checkUser } = useContext(UserContext);

  const [labTests, setLabTests] = useState(labData);

  // useEffect(()=>{
  //   getUserDetails();
  // },[])

  // const getUserDetails = async () => {
  //   const res = await axios.get("/api/users/me");
  //   console.log(res.data);
  //   setUser(res.data.data);
  // };

const handleDelete = async (id:any) => {
  try {
    await axios.delete(`/api/deleteTest/${id}`);
    // After successful deletion, refresh the labTests state to update the list
    const updatedLabTests = labTests.filter((test:any) => test._id !== id);
    setLabTests(updatedLabTests);
  } catch (error) {
    console.error("Error deleting lab test:", error);
  }
};
  const handleMarkFeatured = async (id: any, isFeatured: any) => {
    try {
        console.log(id,isFeatured);
      await axios.put("/api/makeFeatured", { id, isFeatured: !isFeatured });
      setLabTests((prevLabTests:any) =>
        prevLabTests.map((test:any) =>
          test._id === id ? { ...test, isFeatured: !isFeatured } : test
        )
      );

    } catch (error) {
      console.error("Error updating lab test:");
    }
  };

  
//   console.log(resData);

    return (
      <div className="max-w-[300px] bg-white border border-gray-200 rounded-lg shadow my-5 hover:scale-110 duration-500">
        <div className="h-[200px] w-[300px]">
          <Image
            src={image}
            alt={testName}
            width="300"
            height="200"
            className="rounded-t-lg object-cover h-[100%] w-[100%]"
          />
        </div>

        <div className="p-5">
          <div className="flex justify-between">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              {testName}
            </h5>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Rs. {checkUser?.isSubscribed ? (
                <span className='line-through text-red-300'>{price}</span>
                ) : price}
            </h5>
          </div>

            <div className='flex justify-end'>
            {
              checkUser?.isSubscribed ? (
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                {govPrice}
              </h5>
              ) :""
            }
            </div>

          <div className="flex justify-between">
            <p className="mb-3 font-normal text-gray-700 ">
              {govPrice
                ? "if you subscribed to our membership card u will get this test at Rs." +
                  govPrice
                : ""}
            </p>
          </div>

          {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description ? description : "Lorem ipsum dolor sit amet."}
          </p> */}

          <div className="flex justify-between">
            <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900">
              Expected Results
            </h5>
            <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900">
              {expectedResults}
            </h5>
          </div>

          <div className="flex justify-between">
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          <Link key={_id}  href={checkUser ? `/addAppointment/${_id}` : "/login"} >
          {/* <Link key={_id} href={"/addAppointment/" + _id} > */}
              Book Appointment
          </Link>

              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
            {/* <button
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e: any) => handleMarkFeatured(_id, isFeatured)}
            >
              {isFeatured ? "Not Featured" : "Mark Featured"}
            </button>
            <button
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => handleDelete(_id)}
            >
              Delete
            </button> */}
          </div>

          {/* <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button> */}

          {/* <button onClick={() => handleMarkFeatured(_id, isFeatured)}>
              Mark {isFeatured ? "Not Featured" : "Featured"}
        </button> */}
        </div>
      </div>
    );
} 

export default Card;