import React, { useEffect, useState } from "react";
import { useAllDataContext } from "../pages/HomeLayout";
import customFetch from "../utils/customFetch";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartContainer = () => {
  const [chartData, setChartData] = useState(null);
  const { data } = useAllDataContext();

  useEffect(() => {
    if (data && data.selectedMonth) {
      const fetchData = async () => {
        try {
          const response = await customFetch.get(
            `/app/${data.selectedMonth}/barChart`
          );
          setChartData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [data]);

  if (!chartData) {
    return <div>Loading...</div>;
  }
  console.log(chartData);

  return (
    <>
      {" "}
      <div className="text-center text-2xl font-semibold ">
        Bar chart for month {data.selectedMonth}
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#2cb1bc" barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BarChartContainer;
