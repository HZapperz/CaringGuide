import { mentorOnboardingSchema } from "@/schema/onboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormValues = z.infer<typeof mentorOnboardingSchema>;

const Guide = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(mentorOnboardingSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex lg:flex-row flex-col py-10 justify-around items-start w-full px-1 md:px-4 mb-8">
          <div className="font-poppins text-2xl font-[500] mr-8 w-full lg:w-2/6 text-center lg:text-start mb-4 lg:mb-0">
            PERSONAL DETAILS
          </div>
          <div className="grid content-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-4 w-full lg:w-4/6">
            <div className="flex sm:justify-start justify-center sm:items-start items-center">
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${
                  errors.firstName ? " border border-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 mt-2">First Name is required</p>
              )}
            </div>
            <div className="flex sm:justify-start justify-center sm:items-start items-center">
              <input
                type="text"
                placeholder="Middle Name"
                {...register("middleName", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${
                  errors.middleName ? " border border-red-500" : ""
                }`}
              />
              {errors.middleName && (
                <p className="text-red-500 mt-2">Middle Name is required</p>
              )}
            </div>
            <div className="flex sm:justify-start justify-center sm:items-start items-center">
              <input
                type="text"
                placeholder="Last Name"
                {...register("lastName", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${
                  errors.lastName ? " border border-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 mt-2">Last Name is required</p>
              )}
            </div>
            <div className="flex sm:justify-start justify-center sm:items-start items-center">
              <input
                type="date"
                placeholder="Date of Birth"
                {...register("dob", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${
                  errors.dob ? " border border-red-500" : ""
                }`}
              />
              {errors.dob && (
                <p className="text-red-500 mt-2">Age is required</p>
              )}
            </div>
            <div className="flex sm:justify-start justify-center sm:items-start items-center">
              <select
                title="gender"
                id="gender"
                {...register("gender", { required: true })}
                defaultValue={"Gender"}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${
                  errors.gender ? " border border-red-500" : ""
                }`}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="rather">Rather not Say</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 mt-2">Gender is required</p>
              )}
            </div>
          </div>
        </div>
        <hr />
        <div className="flex lg:flex-row flex-col py-10 justify-around items-start w-full px-4 mb-8">
          <div className="font-poppins text-2xl font-[500] mr-8 w-full lg:w-2/6 text-center lg:text-start mb-4 lg:mb-0">
            Contact Information
          </div>
          <div className="grid content-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-4 w-full lg:w-4/6">
            <div className="flex sm:justify-start justify-center sm:items-start items-center">
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${
                  errors.email ? " border border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 mt-2">Email is required</p>
              )}
            </div>
            <div className="flex sm:justify-start justify-center sm:items-start items-center">
              <input
                type="text"
                placeholder="Mobile Number"
                {...register("phone", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${
                  errors.phone ? " border border-red-500" : ""
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 mt-2">Mobile Number is required</p>
              )}
            </div>
          </div>
        </div>
        <hr />
        <div className="flex lg:flex-row flex-col py-10 justify-around items-start w-full px-4 mb-8">
          <div className="font-poppins text-2xl font-[500] mr-8 w-2/6">
            EXPERIENCE
          </div>
          <div className="grid grid-cols-1 gap-x-20 gap-y-4 w-4/6">
            <div>
              <select
                title="condition"
                id="condition"
                {...register("conditions", { required: true })}
                defaultValue={"Loved One Condition"}
                className={`font-poppins bg-[#ECEEED] p-1 h-fit rounded-md ${
                  errors.conditions ? " border border-red-500" : ""
                }`}
              >
                <option value="good">Good</option>
                <option value="bad">Bad</option>
                <option value="worse">Worse</option>
              </select>
              {errors.conditions && (
                <p className="text-red-500 mt-2">Condition is required</p>
              )}
            </div>
            <div>
              <div className="w-full col-span-3">
                <div>Years of Caregiving</div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex justify-center items-center">
                    <input type="checkbox" name="2" id="two" className="mr-2" />
                    <label htmlFor="two">0 - 2 Years</label>
                  </div>
                  <div className="flex justify-center items-center">
                    <input
                      type="checkbox"
                      name="4"
                      id="four"
                      className="mr-2"
                    />
                    <label htmlFor="four">2 - 4 Years</label>
                  </div>
                  <div className="flex justify-center items-center">
                    <input
                      type="checkbox"
                      name="6"
                      id="plus"
                      className={`mr-2 ${
                        errors.experience ? " border border-red-500" : ""
                      }`}
                    />
                    <label htmlFor="plus">4+ Years</label>
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <div className="text-[#5E5E5E] text-[16px] font-poppins font-[400] mb-2">
                  Short About Section
                </div>
                <div className="w-full">
                  <textarea
                    title="about"
                    id="about"
                    {...register("about", { required: true })}
                    className={`resize-none w-full h-40 rounded-md p-2 border-2 border-inactive ${
                      errors.about ? " border border-red-500" : ""
                    }`}
                  ></textarea>
                </div>
              </div>
              <div className="mt-8 col-span-3 text-center">
                <button
                  type="submit"
                  className="px-8 py-2 bg-caring font-poppins font-medium text-white text-2xl rounded-lg"
                >
                  Complete Onboarding
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Guide;
