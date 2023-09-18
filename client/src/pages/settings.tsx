import { WithOnBoarding } from "@/components/WithOnboarding";
import { useApp } from "@/context/app";
import useHandleErrors from "@/hooks/useHandleErrors";
import { updateProfileSchema } from "@/schema/onboarding";
import countryList from "@/utils/countryList";
import { diseaseLabels } from "@/utils/enumToLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Container,
  Input,
  Loading,
  Spacer,
  Text,
  Textarea,
} from "@nextui-org/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

const SettingsPage = () => {
  const [open, setOpen] = useState(false);
  const [saveButton, setSaveButton] = useState<React.ReactNode | string>(
    "Save"
  );
  const { session, ...data } = useApp();
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const profile = data.profile!;
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const { handleSubmit, control, register } = useForm<
    z.infer<typeof updateProfileSchema>
  >({
    resolver: zodResolver(updateProfileSchema),
    // @ts-ignore
    defaultValues: {
      ...profile, // @ts-ignore
      role: profile.role as "MENTOR" | "MENTEE",
      relation: profile.relationShipToPatient ?? undefined,
    },
  });

  const handleErrors = useHandleErrors();

  const onSubmit = async (data: any) => {
    console.log("onSubmit called");
    try {
      setSaveButton(<Loading size="xs" color={"white"} />); // Moved to the top

      if (!session?.user) {
        console.log("returning");
        return;
      }

      if (file) {
        await supabase.storage
          .from("avatars")
          .upload(session.user.id, file, { upsert: true });
      }

      console.log("Data:", data);
      await fetch("/api/user/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, avatar: session.user.id }),
      });

      setOpen(true);
      setSaveButton("Save");
      queryClient.invalidateQueries(["profile", session?.user.id]);
      toast.success("Profile Updated");
      window.location.href = "/dashboard";
    } catch (error) {
      handleErrors(error);
      setSaveButton("Save");
      console.error("Error in onSubmit:", error);
    }
  };

  const radioButtons = [
    {
      value: "LESS_THAN_2",
      label: "Less than 2 years",
    },
    {
      value: "BETWEEN_2_AND_4",
      label: "Between 2 and 4 years",
    },
    {
      value: "MORE_THAN_4",
      label: "More than 4 years",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        if (!profile.avatar) return;

        const { data, error } = await supabase.storage
          .from("avatars")
          .download(profile.avatar);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setUrl(url);
      } catch (error) {
        handleErrors(error);
      }
    })();
  }, [profile]);

  const containerStyle = {
    d: "flex",
    paddingLeft: "$64",
    alignItems: "center",
    gap: "$2xl",
    flexWrap: "nowrap",
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container css={{ ...containerStyle }}>
        <div className="flex gap-8 py-4 items-center">
          {file || url ? (
            <img
              className="p-0 rounded-full w-36 h-36 ring-4 ring-gray-300 dark:ring-gray-500"
              src={!!file ? URL.createObjectURL(file) : url}
              alt="default jpeg"
              width={192}
              height={192}
            />
          ) : (
            <img
              className="p-0 rounded-full w-36 h-36 ring-4 ring-gray-300 dark:ring-gray-500"
              src="default.jpeg"
              alt="default jpeg"
              width={192}
              height={192}
            />
          )}
          <label className="p-2 text-sm bg-green-800 rounded-xl text-white hover:bg-green-700 cursor-pointer">
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
            Upload Image
          </label>
        </div>
      </Container>

      {/* Form Start */}
      <Container css={{ ...containerStyle }}>
        <Text css={{ minWidth: "80px" }} size={15}>
          First Name
        </Text>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              bordered
              size="sm"
              placeholder={"First Name"}
              color="secondary"
            />
          )}
        />
      </Container>

      <Separator />

      <Container css={{ ...containerStyle }}>
        <Text css={{ minWidth: "80px" }} size={15}>
          Middle Name
        </Text>
        <Controller
          name="middleName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              bordered
              size="sm"
              placeholder={"Middle Name"}
              color="secondary"
            />
          )}
        />
      </Container>

      <Separator />

      <Container css={{ ...containerStyle }}>
        <Text css={{ minWidth: "80px" }} size={15}>
          Last Name
        </Text>
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              bordered
              size="sm"
              placeholder={"Last Name"}
              color="secondary"
            />
          )}
        />
      </Container>

      <Separator />

      <Container css={{ ...containerStyle }}>
        <Text css={{ minWidth: "80px" }} size={15}>
          DOB
        </Text>
        <Controller
          name="dob"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              value={new Date(profile.dob).toISOString().slice(0, 10)}
              bordered
              size="sm"
              css={{ minWidth: "170px" }}
              placeholder={"Date of Birth"}
              color="secondary"
              type="date"
            />
          )}
        />
        <Text css={{ minWidth: "80px" }} size={15}>
          Gender
        </Text>
        <select
          title="gender"
          id="gender"
          {...register("gender", { required: true })}
          defaultValue={"Gender"}
          className={`border-2 rounded-xl text-xs p-2 border-[#D9D9D9] hover:border-caring focus:border-caring focus:-translate-y-0.5 transition-all min-w-[170px]`}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </Container>

      <Separator />

      <Container css={{ ...containerStyle }}>
        <Text css={{ minWidth: "80px" }} size={15}>
          Email
        </Text>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              bordered
              size="sm"
              placeholder={"Email"}
              color="secondary"
            />
          )}
        />
        <Text css={{ minWidth: "80px" }} size={15}>
          Phone
        </Text>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              bordered
              size="sm"
              placeholder={"Mobile"}
              color="secondary"
            />
          )}
        />
      </Container>

      <Separator />

      <Container css={{ ...containerStyle }}>
        <Text css={{ minWidth: "80px" }} size={15}>
          City
        </Text>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              bordered
              size="sm"
              placeholder={"City"}
              color="secondary"
            />
          )}
        />
        <Text css={{ minWidth: "80px" }} size={15}>
          Country
        </Text>
        <select
          {...register("country", { required: true })}
          className={`border-2 rounded-xl text-xs w-20 p-2 border-[#D9D9D9] hover:border-caring focus:border-caring focus:-translate-y-0.5 transition-all min-w-[170px]`}
        >
          {countryList.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </Container>

      {data.profile?.role === "MENTOR" && (
        <>
          <Separator />
          <Container css={{ ...containerStyle, alignItems: "start" }}>
            <Text css={{ minWidth: "80px" }} size={15}>
              Your Bio
            </Text>
            <Controller
              name="about"
              control={control}
              render={({ field }) => (
                <Textarea
                  css={{ minWidth: "80px" }}
                  {...field}
                  bordered
                  color="secondary"
                  placeholder={"About Me"}
                  width="500px"
                />
              )}
            />
          </Container>
        </>
      )}

      {data.profile?.role === "MENTEE" && (
        <>
          <Separator />
          <Container css={{ ...containerStyle, flexWrap: "wrap" }}>
            <Text css={{ minWidth: "80px" }} size={15}>
              Patient Name
            </Text>
            <Controller
              name="patientName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  bordered
                  size="sm"
                  placeholder={"Patient Name"}
                  color="secondary"
                />
              )}
            />

            <Text css={{ minWidth: "80px" }} size={15}>
              Condition
            </Text>
            <select
              title="condition"
              id="condition"
              {...register("condition", { required: true })}
              className={`border-2 rounded-xl text-xs p-2 border-[#D9D9D9] hover:border-caring focus:border-caring focus:-translate-y-0.5 transition-all min-w-[170px]`}
            >
              {diseaseLabels.map((d) => (
                <option value={d.value}>{d.label}</option>
              ))}
            </select>

            <Text css={{ minWidth: "80px" }} size={15}>
              Relationship
            </Text>
            <select
              title="relationship"
              id="relationship"
              {...register("relation", { required: true })}
              className={`border-2 rounded-xl text-xs p-2 border-[#D9D9D9] hover:border-caring focus:border-caring focus:-translate-y-0.5 transition-all min-w-[170px]`}
            >
              <option value="mother">Mother</option>
              <option value="father">Father</option>
              <option value="son">Son</option>
              <option value="daughter">Daughter</option>
              <option value="wife">Wife</option>
              <option value="husband">Husband</option>
            </select>
          </Container>
        </>
      )}

      <Separator />

      <Container css={{ ...containerStyle }}>
        <Text css={{ minWidth: "80px" }} size={15}>
          Years of Experience
        </Text>
        {radioButtons.map((button) => (
          <div className="flex items-center justify-center gap-4">
            <input
              type="radio"
              title="experience"
              value={button.value}
              {...register("experience", { required: true })}
              className={`mr-2 accent-caring w-5 aspect-square`}
            />
            <label className="text-sm">{button.label}</label>
          </div>
        ))}
      </Container>

      {data.profile?.role === "MENTEE" && (
        <>
          <Separator />
          <Container css={{ ...containerStyle, alignItems: "start" }}>
            <Text css={{ minWidth: "80px" }} size={15}>
              Your Story
            </Text>
            <Controller
              name="synopsis"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  onChange={field.onChange}
                  bordered
                  color="secondary"
                  placeholder={"Synopsis"}
                  width="500px"
                />
              )}
            />
          </Container>
        </>
      )}

      {/* Form End */}
      <Separator />

      <Container css={{ ...containerStyle }} className="pb-10">
        <button
          type="submit"
          className="px-4 py-2 text-sm text-white bg-green-900 border-2 border-green-900 rounded-xl h-fit hover:bg-green-800"
        >
          {saveButton}
        </button>
        <button
          type="button"
          onClick={() => (window.location.href = "/dashboard")}
          className="px-4 py-2 text-sm text-gray-800 bg-transparent border-2 border-gray-300 rounded-xl hover:bg-gray-200 hover:border-transparent"
        >
          Cancel
        </button>
        <div className="theme-toggle-section">
          <span>{theme === "light" ? "🌞" : "🌚"}</span>
          <button
            onClick={() =>
              setTheme((prev) => (prev === "light" ? "dark" : "light"))
            }
          >
            Click switch to {theme === "light" ? "dark" : "light"} mode
          </button>
        </div>
      </Container>
    </form>
  );
};

export default function Page() {
  return (
    <WithOnBoarding>
      <SettingsPage />
    </WithOnBoarding>
  );
}

const Separator = () => {
  return (
    <>
      <Spacer y={0.5} />

      <div className="flex-grow my-5 border-t border-gray-300" />
      <Spacer y={0.5} />
    </>
  );
};
