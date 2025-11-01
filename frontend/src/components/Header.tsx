import { Link } from "react-router-dom"
import { useAppContext } from "../contexts/AppContext"
import SignOutButton from "./SignOutButton"
import { useState } from "react"

const Header = () => {
  const { isLoggedIn } = useAppContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const buttonClasses = `flex items-center text-white px-3 py-2 font-bold hover:bg-blue-900 active:bg-blue-900 whitespace-nowrap rounded`

  const buttons = (
    <>
      {isLoggedIn ? (
        <>
          <Link className={buttonClasses} onClick={() => setIsMenuOpen(false)} to="/my-bookings">
            My Bookings
          </Link>
          <Link className={buttonClasses} onClick={() => setIsMenuOpen(false)} to="/my-hotels">
            My Hotels
          </Link>
          <hr />
          <div className="my-2">
            <SignOutButton />
          </div>
        </>
      ) : (
        <Link
          to="/sign-in"
          type="button"
          className="flex items-center text-blue-600 px-3 py-2 font-bold bg-white hover:bg-gray-100 whitespace-nowrap rounded"
          onClick={() => setIsMenuOpen(false)}>
          Sign In
        </Link>
      )}
    </>
  )

  return (
    <nav className="bg-blue-800 text-white fixed w-full shadow-xl z-10 opacity-98">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-row w-full justify-between">
            <div className="flex text-xl font-bold">
              <Link to="/" className="self-center">
                myholidays.com
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="flex ml-10 items-baseline space-x-2">{buttons}</div>
            </div>
          </div>
          <div className="md:hidden">
            <button
              className={`w-[30px] flex items-center active:bg-blue-900 rounded shadow-lg ${
                isMenuOpen ? "bg-blue-900" : ""
              }`}
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path d="M4 18L20 18" stroke="#fcfcfc" strokeWidth="2" strokeLinecap="round"></path>{" "}
                  <path d="M4 12L20 12" stroke="#fcfcfc" strokeWidth="2" strokeLinecap="round"></path>{" "}
                  <path d="M4 6L20 6" stroke="#fcfcfc" strokeWidth="2" strokeLinecap="round"></path>{" "}
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && <div className="flex flex-col py-2 gap-y-2 md:hidden px-4 sm:px-6">{buttons}</div>}
    </nav>
  )
}

export default Header
