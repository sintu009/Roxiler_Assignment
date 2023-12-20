import React, { useEffect, useState } from "react";
import { useAllDataContext } from "../pages/HomeLayout";
import customFetch from "../utils/customFetch";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const PieChartContainer = () => {
  const [pieData, setPieData] = useState(null);
  const { data } = useAllDataContext();

  useEffect(() => {
    if (data && data.selectedMonth) {
      const fetchData = async () => {
        try {
          const response = await customFetch.get(
            `/app/${data.selectedMonth}/pieChart`
          );
          setPieData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [data]);

  if (!pieData) {
    return <div>Loading...</div>;
  }

  const dataForChart = Object.keys(pieData).map((category, index) => ({
    name: category,
    value: pieData[category],
    fill: `#${index * 250}`,
  }));

  return (
    <div className="hover:bg-blue-200 hover:rounded-xl">
      <h2 className="text-center text-2xl font-semibold ">
        Pie Chart for Month {data.selectedMonth}
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            dataKey="value"
            data={dataForChart}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {dataForChart.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartContainer;
