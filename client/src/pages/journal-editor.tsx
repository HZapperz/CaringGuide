import React, { useEffect, useState } from "react";
import JournalCard from "../components/journalCard";
import { journalSchema } from "@/schema/journal";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type FormValues = z.infer<typeof journalSchema>;

const JournalEditor = () => {
  const [journals, setJournals] = useState([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [fresh, setRefresh] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(journalSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("/api/journals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });

      if (response.ok) {
        await response.json();
        setRefresh(!fresh);
      } else {
        console.error("Error creating Journal:", response);
      }
    } catch (error) {
      console.error("Error creating Journal:", error);
    }
  };

  const getAllJournals = async () => {
    setLoader(true);
    try {
      const response = await fetch("/api/journals", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let journals;
      if (response.ok) {
        journals = await response.json();
        setJournals(journals);
      } else {
        console.error("Error getting Journals:", response);
      }
    } catch (error) {
      console.error("Error getting Journals:", error);
    }
    setLoader(false);
  };

  useEffect(() => {
    getAllJournals();
  }, [fresh]);

  if (loader) return <h3>Loading....</h3>;

  return (
    <main className="p-10 flex flex-col bg-white w-full h-full">
      <div className="flex justify-start items-center font-poppins text-[#4E4E4E] text-2xl font-medium mb-2">
        JOURNAL
      </div>
      <div className="border-2 border-[#ECEEED flex flex-col md:flex-row justify-start items-start h-full rounded-xl">
        <div className="flex flex-col justify-start items-start p-4 w-fit h-fit">
          <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 w-full md:w-80 overflow-auto">
            {journals.map((journal, index) => (
              <div key={index}>
                <JournalCard data={journal} />
              </div>
            ))}
          </div>
        </div>
        <hr className="md:h-full h-[2px] md:w-[2px] w-full bg-[#ECEEED  border border-[#ECEEED "></hr>
        <div className="w-full flex flex-col justify-between items-start p-4 h-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-between items-start p-4 h-full"
          >
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    placeholder="Title"
                    className="font-poppins text-[30px] text-[#4E4E4E] font-[500] w-full mb-2"
                  />
                  {errors.title && (
                    <span className="text-red-500">{errors.title.message}</span>
                  )}
                </>
              )}
            />
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <>
                  <textarea
                    {...field}
                    placeholder="Start typing"
                    className="font-poppins text-[20px] resize-none w-full h-full text-[#4E4E4E] font-[300]"
                  />
                  {errors.description && (
                    <span className="text-red-500">
                      {errors.description.message}
                    </span>
                  )}
                </>
              )}
            />
            <button
              type="submit"
              className="bg-[#114D38] text-white rounded-lg px-4 py-2 mt-4"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default JournalEditor;
