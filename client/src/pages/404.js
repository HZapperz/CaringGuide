import React from 'react';
import Link from "next/link";

function NoPage() {
  return (
    <main class="h-full w-full flex flex-col justify-center items-center bg-white">
      <h1 class="text-9xl font-extrabold text-primary tracking-widest">404</h1>
      <div class="bg-red-500 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button class="mt-5">
        <Link class="relative inline-block text-sm font-medium text-red-500 group active:text-red-500 focus:outline-none focus:ring"
          href={"/"}>
          <span
            class="relative inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-red-500 group-hover:translate-y-0 group-hover:translate-x-0"
          ></span>

          <span class="relative block px-8 py-3 bg-white border border-current">
            <router-link to="/">Go Home</router-link>
          </span>
        </Link>
      </button>
    </main>)
}

export default NoPage