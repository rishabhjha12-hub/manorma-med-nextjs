"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../component/Card";
import Shimmer from "./Shimmer";

export default function FeaturedProduct() {
  const [labTests, setLabTests] = useState([]);
  const [filteredLabTests, setFilteredLabTests] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function fetchLabTests() {
      try {
        setLoader(true);
        const response = await axios.get("/api/getAllLabtest");
        setLoader(false);
        setLabTests(response.data);
        setFilteredLabTests(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching lab tests:");
      }
    }
    fetchLabTests();
  }, []);

  if(loader){
    return <Shimmer/>
  }

  return (
    <div className="flex flex-col mt-12">
     <div className="flex justify-center items-center my-6 ">
          <h1 className="text-4xl border-b-2 border-sky-500 font-serif">Featured Tests</h1>
       </div>
      <div className="w-full flex flex-wrap items-center justify-evenly py-3 px-8">
        {filteredLabTests.map((test: any) =>
          test.isFeatured == true ? (
            //   <Card key={test._id} resData={test}  />
            <Card key={test._id} resData={test} labData={labTests} />
          ) : null
        )}
      </div>
    </div>
  );
}
