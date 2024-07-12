
import { Link } from "react-router-dom";

function NavbarComponent() {
  return (
    <div className="min-h-full sticky top-0 z-50">
      <nav className="bg-gray-800 p-2">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ml-10 flex items-baseline space-x-4">
            <Link
              className=" px-3 py-2 text-base font-medium text-white hover:text-yellow-400"
              to={"/"}
            >
              Movies
            </Link>
            <Link
              className=" px-3 py-2 text-base font-medium text-white  hover:text-yellow-400"
              to={"/watchlist"}
            >
              Watch List
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarComponent;
