import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout, setCredentials } from "../redux/user/userSlice";

function Login({ use }) {
  const { token, user_id } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  function set_default() {
    setEmail("");
    setUsername("");
    setPassword("");
    setShowpassword(false);
  }

  useEffect(() => {
    set_default();
  }, [location]);

  const Sign_up = async () => {
    const response = await axios.post("http://localhost:3000/auth/signup", {
      username: Username,
      email: Email,
      password: Password,
    });
    if (response.status === 200) {
      window.alert(response.data.message);
      navigate("/login");
    }
  };

  const Sign_in = async () => {
    const response = await axios.post("http://localhost:3000/auth/login", {
      email: Email,
      password: Password,
      rememberMe: isChecked,
    });
    if (response.status === 200) {
      dispatch(
        setCredentials({
          token: response.data.token,
          user_id: response.data.user.id,
        })
      );
      navigate("/");
    } else {
      return;
    }
  };

  const update = async () => {
    console.log(user_id, token);
    const response = await axios.put(
      `http://localhost:3000/users/update/${user_id}`,
      {
        username: Username,
        email: Email,
        password: Password,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      window.alert(response.data.message + "\nlogin again");
      dispatch(logout());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      switch (use) {
        case "Sign Up":
          await Sign_up();
          break;
        case "Sign In":
          await Sign_in();
          break;
        case "Update":
          await update();
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      window.alert(error.response.data.message || error.response.data.error);
    }
    set_default();
  };

  return (
    <div className="m-auto w-[30vw] h-auto bg-white backdrop-blur-xs rounded-2xl shadow-[0_0.5rem_1.5rem_0.2rem_#171717cf]">
      <form
        onSubmit={handleSubmit}
        className="relative flex w-full h-full flex-col rounded-xl text-gray-700 "
      >
        <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-cyan-500 to-cyan-300 bg-clip-border text-white shadow-lg shadow-cyan-500/40">
          <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
            {use}
          </h3>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              value={Email}
              type="text"
              required
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Email
            </label>
          </div>
          {(use === "Sign Up" || use === "Update") && (
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="text"
                required
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=""
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                username
              </label>
            </div>
          )}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              type={showpassword ? "text" : "password"}
              required
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              className="peer relative h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <button
              type="button"
              className="absolute right-2 top-3 cursor-pointer"
              onClick={() => setShowpassword((showpassword) => !showpassword)}
            >
              {showpassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Password
            </label>
          </div>
          <div className="-ml-2.5">
            {use === "Sign In" && (
              <div className="inline-flex items-center">
                <label
                  data-ripple-dark="true"
                  htmlFor="checkbox"
                  className="relative flex cursor-pointer items-center rounded-full p-3"
                >
                  <input
                    id="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-cyan-500 checked:bg-cyan-500 checked:before:bg-cyan-500 hover:before:opacity-10"
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      strokeWidth="1"
                      stroke="currentColor"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="h-3.5 w-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                <label
                  htmlFor="checkbox"
                  className="mt-px cursor-pointer select-none font-light text-gray-700"
                >
                  Remember Me
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 pt-0">
          <button
            data-ripple-light="true"
            type="submit"
            className="block cursor-pointer w-full select-none rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-400 py-3 px-6 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            {use}
          </button>
          {use === "Sign In" ? (
            <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
              Don't have an account?
              <NavLink
                className="ml-1 block font-sans text-sm font-bold leading-normal text-cyan-500 antialiased hover:underline"
                to="/signup"
              >
                Sign up
              </NavLink>
            </p>
          ) : use === "Sign Up" ? (
            <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
              Already have an account?
              <NavLink
                className="ml-1 block font-sans text-sm font-bold leading-normal text-cyan-500 antialiased hover:underline"
                to="/login"
              >
                Sign In
              </NavLink>
            </p>
          ) : (
            <>
              <p className="mt-6 text-center font-sans text-sm font-light leading-normal text-inherit antialiased">
                *type the field you want to change, if no changes fill it with
                previous
              </p>
              <p className="mt-4 flex justify-center font-sans text-base font-light leading-normal text-inherit antialiased">
                proceed to
                <NavLink
                  className="ml-1 block font-sans text-base font-bold leading-normal text-cyan-500 antialiased hover:underline"
                  to="/login"
                >
                  Login
                </NavLink>
              </p>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
