import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  AllDataContainer,
  Navbar,
  SearchContainer,
  PageButtonContainer,
  StatsContainer,
  BarChartContainer,
  PieChartContainer,
} from "../components";
import { createContext, useContext } from "react";
import customFetch from "../utils/customFetch";

const allDataContext = createContext();

const HomeLayout = ({ defaultMonth }) => {
  const { search } = useLocation();
  const { month } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  const fetchDataAndUpdateState = async (newMonth) => {
    try {
      const response = await customFetch.get(`/app/${newMonth}`, {
        params: new URLSearchParams(search),
      });
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!month) {
      navigate(`/${defaultMonth}`);
    } else {
      fetchDataAndUpdateState(month);
    }
  }, [month, search]);

  const handleMonthChange = (newMonth) => {
    fetchDataAndUpdateState(newMonth);
    navigate(`/${newMonth}`);
  };
  return (
    <allDataContext.Provider value={{ data, search }}>
      <nav className="bg-gray-100">
        <Navbar />
      </nav>
      <div className=" bg-stone-50">
        {/* Column 1: Search and Select */}
        <div className=" p-4 flex items-center justify-between">
          <div className="flex-grow">
            <SearchContainer />
          </div>

          <div className="ml-2">
            <label
              htmlFor="selectedMonth"
              className="mr-2 text-2xl font-semibold"
            >
              Select Month:
            </label>
            <select
              name="selectedMonth"
              id="selectedMonth"
              onChange={(e) => handleMonthChange(e.target.value)}
              value={month}
              className="px-2 py-1 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:border-blue-500 text-2xl font-semibold"
            >
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
        </div>
        <AllDataContainer />
        {/* Column 2: Stats and Chart */}
        <div className="p-4 gap-1 flex flex-row items-center justify-between">
          <div className="w-1/5 text-center items-center justify-center shadow-xl ">
            <StatsContainer />
          </div>
          <div className="w-3/5  border border-gray-500 rounded-xl shadow-xl cursor-pointer  ">
            <BarChartContainer />
          </div>
          <div className="w-1/5 border border-gray-500 rounded-xl shadow-xl transform hover:scale-110 transition duration-300 cursor-pointer">
            <PieChartContainer />
          </div>
        </div>
        {/* Column 3: All Data */}
        <div className=" p-8">
          <div>
            {/* <AllDataContainer /> */}
          </div>
          <div className="mt-4">
            <PageButtonContainer />
          </div>
        </div>
      </div>
    </allDataContext.Provider>
  );
};

export const useAllDataContext = () => useContext(allDataContext);
export default HomeLayout;
