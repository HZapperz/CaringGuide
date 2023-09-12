import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useApp } from "@/context/app";
import { useEffect } from "react";

type SignInFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { session } = useApp();
  const supabase = useSupabaseClient();
  const form = useForm<SignInFormValues>();
  const { handleSubmit } = form;
  const router = useRouter();

  async function handleLogin(data: SignInFormValues) {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged in successfully. Redirecting...");
    }
  }

  useEffect(() => {
    if (!!session) {
      router.replace("/dashboard");
      return;
    }
  }, [session]);

  return (
    <div className="h-screen bg-[url('../../public/images/waterhike.jpg')] bg-no-repeat bg-cover bg-center flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-100 ">
        <div className="text-center font-poppins text-4xl font-medium text-[#4E4E4E] mb-8">
          LOG IN
        </div>

        <button
          type="button"
          className="flex justify-between items-center bg-[#FFFFFF] text-white w-full px-4 py-2 border border-[#4E4E4E] rounded-lg mb-4"
          onClick={() =>
            supabase.auth.signInWithOAuth({
              provider: "google",
            })
          }
        >
          <p className="mr-2 font-poppins font-medium text-[#4E4E4E]">
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

        <div className="flex justify-center items-center w-full my-4">
          <hr className="w-1/3" />
          <span className="text-[#4E4E4E] text-center font-poppins text-xl font-medium mx-2">
            or
          </span>
          <hr className="w-1/3" />
        </div>

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-[#4E4E4E] text-left font-poppins text-xl font-medium"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="EMAIL"
              {...form.register("email")}
              className="mt-2 w-full border-2 border-[#4E4E4E] rounded-xl py-2 px-3"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-[#4E4E4E] text-left font-poppins text-xl font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="PASSWORD"
              {...form.register("password")}
              className="mt-2 w-full border-2 border-[#4E4E4E] rounded-xl py-2 px-3"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center text-[#245B48] border-2 border-[#245B48] rounded-2xl py-2 px-4 font-poppins font-medium text-xl"
          >
            Log In
          </button>

          <div className="mt-4 text-center">
            <span className="font-poppins text-2xl font-medium text-[#4E4E4E]">
              {`Don't have an account? `}
              <Link href="/signup" className="font-semibold text-caring">
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
