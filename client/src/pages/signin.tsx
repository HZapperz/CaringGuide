import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

type SignInFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const supabase = useSupabaseClient();
  const form = useForm<SignInFormValues>();
  const router = useRouter();

  async function handleLogin(data: SignInFormValues) {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      console.log(error);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="flex flex-col w-screen h-full">
      <div className="flex h-full w-full">
        <div className="h-full w-[50%] lg:block hidden">
          <div className="h-full bg-[url('../../public/images/signinBG.png')] bg-no-repeat bg-cover bg-center"></div>
        </div>
        <div className="lg:w-[50%] w-full h-full bg-white flex flex-col justify-center items-center">
          <div className="text-[#4E4E4E] text-center font-poppins text-4xl font-medium leading-normal">
            LOG IN
          </div>
          <div className="mt-6 w-full flex justify-center items-center">
            <button
              type="button"
              className="flex justify-between items-center bg-[#FFFFFF] text-white px-8 py-2 lg:px-8 lg:py-4 rounded-lg tracking-normal text-left w-[400px] sm:w-[500px] border  border-[#4E4E4E]"
              onClick={() =>
                supabase.auth.signInWithOAuth({
                  provider: "google",
                })
              }
            >
              <p className="mr-6 font-poppins font-medium text-xl text-[#4E4E4E]">
                Log In With Google
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 533.5 544.3"
                className="w-6 h-6"
              >
                <path
                  fill="#4E4E4E"
                  d="M533.5 278.4c0-19.4-1.6-38.3-4.6-56.7H272.2v107.2h149.7c-6.2 33.6-24.3 62.1-51.5 80.7v66h83.4c48.9-45.1 76.8-111.7 76.8-197.2z"
                />
                <path
                  fill="#4E4E4E"
                  d="M272.2 544.3c69.7 0 128.1-22.9 170.7-62.4l-83.4-66c-23.2 15.6-52.9 24.8-87.3 24.8-66.8 0-123.4-45.1-143.8-105.7H38.6v66c42.6 83.4 128.1 138.3 233.6 138.3z"
                />
                <path
                  fill="#4E4E4E"
                  d="M128.4 324.1a162.2 162.2 0 0 1-8.9-51.3c0-17.8 3-35.1 8.9-51.3V155H38.6a278.2 278.2 0 0 0 0 234.3l89.8-65.2z"
                />
                <path
                  fill="#4E4E4E"
                  d="M272.2 107.7c37.9 0 72.3 13.1 99.2 34.1l75.1-75.1C400.3 22.9 341.9 0 272.2 0 166.7 0 81.2 54.9 38.6 138.3l89.8 65.2c20.4-60.6 77-105.7 143.8-105.7z"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-center items-center w-[400px] sm:w-[500px] mt-8">
            <hr className="w-full" />
            <p className="text-[#4E4E4E] text-center font-poppins text-xl font-medium leading-normal mx-2">
              or
            </p>
            <hr className="w-full" />
          </div>
          <div>
            <form {...form} onSubmit={form.handleSubmit(handleLogin)}>
              <div className="mt-6 flex flex-col">
                <label
                  htmlFor="email"
                  className="text-[#4E4E4E] text-left font-poppins text-xl font-medium leading-normal"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="EMAIL"
                  {...form.register("email")}
                  className="border-2 border-[#4E4E4E] placeholder-[#4e4e4e50] placeholder:font-poppins bg-[#FFFFFF] bg-opacity-40 py-4 px-4 w-[400px] sm:w-[500px] rounded-xl"
                />
              </div>
              <div className="mt-6 flex flex-col">
                <label
                  htmlFor="password"
                  className="text-[#4E4E4E] text-left font-poppins text-xl font-medium leading-normal"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="PASSWORD"
                  {...form.register("password")}
                  className="border-2 border-[#4E4E4E] placeholder-[#4e4e4e50] bg-[#FFFFFF] placeholder:font-poppins bg-opacity-40 py-4 px-4 w-[400px] sm:w-[500px] rounded-xl"
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="flex justify-center items-center text-[#245B48] border-2 border-[#245B48] rounded-2xl px-4 py-4 lg:px-8 lg:py-4 mt-2 font-poppins font-medium text-xl tracking-normal text-left w-full"
                >
                  Log In
                </button>
              </div>
              <div className="mt-6">
                <div className="text-[#4E4E4E] text-center font-poppins text-2xl font-medium leading-normal">
                  {`Don't have an account? `}
                  <Link href="/signup" className="text-caring font-semibold">
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
