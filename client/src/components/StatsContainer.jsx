import React, { useEffect, useState } from "react";
import { useAllDataContext } from "../pages/HomeLayout";
import customFetch from "../utils/customFetch";
import { FaDollarSign, FaCheck, FaTimes } from "react-icons/fa";

const StatsContainer = () => {
  const { data } = useAllDataContext();
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    if (data && data.selectedMonth) {
      const fetchStats = async () => {
        try {
          const response = await customFetch.get(
            `/app/${data.selectedMonth}/stats`
          );
          setStatsData(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchStats();
    }
  }, [data]);

  if (!statsData) {
    return <div>Loading...</div>;
  }

  const { totalSaleAmount, totalSoldItems, totalNotSoldItems } = statsData;

  return (
    <div className=" p-1 border border-gray-500 rounded-xl hover:bg-blue-200 transform hover:scale-110 transition duration-300 cursor-pointer ">
      <h2 className="text-2xl font-semibold mb-4">
        Statistics for Month {data.selectedMonth}
      </h2>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <FaDollarSign className="text-xl mr-2" />
          <p className="text-lg">
            Total Sale Amount: ${totalSaleAmount.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center">
          <FaCheck className="text-xl text-green-500 mr-2" />
          <p className="text-lg">Total Sold Items: {totalSoldItems}</p>
        </div>
        <div className="flex items-center">
          <FaTimes className="text-xl text-red-500 mr-2" />
          <p className="text-lg">Total Not Sold Items: {totalNotSoldItems}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsContainer;
