import React, { useState, useEffect } from "react";
import { Text, Image, Col, Card } from "@nextui-org/react";
import Modal from "./components/modal";

import Section from "./components/section";
import ParallaxSection from "./components/parallaxsection";
import Footer from "./components/footer";
import Nav from "./components/nav";
import pfp from "./tempimages/profile-picture.jpg";
import articles from "./api/articlesData";
import journal from "./api/journalData";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";

const JournalPage = () => {
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);
  const [expandedEntry, setExpandedEntry] = useState<any | null>(null);
  const [showOverlay, setShowOverlay] = useState(false); // State for showing/hiding the overlay
  const [newEntryMode, setNewEntryMode] = useState(false); // State for enabling new entry mode

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const preclickedButton = urlParams.get("preclickedButton");

    if (preclickedButton === "true") {
      handleNewEntryClick();
    }
  }, []);

  const handleEntryClick = (index: number) => {
    setSelectedEntry(index);
    setExpandedEntry(journal[index]);
    setNewEntryMode(false);
  };

  const handleNewEntryClick = () => {
    setSelectedEntry(null);
    setExpandedEntry(null);
    setNewEntryMode(true);
  };

  const handleSaveEntry: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();

    // Get the values from the input f
    const title = ""; // Replace with the actual value from the title input
    const description = ""; // Replace with the actual value from the description text area

    // Save the new entry to the journal data or send it to the server
    // You can implement this according to your requirements
    const newEntry = {
      title,
      description,
      date: new Date().toLocaleDateString(),
    };
    journal.push(newEntry);

    setSelectedEntry(journal.length - 1);
    setExpandedEntry(newEntry);
    setNewEntryMode(false);
  };

  return (
    <>
      <div className="flex justify-between m-8 mb-4">
        <h1 className="mb-0">Journal</h1>
        {/* New Entry Button */}
        {!newEntryMode && (
          <button
            className="bg-green-900 text-white rounded-xl h-12 w-36 mb-0 mt-4 mb-4 text-2xl"
            onClick={handleNewEntryClick}
          >
            New Entry
          </button>
        )}
      </div>
      {/*Journal Div*/}
      <div
        className="w-max-11/12 flex mb-4 m-8 mt-0 border border-gray-300 border-2 rounded-xl"
        style={{ height: "650px" }}
      >
        {/*Journal Column*/}
        <div className="w-1/4 border-r-2 border-gray-300">
          <div
            className="grid grid-cols-1 gap-4 overflow-y-auto m-8"
            style={{ maxHeight: "616px" }}
          >
            {/*Each Journal Entry*/}
            {journal.map((item, index) => (
              <div
                key={index}
                className={`bg-gray-200 p-2 rounded-xl ${
                  selectedEntry === index ? "bg-red-200" : ""
                } ${selectedEntry === index ? "mr-0" : "mr-8"}`}
                style={{ minHeight: "100px" }} // Adjust the height as needed
                onClick={() => handleEntryClick(index)}
              >
                <div className="flex">
                  <h3 className="text-sm font-bold mr-2">{item.title}</h3>
                  <div className="text-xs text-gray-500">{item.date}</div>
                </div>
                <p className="text-xs mt-1 overflow-hidden line-clamp-3">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-3/4">
          {newEntryMode ? (
            <div className="relative h-full w-full p-8">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="text-3xl font-bold bg-transparent focus:outline-none"
                />
              </div>
              <div>
                <textarea
                  placeholder="Start Typing"
                  className="text-lg bg-transparent focus:outline-none"
                />
              </div>
              <button
                className="bg-green-900 text-white text-2xl rounded-xl h-9 w-40 absolute bottom-4 right-4 mb-2 mr-2"
                onClick={handleSaveEntry}
              >
                Add Entry
              </button>
            </div>
          ) : expandedEntry ? (
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-4">{expandedEntry.title}</h1>
              <p className="text-lg">{expandedEntry.description}</p>
            </div>
          ) : (
            <div className="p-8">
              <h1 className="text-3xl font-bold text-center text-gray-400">Click on a journal to view or click New Entry to start a new journal</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default JournalPage;
