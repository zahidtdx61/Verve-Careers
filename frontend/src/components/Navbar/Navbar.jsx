import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import UserInfo from "../UserInfo/UserInfo";

const Navbar = () => {
  const [state, setState] = useState(false);
  const { user } = useAuth();

  const navigation = [
    { title: "Home", path: "" },
    { title: "All Jobs", path: "all-jobs" },
    { title: "Applied Jobs", path: "applied-jobs" },
    { title: "Add a Job", path: "add-job" },
    { title: "My Jobs", path: "my-jobs" },
    { title: "Blogs", path: "blogs" },
  ];

  const navStyle = (isActive) => {
    return isActive ? "border-b-2 pb-1 px-2 border-gray-900" : "";
  };

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  return (
    <nav
      className={`bg-white pb-5 md:text-sm ${
        state
          ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0"
          : ""
      }`}
    >
      <div className="gap-x-14 items-center  mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-5 md:block">
          <Link to={"/"} className="text-3xl font-lex font-lexend">
            Bloom Hire
          </Link>

          <div className="md:hidden flex ">
            <UserInfo />

            <button
              className="menu-btn text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
            state ? "block" : "hidden"
          } `}
        >
          <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className="text-gray-700 text-base hover:text-gray-900 block"
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => navStyle(isActive)}
                  >
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
            {user ? (
              <div className="hidden lg:block">
                <UserInfo />
              </div>
            ) : (
              <Link
                to={"/join-us"}
                className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
              >
                Join Us
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
