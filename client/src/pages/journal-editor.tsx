import React, { useEffect, useState } from "react";
import JournalCard from "../components/journalCard";
import { journalSchema } from "@/schema/journal";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface JournalData {
  jId: string;
  id: string;
  title: string;
  description: string;
  time: string;
}

type FormValues = z.infer<typeof journalSchema>;

const JournalEditor: React.FC = () => {
  const [journals, setJournals] = useState<JournalData[]>([]);
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

  const [selectedJournal, setSelectedJournal] = useState<JournalData | null>(
    null
  );

  const onSubmit = async (data: FormValues) => {
    try {
      if (selectedJournal) {
        let newData = {
          ...data,
          jId: selectedJournal?.jId,
        };
        const response = await fetch(`/api/journals`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        });

        if (response.ok) {
          setRefresh(!fresh);
        } else {
          console.error("Error updating Journal:", response);
        }
      } else {
        const response = await fetch("/api/journals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          setRefresh(!fresh);
        } else {
          console.error("Error creating Journal:", response);
        }
      }
    } catch (error) {
      console.error("Error creating/updating Journal:", error);
    }
  };

  const handleEditJournal = (journal: JournalData) => {
    setSelectedJournal(journal);
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
      if (response.ok) {
        const journalsData = await response.json();
        setJournals(journalsData);
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
                <JournalCard data={journal} onEdit={handleEditJournal} />
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

export default JournalEditor;
