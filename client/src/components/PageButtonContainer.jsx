import { useLocation, useNavigate } from "react-router-dom";
import { useAllDataContext } from "../pages/HomeLayout";

const PageButtonContainer = () => {
  const { data } = useAllDataContext();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  if (!data || data.numOfPages <= 1) {
    return null;
  }
  const { numOfPages, currentPage } = data;

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-l-md ${
          currentPage === 1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
      >
        Previous-page
      </button>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === numOfPages}
        className={`px-4 py-2 rounded-r-md ${
          currentPage === numOfPages
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
      >
        Next-page
      </button>
    </div>
  );
};

export default PageButtonContainer;
