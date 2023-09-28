import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useApp } from "@/context/app";
import { useEffect } from "react";
import { useState } from "react";
import useHandleErrors from "@/hooks/useHandleErrors";


type SignInFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { session, profile, isLoading } = useApp();
  const supabase = useSupabaseClient();
  const form = useForm<SignInFormValues>();
  const { handleSubmit } = form;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleErrors = useHandleErrors();


  async function handleLogin(data: SignInFormValues) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
  
      if (error) {
        if (error.message.includes("credentials")) {
          return toast.error("Invalid login credentials. Please try again.");
        } else if (error.message.includes("verified")) {
          return toast.error(
            "Your account is not verified. Please verify your email."
          );
        } else {
          return toast.error(error.message);
        }
      } else {
        toast.success("Successfully logged in!");
      }
    } catch (error) {
      console.error("Login error", error);
      // Remove this toast.error line for testing
      // toast.error("An unexpected error occurred. Please try again.");
    }
  }
  

  useEffect(() => {
    if (session && profile) {
      router.replace("/dashboard");
      return;
    }
  }, [session, profile]);
  

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await supabase.auth.signInWithOAuth({ provider: "google" });
    } catch (error) {
      console.error("Sign-in error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[url('../../public/images/waterhike.jpg')] bg-no-repeat bg-cover bg-center flex items-center justify-center">
      <div className="bg-black bg-opacity-80 p-8 rounded-xl shadow-md w-[450px]">
        <div className="text-center font-poppins text-2xl font-medium text-white mb-4">
          Welcome back to Caring Guide!
        </div>
        <div className="text-center font-poppins text-4xl font-medium text-white mb-8">
          LOG IN
        </div>
        <div className="flex justify-center items-center w-full">
          <button
            type="button"
            className="flex justify-between items-center bg-[#FFFFFF] text-white px-6 py-2 lg:px-6 lg:py-3 rounded-full tracking-normal text-left w-[250px] sm:w-[350px] border border-[#4E4E4E]"
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <span>Loading...</span>
            ) : (
              <>
                <div className="flex justify-between items-center w-full">
                  <p className="mr-4 font-poppins font-medium text-lg text-[#4E4E4E]">
                    Sign In With Google
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 533.5 544.3"
                    className="w-5 h-5"
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
                </div>
              </>
            )}
            ;
          </button>
        </div>
        <div className="flex justify-center items-center w-full my-4">
          <hr className="w-1/3" />
          <span className="text-white text-center font-poppins text-xl font-medium mx-2">
            or
          </span>
          <hr className="w-1/3" />
        </div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white text-left font-poppins text-xl font-medium"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              {...form.register("email")}
              className="mt-2 w-full border-2 border-white bg-[#eceeed] bg-opacity-40 rounded-xl py-2 px-3 placeholder:text-white"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-white text-left font-poppins text-xl font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              {...form.register("password")}
              className="mt-2 w-full border-2 border-white bg-[#eceeed] bg-opacity-40 rounded-xl py-2 px-3 placeholder:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-center text-white bg-caring rounded-xl"
          >
            Log In
          </button>

          <div className="mt-4 text-center">
            <span className="font-poppins text-2xl font-medium text-white">
              {`Don't have an account? `}
              <Link href="/signup">
                <span className="font-semibold underline text-caring">
                  Sign Up
                </span>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;