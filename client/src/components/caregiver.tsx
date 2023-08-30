import { useApp } from "@/context/app";
import { menteeOnboardingSchema } from "@/schema/onboarding";
import countryList from "@/utils/countryList";
import { diseaseLabels } from "@/utils/enumToLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

type FormValues = z.infer<typeof menteeOnboardingSchema>;

const Caregiver = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");

  const { session } = useApp();
  const queryClient = useQueryClient();
  const router = useRouter();
  const supabase = useSupabaseClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      role: "MENTEE",
    },
    resolver: zodResolver(menteeOnboardingSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      if (file && session) {
        await supabase.storage
          .from("avatars")
          .upload(session?.user.id, file, { upsert: true });
      }
      z;
      const response = await fetch("/api/on-boarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          isMentee: true,
        }),
      });

      await response.json();
      toast.success("Onboarding Completed");
      queryClient.invalidateQueries(["profile", session?.user.id]);
      router.push("/dashboard");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const focusStyle =
    "transition-all focus:bg-transparent focus:border-b-2 focus:rounded-none focus:border-b-caring focus:border-0";
  const selectFocusStyle = "focus:bg-white focus:border w-52";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <div className="h-72">
            <div className="w-full h-36 bg-gradient-to-r from-green-100 to-pink-200"></div>{" "}
            <label>
              {file || url ? (
                <img
                  className="absolute p-0 rounded-full top-24 left-20 w-36 h-36 ring-4 ring-gray-300 dark:ring-gray-500"
                  src={!!file ? URL.createObjectURL(file) : url}
                  alt="default jpeg"
                  width={192}
                  height={192}
                />
              ) : (
                <img
                  className="absolute p-0 rounded-full top-24 left-20 w-36 h-36 ring-4 ring-gray-300 dark:ring-gray-500"
                  src="default.jpeg"
                  alt="default jpeg"
                  width={192}
                  height={192}
                />
              )}
              <input
                title="file"
                type="file"
                name="image"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setFile(file);
                  }
                }}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col items-start justify-around w-full px-1 py-10 mb-8 lg:flex-row md:px-4">
          <div className="font-poppins text-2xl font-[500] mr-8 w-full lg:w-2/6 text-center lg:text-start mb-4 lg:mb-0">
            PERSONAL DETAILS
          </div>
          <div className="grid content-center w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-4 lg:w-4/6">
            <div className="flex flex-col items-center justify-center sm:justify-start sm:items-start">
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${focusStyle} ${
                  errors.firstName ? " border border-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <p className="mt-2 text-red-500">First Name is required</p>
              )}
            </div>
            <div className="flex flex-col items-center justify-center sm:justify-start sm:items-start">
              <input
                type="text"
                placeholder="Middle Name"
                {...register("middleName", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${focusStyle} ${
                  errors.middleName ? " border border-red-500" : ""
                }`}
              />
              {errors.middleName && (
                <p className="mt-2 text-red-500">Middle Name is required</p>
              )}
            </div>
            <div className="flex flex-col items-center justify-center sm:justify-start sm:items-start">
              <input
                type="text"
                placeholder="Last Name"
                {...register("lastName", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${focusStyle} ${
                  errors.lastName ? " border border-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <p className="mt-2 text-red-500">Last Name is required</p>
              )}
            </div>
            <div className="flex flex-col items-center justify-center sm:justify-start sm:items-start">
              <input
                type="date"
                placeholder="Date of Birth"
                {...register("dob", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 w-52 h-[48px] rounded-xl ${focusStyle} ${
                  errors.dob ? " border border-red-500" : ""
                }`}
              />
              {errors.dob && (
                <p className="mt-2 text-red-500">Age is required</p>
              )}
            </div>
            <div className="flex flex-col items-center justify-center sm:justify-start sm:items-start">
              <select
                title="gender"
                id="gender"
                {...register("gender", { required: true })}
                defaultValue={"Gender"}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${selectFocusStyle} ${
                  errors.gender ? " border border-red-500" : ""
                }`}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="mt-2 text-red-500">Gender is required</p>
              )}
            </div>
          </div>
        </div>
        <hr />
        <div className="flex flex-col items-start justify-around w-full px-4 py-10 mb-8 lg:flex-row">
          <div className="font-poppins uppercase text-2xl font-[500] mr-8 w-full lg:w-2/6 text-center lg:text-start mb-4 lg:mb-0">
            Contact Information
          </div>
          <div className="grid content-center w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-4 lg:w-4/6">
            <div className="flex flex-col items-center justify-center sm:justify-start sm:items-start">
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${focusStyle} ${
                  errors.email ? " border border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="mt-2 text-red-500">Email is required</p>
              )}
            </div>
            <div className="flex flex-col items-center justify-center sm:justify-start sm:items-start">
              <input
                type="text"
                placeholder="Mobile Number"
                {...register("phone", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${focusStyle} ${
                  errors.phone ? " border border-red-500" : ""
                }`}
              />
              {errors.phone && (
                <p className="mt-2 text-red-500">Mobile Number is required</p>
              )}
            </div>
          </div>
        </div>

        <hr />
        <div className="flex flex-col items-start justify-around w-full px-4 py-10 mb-8 lg:flex-row">
          <div className="font-poppins uppercase text-2xl font-[500] mr-8 w-full lg:w-2/6 text-center lg:text-start mb-4 lg:mb-0">
            Address Details
          </div>
          <div className="grid content-center w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-4 lg:w-4/6">
            <div className="flex flex-col items-center justify-center sm:justify-start sm:items-start">
              <input
                type="text"
                placeholder="Address Line 1"
                {...register("address1", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${
                  errors.address1 ? " border border-red-500" : ""
                }`}
              />
              {errors.address1 && (
                <p className="mt-2 text-red-500">Address Line 1 is required</p>
              )}
            </div>

            <div className="flex flex-col items-center justify-center sm:justify-start sm:items-start">
              <input
                type="text"
                placeholder="Address Line 2"
                {...register("address2")}
                className="font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl"
              />
            </div>

            <div className="flex flex-col items-center justify-center sm:justify-start sm:items-start">
              <input
                type="text"
                placeholder="City"
                {...register("city", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${
                  errors.city ? " border border-red-500" : ""
                }`}
              />
              {errors.city && (
                <p className="mt-2 text-red-500">City is required</p>
              )}
            </div>

            <div className="flex flex-col items-center justify-center sm:justify-start sm:items-start">
              <input
                type="text"
                placeholder="State"
                {...register("state", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${
                  errors.state ? " border border-red-500" : ""
                }`}
              />
              {errors.state && (
                <p className="mt-2 text-red-500">State is required</p>
              )}
            </div>

            <div className="flex flex-col items-center justify-center sm:justify-start sm:items-start">
              <input
                type="text"
                placeholder="Zip"
                {...register("zip", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${
                  errors.zip ? " border border-red-500" : ""
                }`}
              />
              {errors.zip && (
                <p className="mt-2 text-red-500">Zip is required</p>
              )}
            </div>

            <div className="flex flex-col items-center justify-center sm:justify-start sm:items-start">
              <select
                style={{ width: "209px" }}
                title="country"
                {...register("country", { required: true })}
                className={`font-poppins text-xs bg-[#ECEEED] px-4 h-[48px] rounded-xl ${
                  errors.country ? " border border-red-500" : ""
                }`}
              >
                <option value={""}>Select Country</option>
                {countryList.map((country) => (
                  <option
                    value={country}
                    key={country}
                    selected={country === "United States of America (the)"}
                  >
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="mt-2 text-red-500">Country is required</p>
              )}
            </div>
          </div>
        </div>

        <hr />
        <div className="flex flex-col items-start justify-around w-full px-4 py-10 mb-8 lg:flex-row">
          <div className="font-poppins text-2xl font-[500] mr-8 w-full lg:w-2/6 text-center lg:text-start mb-4 lg:mb-0">
            LOVED ONE INFORMATION
          </div>
          <div className="flex flex-col w-full lg:w-4/6">
            <div className="grid content-center w-full grid-cols-1 mb-4 sm:grid-cols-2 md:grid-cols-3 gap-x-30 gap-y-4">
              <div className="flex flex-col items-center justify-center sm:justify-start sm:items-start">
                <input
                  type="text"
                  placeholder="Name"
                  {...register("patientName", { required: true })}
                  className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${focusStyle} ${
                    errors.patientName ? " border border-red-500" : ""
                  }`}
                />
                {errors.patientName && (
                  <p className="mt-2 text-red-500">Name is required</p>
                )}
              </div>
              <div className="flex flex-col items-center justify-center sm:justify-start sm:items-start">
                <select
                  title="condition"
                  id="condition"
                  {...register("condition", { required: true })}
                  defaultValue={"Condition of Patient"}
                  className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${selectFocusStyle} ${
                    errors.condition ? " border border-red-500" : ""
                  }`}
                >
                  <option value="">Select Disease</option>
                  {diseaseLabels.map((d) => (
                    <option value={d.value} key={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
                {errors.condition && (
                  <p className="mt-2 text-red-500">Condition is required</p>
                )}
              </div>
              <div className="flex flex-col items-center justify-center sm:justify-start sm:items-start">
                <select
                  title="relationship"
                  id="relationship"
                  {...register("relation", { required: true })}
                  defaultValue={"Relationship to Patient"}
                  className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${selectFocusStyle} ${
                    errors.relation ? " border border-red-500" : ""
                  }`}
                >
                  <option value="">Select Relationship</option>
                  <option value="mother">Mother</option>
                  <option value="father">Father</option>
                  <option value="son">Son</option>
                  <option value="daughter">Daughter</option>
                  <option value="wife">Wife</option>
                  <option value="husband">Husband</option>
                  <option value="husband">Other</option>
                </select>
                {errors.relation && (
                  <p className="mt-2 text-red-500">Relationship is required</p>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full col-span-3 gap-4 mt-6">
              <div className="text-[#5E5E5E] text-xl font-poppins">
                Years of Caregiving
              </div>
              <div className="flex items-center justify-between w-3/5">
                <div className="flex items-center justify-center gap-4">
                  <input
                    type="radio"
                    id="0-2"
                    title="experience"
                    value="LESS_THAN_2"
                    {...register("experience", { required: true })}
                    className={`mr-2 accent-caring w-5 aspect-square ${
                      errors.experience ? "border border-red-500" : ""
                    }`}
                  />
                  <label htmlFor="0-2">0 - 2 Years</label>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <input
                    type="radio"
                    id="2-4"
                    title="experience"
                    value="BETWEEN_2_AND_4"
                    {...register("experience", { required: true })}
                    className={`mr-2 accent-caring w-5 aspect-square ${
                      errors.experience ? "border border-red-500" : ""
                    }`}
                  />
                  <label htmlFor="2-4">2 - 4 Years</label>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <input
                    type="radio"
                    id="4+"
                    title="experience"
                    value="MORE_THAN_4"
                    {...register("experience", { required: true })}
                    className={`mr-2 accent-caring w-5 aspect-square ${
                      errors.experience ? "border border-red-500" : ""
                    }`}
                  />
                  <label htmlFor="4+">4+ Years</label>
                </div>
              </div>
              {errors.experience && (
                <p className="mt-2 text-red-500">
                  Years of Caregiving is required
                </p>
              )}
            </div>

            <div className="flex flex-col col-span-3 gap-2 mt-8">
              <div className="text-[#5E5E5E] text-xl font-poppins">
                Tell us Your Story
              </div>
              <div className="w-full">
                <textarea
                  title="synopsis"
                  id="synopsis"
                  {...register("synopsis", { required: true })}
                  className={`resize-none w-full h-40 rounded-xl p-2 border-2 border-inactive ${
                    errors.synopsis ? " border border-red-500" : ""
                  }`}
                ></textarea>
              </div>
            </div>
            <div className="col-span-3 mt-8 text-center ">
              <button
                className="flex items-center gap-2 p-3 mx-auto font-normal text-white bg-caring rounded-xl font-poppins"
                type="submit"
              >
                <p className="text-3xl">Complete Onboarding</p>
                <div className="scale-[2]">
                  <ChevronRightIcon />
                </div>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Caregiver;
