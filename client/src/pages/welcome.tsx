import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Nav from "../components/nav";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-[url('../../public/images/signinBG.png')] bg-no-repeat bg-cover bg-center bg-fixed">
      <Nav />
      <div className="pt-40 background-image: linear-gradient(115deg, #9F7AEA, #FEE2FE) overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-black bg-opacity-80 rounded-xl mx-auto shadow-lg">
            <div className="absolute w-20 p-5">
              <Link href={"/"}>
                <ChevronLeftIcon color="white" />
              </Link>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12">
              <h1 className="text-white font-poppins text-5xl font-[600] mb-8">
                Welcome
              </h1>
              <div>
                <h2 className="text-white text-3xl text-start font-[500] tracking-wide font-poppins">
                  Register and get started with CaringGuide today!{" "}
                </h2>
                <a
                  href="#"
                  className="text-white font-semibold underline font-poppins"
                >
                  Click to learn more
                </a>
                <div className="text-white mt-8 font-poppins">
                  <a> </a>Have an account?{" "}
                  <Link href="/signin" className="text-caring font-semibold">
                    Login
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 py-16 px-12">
              <form action="#">
                <div className="grid grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Firstname"
                    className="border-2 border-white placeholder:text-white bg-[#eceeed] bg-opacity-40 py-2 px-4 rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Lastname"
                    className="border-2 border-white placeholder:text-white bg-[#eceeed] bg-opacity-40 py-2 px-4 rounded-xl"
                  />
                </div>
                <div className="mt-6">
                  <input
                    type="text"
                    placeholder="Email"
                    className="border-2 border-white placeholder:text-white bg-[#eceeed] bg-opacity-40 py-2 px-4 w-full rounded-xl"
                  />
                </div>
                <div className="mt-6">
                  <input
                    type="password"
                    placeholder="Password"
                    className="border-2 border-white placeholder:text-white bg-[#eceeed] bg-opacity-40 py-2 px-4 w-full rounded-xl"
                  />
                </div>
                <div className="mt-6">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="border-2 border-white placeholder:text-white bg-[#eceeed] bg-opacity-40 py-2 px-4 w-full rounded-xl"
                  />
                </div>
                <div className="mt-6">
                  <input
                    title={"checkbox"}
                    type="checkbox"
                    className="border-2 border-white placeholder:text-white bg-[#eceeed] bg-opacity-40 rounded-xl"
                  />
                  <span className="text-white">
                    <a> </a>I accept the{" "}
                    <a href="#" className="text-caring font-semibold">
                      Terms of Use
                    </a>{" "}
                    &{" "}
                    <a href="#" className="text-caring font-semibold">
                      Privacy Policy
                    </a>
                  </span>
                </div>
                <div className="mt-5">
                  <button className="w-full bg-caring py-3 text-center text-white rounded-xl">
                    Register Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
