import { Text, Image, Col, Card } from "@nextui-org/react";

import Section from "./components/section";

import React from 'react'
import { EyeIcon, EyeSlashIcon, UserIcon, LockClosedIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';
import Link from "next/link";


const auth = () => {
  return (


  <div className="min-h-screen py-40 background-image: linear-gradient(115deg, #9F7AEA, #FEE2FE)">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center bg-[url('../../public/images/Valley-day.png')]">
            <h1 className="text-black text-3xl mb-3">Welcome</h1>
            <div>
              <h2 className="text-black text-xl justify-center" >Register and get started with CaringGuide today! </h2>
              <a href="#" className="text-white font-semibold">Learn more</a>
            </div>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <Link href="/">
              <button  >
                <ArrowLeftIcon className="h-9 w-9 text-black pt-1" />
              </button>
            </Link>
            <h2  className="text-3xl mb-4">Register</h2>
            <p className="mb-4 ">
              Create your account. It’s free and only take a minute
            </p>
            <form action="#">
              <div className="grid grid-cols-2 gap-5">
                <input type="text" placeholder="Firstname" className="border border-gray-400 py-1 px-2 rounded-xl"/>
                <input type="text" placeholder="Surname" className="border border-gray-400 py-1 px-2 rounded-xl" />
              </div>
              <div className="mt-5">
                <input type="text" placeholder="Email" className="border border-gray-400 py-1 px-2 w-full rounded-xl"/>
              </div>
              <div className="mt-5">
                <input type="password" placeholder="Password" className="border border-gray-400 py-1 px-2 w-full rounded-xl"/>
              </div>
              <div className="mt-5">
                <input type="password" placeholder="Confirm Password" className="border border-gray-400 py-1 px-2 w-full rounded-xl"/>
              </div>
              <div className="mt-5">
                <input type="checkbox" className="border border-gray-400 rounded-xl"/>
                <span>
                  <a>     </a>I accept the <a href="#" className="text-caring font-semibold">Terms of Use</a> &  <a href="#" className="text-caring font-semibold">Privacy Policy</a> 
                </span>
              </div>
              <div className="mt-5">
                <button className="w-full bg-caring py-3 text-center text-white rounded-xl">Register Now</button>
              </div>
          </form>
        </div>
      </div>
    </div>
    </div>



  );
};

export default auth;