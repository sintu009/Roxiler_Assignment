import { useAllDataContext } from "../pages/HomeLayout";
import { format } from 'date-fns';
import { FaSpinner } from 'react-icons/fa';

const AllDataContainer = () => {
  const { data } = useAllDataContext();

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  const { transactions } = data;

  return (
    <div className="max-w-6xl mx-auto rounded-lg shadow-lg border border-blue-500 overflow-x-auto">
      <table className="w-full border-collapse border border-blue-500">
        <thead className="min-w-full">
          <tr className="bg-blue-200">
            <th className="p-2 text-center text-white bg-blue-500">Id</th>
            <th className="p-2 text-center text-white bg-blue-500">Image</th>
            <th className="p-2 text-center text-white bg-blue-500">Title</th>
            <th className="p-2 text-center text-white bg-blue-500">Price</th>
            <th className="p-2 text-center text-white bg-blue-500">Description</th>
            <th className="p-2 text-center text-white bg-blue-500">Category</th>
            <th className="p-2 text-center text-white bg-blue-500">Sold</th>
            <th className="p-2 text-center text-white bg-blue-500">Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction._id}
              className="border-t border-gray-300 hover:bg-yellow-200 transform hover:scale-125 hover:rounded-full transition duration-300 cursor-pointer"
            >
              <td className="p-2 text-sm font-semibold text-center text-blue-700">{transaction.id}</td>
              <td className="p-2 text-sm font-semibold">
                <img src={transaction.image} alt={transaction.title} className="rounded-full" />
              </td>
              <td className="p-2 text-sm font-semibold text-green-700">{transaction.title}</td>
              <td className="p-2 text-sm font-semibold text-purple-700">{transaction.price}</td>
              <td className="p-2 text-sm font-semibold text-yellow-700">
                {transaction.description}
              </td>
              <td className="p-2 text-sm font-semibold text-orange-700">
                {transaction.category}
              </td>
              <td className={`p-2 text-sm font-semibold ${transaction.sold ? 'text-green-700' : 'text-red-700'}`}>
                {transaction.sold ? "Yes" : "No"}
              </td>
              <td className="p-2 text-sm font-semibold text-blue-700">
                {format(new Date(transaction.dateOfSale), 'MM/dd/yyyy')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllDataContainer;
