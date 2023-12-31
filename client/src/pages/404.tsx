import React from "react";
import Link from "next/link";

function NoPage() {
  return (
    <main className="h-full w-full flex flex-col justify-center items-center bg-white">
      <h1 className="text-9xl font-extrabold text-primary tracking-widest">
        404
      </h1>
      <div className="bg-red-500 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <div className="mt-5">
        <Link
          className="relative inline-block text-sm font-medium text-red-500 group active:text-red-500 focus:outline-none focus:ring border-2 border-red-500 px-8 py-2"
          href={"/dashboard"}
        >
          Return to Dashboard
        </Link>
      </div>
    </main>
  );
}

export default NoPage;
