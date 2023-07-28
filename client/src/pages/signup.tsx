import React, { useEffect } from "react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { registerSchema } from "../schema/auth";
import { AuthApiError } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
};

const Welcome = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const result = registerSchema.parse(data);

      await supabase.auth.signUp({
        email: result.email,
        password: result.password,
      });

      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (err) {
      if (err instanceof AuthApiError) {
        console.error(err.message);
      } else if (err instanceof ZodError) {
        console.error(fromZodError(err).toString());
      } else {
        console.error("Something went wrong.");
      }
    }
  };

  return (
    <div className="h-full bg-[url('../../public/images/signinBG.png')] bg-no-repeat bg-cover bg-center bg-fixed">
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-6">
                  <input
                    type="text"
                    placeholder="Email"
                    {...register("email", { required: true })}
                    className={`border-2 ${
                      errors.email ? "border-caring" : "border-white"
                    } placeholder:text-white bg-[#eceeed] bg-opacity-40 py-2 px-4 rounded-xl w-full`}
                  />
                </div>
                <div className="mt-6">
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                    className={`border-2 ${
                      errors.password ? "border-caring" : "border-white"
                    } placeholder:text-white bg-[#eceeed] bg-opacity-40 py-2 px-4 rounded-xl w-full`}
                  />
                </div>
                <div className="mt-6">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", { required: true })}
                    className={`border-2 ${
                      errors.confirmPassword ? "border-caring" : "border-white"
                    } placeholder:text-white bg-[#eceeed] bg-opacity-40 py-2 px-4 rounded-xl w-full`}
                  />
                </div>
                <div className="mt-6">
                  <input
                    title={"checkbox"}
                    type="checkbox"
                    {...register("acceptedTerms")}
                    className={`border-2 ${
                      errors.acceptedTerms ? "border-caring" : "border-white"
                    } placeholder:text-white bg-[#eceeed] bg-opacity-40 py-2 px-4 rounded-xl`}
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
                  <button
                    type="submit"
                    className="w-full bg-caring py-3 text-center text-white rounded-xl"
                  >
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
