import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { registerSchema } from "../schema/auth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import useHandleErrors from "@/hooks/useHandleErrors";
import { useApp } from "@/context/app";
import { useState, useEffect } from "react";
import { ZodError } from "zod";

type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
};

const Welcome = () => {
  const { session } = useApp();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [isEmailClicked, setEmailClicked] = useState(false);
  const [isPasswordClicked, setPasswordClicked] = useState(false);
  const [isPasswordConfirmClicked, setPasswordConfirmedClicked] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleErrors = useHandleErrors();

  function getFriendlyErrorMessage(error: any) {
    if (error instanceof ZodError) {
      for (const err of error.errors) {
        if (
          err.message.includes("String must contain at least 6 character(s)") &&
          err.path.includes("password")
        ) {
          return "Your password isn't strong enough! Make sure it's at least 6 characters long.";
        } else if (
          err.message.includes("Passwords do not match") &&
          err.path.includes("confirmPassword")
        ) {
          return "The passwords you entered do not match. Please try again.";
        } else if (
          err.code === "invalid_string" &&
          err.path.includes("email")
        ) {
          return "Hmm, that email doesn't seem right! Make sure it's valid and not already in use, then try again.";
        } else if (err.message.includes("User already registered")) {
          return "You seem to already have an account under this email. Try logging in instead.";
        } else if (
          err.message.includes("You must accept the terms and conditions") &&
          err.path.includes("acceptedTerms")
        ) {
          return "You must accept the terms and conditions.";
        }
      }
    }
    return "Oops! Something went wrong. Please try again.";
  }

  const onSubmit = async (data: FormData) => {
    try {
      const result = registerSchema.parse(data);

      const { error } = await supabase.auth.signUp({
        email: result.email,
        password: result.password,
      });

      if (error) {
        console.log("Error message from Supabase:", error.message);
        if (error.message.includes("User already registered")) {
          toast.error(
            "You seem to already have an account under this email. Try logging in instead.",
          );
        }

        // existing if-else conditions for Supabase errors...
      } else {
        toast.success("Success! Please check your email for verification.");
        setTimeout(() => {
          router.push("/welcome");
        }, 2000);
      }
    } catch (error) {
      console.error("Caught Error:", error);
      const friendlyMessage = getFriendlyErrorMessage(error);
      toast.error(friendlyMessage);
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed!", event, session);
      },
    );

    // Cleanup the listener when the component unmounts
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <div className="h-full bg-[url('../../public/images/dirthike.jpg')] bg-no-repeat bg-cover bg-center bg-fixed">
      <div className="pt-40 background-image: linear-gradient(115deg, #9F7AEA, #FEE2FE) overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col w-10/12 mx-auto bg-black shadow-lg lg:flex-row lg:w-8/12 bg-opacity-80 rounded-xl">
            <div className="absolute w-20 p-5">
              {/* <Link href={"/"}>
                <ChevronLeftIcon color="white" />
              </Link> */}
            </div>
            <div className="flex flex-col items-center justify-center w-full p-12 lg:w-1/2">
              <h1 className="text-white font-poppins text-5xl font-[600] mb-8">
                Welcome
              </h1>
              <div>
                <h2 className="text-white text-3xl text-start font-[500] tracking-wide font-poppins">
                  Register and get started with CaringGuide today!{" "}
                </h2>
                <a
                  href="https://caringguide.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white underline font-poppins"
                >
                  Click to learn more
                </a>

                <div className="mt-8 text-white font-poppins">
                  Already have an account?{" "}
                  <Link href="/signin">
                    <span className="font-semibold underline text-caring">
                      Login
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full px-12 py-16 lg:w-1/2">
              <button
                type="button"
                className="flex justify-between items-center bg-[#FFFFFF] google-button-hover text-white px-6 py-2 lg:px-6 lg:py-3 rounded-full tracking-normal text-left w-[250px] sm:w-[350px] border border-[#4E4E4E]"
                onClick={() =>
                  supabase.auth.signInWithOAuth({
                    provider: "google",
                  })
                }
              >
                <p className="mr-4 font-poppins font-medium text-lg text-[#4E4E4E]">
                  Sign Up With Google
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
              </button>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-6">
                  <input
                    type="text"
                    placeholder="Email"
                    {...register("email", { required: true })}
                    className={`border-2 ${
                      errors.email ? "border-caring" : "border-white"
                    } placeholder:text-grey bg-[#eceeed] bg-opacity-40 py-2 px-4 rounded-xl w-full
                    ${isEmailClicked ? "placeholder-smaller" : ""}`}
                    onClick={() => setEmailClicked(true)}
                    onBlur={() => setEmailClicked(false)}
                  />
                </div>
                <div className="mt-6">
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                    className={`border-2 ${
                      errors.password ? "border-caring" : "border-white"
                    } placeholder:text-grey bg-[#eceeed] bg-opacity-40 py-2 px-4 rounded-xl w-full
                    ${isPasswordClicked ? "placeholder-smaller" : ""}`}
                    onClick={() => setPasswordClicked(true)}
                    onBlur={() => setPasswordClicked(false)}
                  />
                </div>
                <div className="mt-6">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", { required: true })}
                    className={`border-2 ${
                      errors.confirmPassword ? "border-caring" : "border-white"
                    } placeholder:text-grey bg-[#eceeed] bg-opacity-40 py-2 px-4 rounded-xl w-full
                    ${isPasswordConfirmClicked ? "placeholder-smaller" : ""}`}
                    onClick={() => setPasswordConfirmedClicked(true)}
                    onBlur={() => setPasswordConfirmedClicked(false)}
                  />
                </div>
                <div className="mt-6">
                  <input
                    title={"checkbox"}
                    type="checkbox"
                    {...register("acceptedTerms")}
                    className={`border-2 ${
                      errors.acceptedTerms ? "border-caring" : "border-white"
                    } placeholder:text-white bg-[#eceeed] bg-opacity-40 py-2 px-4 rounded-xl checkbox-animation`}
                  />
                  <span className="text-white ml-2">
                    I accept the{" "}
                    <a
                      href="/terms-of-use"
                      className="font-semibold underline text-caring"
                    >
                      Terms of Use
                    </a>{" "}
                    &{" "}
                    <a
                      href="/privacy-policy"
                      className="font-semibold underline text-caring"
                    >
                      Privacy Policy
                    </a>
                  </span>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full py-3 text-center text-white bg-caring rounded-xl button-hover"
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
