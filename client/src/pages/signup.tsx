import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { registerSchema } from "../schema/auth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import useHandleErrors from "@/hooks/useHandleErrors";
import { useApp } from "@/context/app";
import { useEffect } from "react";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleErrors = useHandleErrors();

  const onSubmit = async (data: FormData) => {
    try {
      const result = registerSchema.parse(data);

      const { error } = await supabase.auth.signUp({
        email: result.email,
        password: result.password,
      });

      if (error) {
        return toast.error(error.message);
      } else {
        toast.success("Kindly check your email for verification.");
      }

      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (error) {
      handleErrors(error);
    }
  };

  useEffect(() => {
    if (!!session) {
      router.replace("/dashboard");
      return;
    }
  }, [session]);

  return (
    <div className="h-full bg-[url('../../public/images/trailguide.png')] bg-no-repeat bg-cover bg-center bg-fixed">
      <div className="pt-40 background-image: linear-gradient(115deg, #9F7AEA, #FEE2FE) overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col w-10/12 mx-auto bg-black shadow-lg lg:flex-row lg:w-8/12 bg-opacity-80 rounded-xl">
            <div className="absolute w-20 p-5">
              <Link href={"/"}>
                <ChevronLeftIcon color="white" />
              </Link>
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
                  href="#"
                  className="font-semibold text-white underline font-poppins"
                >
                  Click to learn more
                </a>
                <div className="mt-8 text-white font-poppins">
                  <a> </a>Have an account?{" "}
                  <Link href="/signin" className="font-semibold text-caring">
                    Login
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full px-12 py-16 lg:w-1/2">
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
                    <a href="#" className="font-semibold text-caring">
                      Terms of Use
                    </a>{" "}
                    &{" "}
                    <a href="#" className="font-semibold text-caring">
                      Privacy Policy
                    </a>
                  </span>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full py-3 text-center text-white bg-caring rounded-xl"
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
