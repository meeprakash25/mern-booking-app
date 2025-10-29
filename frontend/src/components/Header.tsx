import { Link } from "react-router-dom"
import { useAppContext } from "../contexts/AppContext"
import SignOutButton from "./SignOutButton"

const Header = () => {
  const { isLoggedIn } = useAppContext()
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex flex-col gap-2 sm:gap-0 xs:flex-row justify-between">
        <span className="text-3xl text-white font-bold tracking-tight self-center xs:self-auto">
          <Link to="/">myholidays.com</Link>
        </span>
        <span className="flex space-x-2 self-center xs:self-auto">
          {isLoggedIn ? (
            <>
              <Link
                className="
                flex items-center text-white px-3 font-bold hover:bg-blue-600 whitespace-nowrap rounded"
                to="my-bookings">
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600 whitespace-nowrap rounded"
                to="my-hotels">
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link to="/sign-in" className="flex items-center text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 whitespace-nowrap rounded">
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  )
}

export default Header
