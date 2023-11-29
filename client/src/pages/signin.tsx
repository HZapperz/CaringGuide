import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useApp } from "@/context/app";
import { useEffect, useState } from "react";
import ForgotPassword from "./forgotpassword";


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
          return toast.error("Your account is not verified. Please verify your email.");
        } else {
          return toast.error(error.message);
        }
      } else {
        toast.success("Successfully logged in!");
      }
    } catch (error) {
      console.error("Login error", error);
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
  const navigateToForgotPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/forgotpassword');
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
                  {/* Google Icon */}
                </div>
              </>
            )}
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
            <div className="text-right">
              <Link href="/forgotpassword">
                Forgot Password?
              </Link>
            </div>

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
                Sign Up
              </Link>
            </span>
          </div>

        </form>
      </div>
    </div>
  );
  
  };

  export default Login;