import React from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  fName: string;
  mName: string;
  lName: string;
  age: string;
  gender: string;
  email: string;
  phone: string;
  lovedOneName: string;
  condition: string;
  relationship: string;
  synopsis: string;
};

const Caregiver = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex py-10 justify-around items-start w-full px-4 mb-8">
          <div className="font-poppins text-2xl font-[500] mr-8 w-2/6">
            PERSONAL DETAILS
          </div>
          <div className="grid grid-cols-3 gap-x-20 gap-y-4 w-4/6">
            <div>
              <input
                type="text"
                placeholder="First Name"
                {...register("fName", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${
                  errors.fName ? " border border-red-500" : ""
                }`}
              />
              {errors.fName && (
                <p className="text-red-500 mt-2">First Name is required</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Middle Name"
                {...register("mName", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${
                  errors.mName ? " border border-red-500" : ""
                }`}
              />
              {errors.mName && (
                <p className="text-red-500 mt-2">Middle Name is required</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                {...register("lName", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${
                  errors.lName ? " border border-red-500" : ""
                }`}
              />
              {errors.lName && (
                <p className="text-red-500 mt-2">Last Name is required</p>
              )}
            </div>
            <div>
              <input
                type="number"
                placeholder="Age"
                {...register("age", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${
                  errors.age ? " border border-red-500" : ""
                }`}
              />
              {errors.age && (
                <p className="text-red-500 mt-2">Age is required</p>
              )}
            </div>
            <div>
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
        <div className="flex py-10 justify-around items-start w-full px-4 mb-8">
          <div className="font-poppins text-2xl font-[500] mr-8 w-2/6">
            Contact Information
          </div>
          <div className="grid grid-cols-3 gap-x-20 gap-y-4 w-4/6">
            <div>
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
            <div>
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
        <div className="flex py-10 justify-around items-start w-full px-4 mb-8">
          <div className="font-poppins text-2xl font-[500] mr-8 w-2/6">
            LOVED ONE INFORMATION
          </div>
          <div className="grid grid-cols-3 gap-x-20 gap-y-4 w-4/6">
            <div>
              <input
                type="text"
                placeholder="Name"
                {...register("lovedOneName", { required: true })}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${
                  errors.lovedOneName ? " border border-red-500" : ""
                }`}
              />
              {errors.lovedOneName && (
                <p className="text-red-500 mt-2">Name is required</p>
              )}
            </div>
            <div>
              <select
                title="condition"
                id="condition"
                {...register("condition", { required: true })}
                defaultValue={"Loved One Condition"}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${
                  errors.condition ? " border border-red-500" : ""
                }`}
              >
                <option value="Multiple Myeloma">Multiple Myeloma</option>
                <option value="Alzheimer’s Disease">Alzheimer’s Disease</option>
                <option value="Parkinson’s Disease">Parkinson’s Disease</option>
                <option value="Stroke">Stroke</option>
                <option value="ALS">ALS</option>
              </select>
              {errors.condition && (
                <p className="text-red-500 mt-2">Condition is required</p>
              )}
            </div>
            <div>
              <select
                title="relationship"
                id="relationship"
                {...register("relationship", { required: true })}
                defaultValue={"Relationship to Patient"}
                className={`font-poppins bg-[#ECEEED] px-4 h-[48px] rounded-xl ${
                  errors.relationship ? " border border-red-500" : ""
                }`}
              >
                <option value="mother">Mother</option>
                <option value="father">Father</option>
                <option value="son">Son</option>
                <option value="daughter">Daughter</option>
                <option value="wife">Wife</option>
                <option value="husband">Husband</option>
              </select>
              {errors.relationship && (
                <p className="text-red-500 mt-2">Relationship is required</p>
              )}
            </div>
            <div className="w-full col-span-3">
              <div>Years of Caregiving</div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex justify-center items-center">
                  <input type="checkbox" name="2" id="two" className="mr-2" />
                  <label htmlFor="two">0 - 2 Years</label>
                </div>
                <div className="flex justify-center items-center">
                  <input type="checkbox" name="4" id="four" className="mr-2" />
                  <label htmlFor="four">2 - 4 Years</label>
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type="checkbox"
                    name="6"
                    id="plus"
                    className={`mr-2 ${
                      errors.age ? " border border-red-500" : ""
                    }`}
                  />
                  <label htmlFor="plus">4+ Years</label>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="text-[#5E5E5E] text-[16px] font-poppins font-[400] mb-2">
                Synopsis of Patient Condition
              </div>
              <div className="w-full">
                <textarea
                  title="synopsis"
                  id="synopsis"
                  {...register("synopsis", { required: true })}
                  className={`resize-none w-full h-40 rounded-md p-2 border-2 border-inactive ${
                    errors.synopsis ? " border border-red-500" : ""
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
      </form>
    </>
  );
};

export default Caregiver;
