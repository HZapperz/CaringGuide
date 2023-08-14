import React, { useEffect, useState } from "react";
import JournalCard from "../components/journalCard";
import { journalSchema } from "@/schema/journal";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loading } from "@nextui-org/react";
import { WithOnBoarding } from "@/components/WithOnboarding";
import useHandleErrors from "@/hooks/useHandleErrors";
import { Journal } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useApp } from "@/context/app";

interface JournalData {
  jId: string;
  id: string;
  title: string;
  description: string;
  time: string;
}

type FormValues = z.infer<typeof journalSchema>;

const JournalEditor: React.FC = () => {
  const { session } = useApp();

  const [journals, setJournals] = useState<Journal[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [fresh, setRefresh] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(journalSchema),
  });

  const queryClient = useQueryClient();
  const handleErrors = useHandleErrors();
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);

  const onSubmit = async (data: FormValues) => {
    try {
      if (selectedJournal) {
        let newData = {
          ...data,
          jId: selectedJournal?.id,
        };

        await fetch(`/api/journals`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        });

        setRefresh(!fresh);
        reset();
      } else {
        const response = await fetch("/api/journals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        queryClient.invalidateQueries(["profile", session]);
        setRefresh(!fresh);
        reset();
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleEditJournal = (journal: Journal) => {
    setSelectedJournal(journal);
    reset();
  };

  const handleCancelEdit = () => {
    setSelectedJournal(null);
    reset();
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

      const journalsData = await response.json();
      setJournals(journalsData);
    } catch (error) {
      handleErrors(error);
    }
    setLoader(false);
  };

  useEffect(() => {
    getAllJournals();
  }, [fresh]);

  // if (loader)
  //   return (
  //     <div className="flex items-center justify-center w-full h-full">
  //       <Loading />
  //     </div>
  //   );

  return (
    <main className="flex flex-col w-full h-full p-10">
      <div className="flex items-center justify-between w-full mb-2">
        <div className="font-poppins text-[#4E4E4E] text-2xl font-medium">
          JOURNAL
        </div>
        <button
          type="button"
          className="bg-[#245B48] text-white rounded-lg px-4 py-2"
        >
          New Entry
        </button>
      </div>
      <div className="border-2 border-[#ECEEED] flex flex-col md:flex-row justify-start items-start h-[90%] rounded-xl">
        <div className="flex flex-col items-start justify-start max-w-full p-4 md:max-h-full md:h-full md:w-fit md:border-r md:border-r-[#ECEEED] md:border-b-0 border-b border-b-[#ECEEED]">
          <div className="flex w-full gap-4 overflow-auto h-fit md:h-full md:grid-cols-1 md:grid md:w-80">
            {journals.map((journal, index) => (
              <div key={index}>
                <JournalCard data={journal} onEdit={handleEditJournal} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-between w-full h-full p-4 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start justify-between w-full h-full p-4"
          >
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              defaultValue={selectedJournal?.title || ""}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    placeholder={selectedJournal?.title || "Title"}
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
              defaultValue={selectedJournal?.description || ""}
              render={({ field }) => (
                <>
                  <textarea
                    {...field}
                    placeholder={selectedJournal?.description || "Start typing"}
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
            <div className="flex mt-4">
              {selectedJournal ? (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-[#F87171] text-white rounded-lg px-4 py-2 mr-2"
                >
                  Cancel
                </button>
              ) : null}
              <button
                type="submit"
                className="bg-[#114D38] text-white rounded-lg px-4 py-2"
              >
                {selectedJournal ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default function Page() {
  return (
    <WithOnBoarding>
      <JournalEditor />
    </WithOnBoarding>
  );
}
