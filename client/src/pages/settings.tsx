import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Text, Input, Container, Spacer, Textarea } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDetail } from "@/schema/onboarding";

const SettingsPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateDetail),
  });

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      const response = await fetch("/api/on-boarding", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });

      if (response.ok) {
        const newMentor = await response.json();
        console.log(newMentor);
      } else {
        console.error("Error creating mentor:", response);
      }
    } catch (error) {
      console.error("Error creating mentor:", error);
    }
  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <div className="h-72">
              <div className="h-36 w-full bg-gradient-to-r from-green-100 to-pink-200"></div>
              <img
                className="absolute top-24 left-20 w-36 h-36 p-0 rounded-full ring-4 ring-gray-300 dark:ring-gray-500"
                src="default.jpeg"
                alt="default jpeg"
                width={192}
                height={192}
              />
              <div className="pr-48 pt-12 flex md:flex md:flex-grow flex-row justify-end space-x-1">
                <button
                  type="submit"
                  className="text-sm w-24 bg-green-900 border-2 hover:bg-green-800 text-white py-2 px-4 rounded-lg border-green-900"
                >
                  Save
                </button>
                <Spacer x={2} />
                <button
                  type="button"
                  className="w-24 text-sm rounded-lg bg-transparent text-gray-800 hover:bg-gray-200 hover:border-transparent py-2 px-4 border-2 border-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container gap={0} css={{ d: "flex", flexWrap: "nowrap" }}>
            <Spacer x={12} />
            <Text size={15}>First Name</Text>
            <Spacer x={5} />
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  bordered
                  size="sm"
                  placeholder="First Name"
                  color="secondary"
                />
              )}
            />
          </Container>
          <Spacer y={0.5} />
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <Spacer y={0.5} />
          <Container gap={0} css={{ d: "flex", flexWrap: "nowrap" }}>
            <Spacer x={12} />
            <Text size={15}>Middle Name</Text>
            <Spacer x={4.3} />
            <Controller
              name="middleName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  bordered
                  size="sm"
                  placeholder="Middle Name"
                  color="secondary"
                />
              )}
            />
          </Container>
          <Spacer y={0.5} />
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <Spacer y={0.5} />
          <Container gap={0} css={{ d: "flex", flexWrap: "nowrap" }}>
            <Spacer x={12} />
            <Text size={15}>Last Name</Text>
            <Spacer x={5} />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  bordered
                  size="sm"
                  placeholder="Last Name"
                  color="secondary"
                />
              )}
            />
          </Container>
          <Spacer y={0.5} />
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <Spacer y={0.5} />
          <Container gap={0} css={{ d: "flex", flexWrap: "nowrap" }}>
            <Spacer x={12} />
            <Text size={15}>Location</Text>
            <Spacer x={5.7} />
            <Input
              bordered
              size="sm"
              placeholder="City"
              color="secondary"
              name="city"
            />
            <Spacer x={4} />
            <Text size={15}>State</Text>
            <Spacer x={3} />
            <Input
              bordered
              width="120px"
              size="sm"
              placeholder="State"
              color="secondary"
              name="state"
            />
          </Container>
          <Spacer y={0.5} />
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <Spacer y={0.5} />
          <Container gap={0} css={{ d: "flex", flexWrap: "nowrap" }}>
            <Spacer x={12} />
            <Text size={15}>Your Bio</Text>
            <Spacer x={5.7} />
            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <Textarea {...field} bordered color="secondary" width="500px" />
              )}
            />
          </Container>
          <Spacer y={3} />
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <Spacer y={0.5} />
          <Container gap={0} css={{ d: "flex", flexWrap: "nowrap" }}>
            <Spacer x={12} />
            <button
              type="submit"
              className="text-sm w-24 bg-green-900 border-2 hover:bg-green-800 text-white py-2 px-4 rounded-lg border-green-900"
            >
              Save
            </button>
            <Spacer x={2} />
            <button
              type="button"
              className="w-24 text-sm rounded-lg bg-transparent text-gray-800 hover:bg-gray-200 hover:border-transparent py-2 px-4 border-2 border-gray-300"
            >
              Cancel
            </button>
          </Container>
        </form>
      </section>
    </>
  );
};

export default SettingsPage;
