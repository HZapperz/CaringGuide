import React, { useState } from "react";
import { Text, Image, Col, Card } from "@nextui-org/react";

import Section from "./components/section";
import ParallaxSection from "./components/parallaxsection";
import Footer from "./components/footer";
import Nav from "./components/nav";
import pfp from "./tempimages/profile-picture.jpg";
import articles from "./api/articlesData";
import journal from "./api/journalData";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";

const HomePage = () => {
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);
  const [expandedEntry, setExpandedEntry] = useState<any | null>(null);
  const [showOverlay, setShowOverlay] = useState(false); // State for showing/hiding the overlay

  const handleEntryClick = (index: number) => {
    setSelectedEntry(index);
    setExpandedEntry(journal[index]);
  };

  const handleNewEntryClick = () => {
    setShowOverlay(true); // Show the overlay when the button is clicked
  };

  const handleCloseModal = () => {
    setShowOverlay(false); // Close the modal overlay
  };

  const handleSaveEntry = (title: string, description: string) => {
    // Handle saving the new journal entry
    console.log("Title:", title);
    console.log("Description:", description);
    setShowOverlay(false); // Close the modal overlay after saving
  };

  return (
    <>
      <div className="flex justify-between m-8 mb-4">
        <h1 className="mb-0">Journal</h1>

        <button className="bg-green-900 text-white rounded-xl h-12 w-36 mb-0 mt-4 mb-4 text-2xl">
          New Entry
        </button>
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

        {/*Expanded Journal Column*/}
        <div className="w-3/4">
          {expandedEntry && (
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-4">{expandedEntry.title}</h1>
              <p className="text-lg">{expandedEntry.description}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
