"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { VscChromeClose, VscCheck } from "react-icons/vsc";
import Loader from "../component/Loader";
import PrivateRoute from "@/app/component/PrivateRoute";


const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");
  const handleDelete = async (id: any) => {
    try {
      await axios.delete(`/api/deleteAppointment/${id}`);
      const updatedLabTests = appointments.filter(
        (test: any) => test._id !== id
      );
      setAppointments(updatedLabTests);
    } catch (error) {
      console.error("Error deleting lab test:", error);
    }
  };
  const markCompleted = async (id: any) => {
    try {
      console.log("sdfs");
      await axios.put(`/api/markComplete/${id}`);
      // After successful deletion, refresh the labTests state to update the list
      // const updatedLabTests = appointments.map((test: any) => {
      //   if(test._id === id){
      //      if(test.isCompleted =! test.isCompleted){
      //       return test;
      //      }
      //   }
      //   else{
      //     if(test.isCompleted == test.isCompleted)
      //     {
      //       return test;
      //     }
      //   }
      // }
      // );
      // setAppointments(updatedLabTests);
    } catch (error) {
      console.error("Error updating lab test:", error);
    }
  };
  useEffect(() => {
    async function fetchAppointments() {
      try {
        setLoader(true)
        const response = await axios.get("/api/getAllAppointments");
        setLoader(false)
        console.log(response);
        setAppointments(response.data);
        setSearchData(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching appointments:");
      }
    }
    fetchAppointments();
  }, []);
  const handleInputChange = (e: any) => {
    setSearch(e.target.value);
    const inputValue = e.target.value.toLowerCase();
    const updatedFilter = searchData.filter((check: any) =>
      check?.patientName.toLowerCase().includes(inputValue)
    );
    setAppointments(updatedFilter);
  };


  function convertToIndianTimeAndBeautify(utcDateString: any) {
    const utcDate = new Date(utcDateString);
    const options: Intl.DateTimeFormatOptions =  {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return utcDate.toLocaleString('en-IN', options);
  }



  if (loader == true) {
    return <Loader />;
  }
  else {
    return (
      <>
      <PrivateRoute>
      
        {appointments.length == 0 ? (
          <p>No data found</p>
        ) :(
      <div className="flex flex-col w-full">
          <div className="search w-full md:w-1/4 lg:w-1/4 flex justify-start">
          <div className="m-2 p-2">
            <input
              type="text"
              value={search}
              onChange={handleInputChange}
              className="block border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 w-full lg:w-11/12"
              placeholder="Search for Test..."
            />
          </div>
        </div>

        <div className="flex flex-col overflow-x-auto ">
         <div className="flex justify-center items-center">
         <h1 className="text-2xl font-bold border-b-2 border-blue-300 pb-3 mb-4">All Appointments</h1>
         </div>
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium ">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Serial Number
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Patient ID
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Patient Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Date & Time
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Test Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Address
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Phone Number
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Test Destination
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Delete Appointment
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment: any, index) => {
                      if (appointment.isCompleted === true) {
                        return (
                          <tr
                            key={appointment._id}
                            className="border-b  bg-green-300"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {index + 1}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.patientId}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.patientName}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                             {convertToIndianTimeAndBeautify(appointment?.date)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.testName}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.address}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.phoneNumber}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.testDestination}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.testPrice}
                            </td>
                            <td
                              className="whitespace-nowrap px-6 py-4 "
                              onClick={() => handleDelete(appointment._id)}
                            >
                              <button className="bg-black text-white p-2 rounded hover:scale-110 duration-500 capitalize font-medium">
                                <div className="flex justify-around items-center">
                                  Delete
                                  <VscChromeClose color="#FF7276" />
                                </div>
                              </button>
                            </td>
                            <td
                              className="whitespace-nowrap px-6 py-4"
                              onClick={() =>
                                !appointment.isCompleted
                                  ? markCompleted(appointment._id)
                                  : ""
                              }
                            >
                              <button className="bg-black text-white p-2 rounded hover:scale-110 duration-500 capitalize font-medium">
                                {appointment.isCompleted ? (
                                  <div className="flex justify-around items-center">
                                    Completed
                                    <VscCheck color="#83f28f" />
                                  </div>
                                ) : (
                                  "mark complete"
                                )}
                              </button>
                            </td>
                          </tr>
                        );
                      } else if (
                        appointment.date <
                        new Date().toJSON().slice(0, 24).replace(/-/g, "-")
                      ) {
                        return (
                          <tr
                            key={appointment._id}
                            className="border-b  bg-red-300"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {index + 1}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.patientId}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.patientName}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                             {convertToIndianTimeAndBeautify(appointment?.date)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.testName}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.address}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.phoneNumber}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.testDestination}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.testPrice}
                            </td>
                            <td
                              className="whitespace-nowrap px-6 py-4 "
                              onClick={() => handleDelete(appointment._id)}
                            >
                              <button className="bg-black text-white p-2 rounded hover:scale-110 duration-500 capitalize font-medium">
                                <div className="flex justify-around items-center">
                                  Delete
                                  <VscChromeClose color="#FF7276" />
                                </div>
                              </button>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              Missed
                            </td>
                          </tr>
                        );
                      } else {
                        return (
                          <tr
                            key={appointment._id}
                            className="border-b "
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {index + 1}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.patientId}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.patientName}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                             {convertToIndianTimeAndBeautify(appointment?.date)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.testName}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.address}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.phoneNumber}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.testDestination}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {appointment.testPrice}
                            </td>
                            <td
                              className="whitespace-nowrap px-6 py-4 "
                              onClick={() => handleDelete(appointment._id)}
                            >
                              <button className="bg-black text-white p-2 rounded hover:scale-110 duration-500 capitalize font-medium">
                                <div className="flex justify-around items-center">
                                  Delete
                                  <VscChromeClose color="#FF7276" />
                                </div>
                              </button>
                            </td>
                            <td
                              className="whitespace-nowrap px-6 py-4"
                              onClick={() =>
                                !appointment.isCompleted
                                  ? markCompleted(appointment._id)
                                  : ""
                              }
                            >
                              <button className="bg-black text-white p-2 rounded hover:scale-110 duration-500 capitalize font-medium">
                                {appointment.isCompleted ? (
                                  <div className="flex justify-around items-center">
                                    Completed
                                    <VscCheck color="#83f28f" />
                                  </div>
                                ) : (
                                  "mark complete"
                                )}
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
        )};
        </PrivateRoute>
    </>
    );
  }
};

export default AllAppointments;
