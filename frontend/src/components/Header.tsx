import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";


const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    
    <div className="py-4 px-2 fixed top-0 right-0 left-0 text-base leading-7 font-normal text-white backdrop-blur-sm z-50 bg-purple-500/70" style={{ fontFamily: "'Quicksand', sans-serif" }}>
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">My App</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/Near-me"
              >
                Near-me
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
    
    
  );
};

export default Header;
