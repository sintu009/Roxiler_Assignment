import { Link } from "react-router-dom";
import { MainIcon } from "../assets/icons";

const Navbar = () => {
  return (
    <header className="p-2 md:p-4 flex justify-center items-center bg-blue-500 shadow-md">
      <Link to="/" className="flex items-center gap-1 text-white hover:text-white-700">
        <MainIcon />
        <span className="font-bold text-xl">Transaction Dashboard</span>
      </Link>
    </header>
  );
};

export default Navbar;
