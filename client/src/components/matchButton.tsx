// MatchButton.tsx
import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  currentMatchId?: string;
  onUnmatch: () => void;
  onRematch: () => void;
}

const MatchButton: React.FC<{
  currentMatchId?: string;
  onUnmatch: () => void;
  onRematch?: () => void; // Made this optional
}> = ({ currentMatchId, onUnmatch, onRematch }) => {
  const rematchMutation = useMutation(async () => {
    const response = await axios.post("/api/rematch", { currentMatchId });
    return response.data;
  });

  return (
    <div className="space-x-4">
      {currentMatchId ? (
        <button
          onClick={onUnmatch}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Unmatch
        </button>
      ) : (
        <button
          onClick={onRematch} // use onRematch here
          disabled={rematchMutation.isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Rematch
        </button>
      )}
    </div>
  );
};

export default MatchButton;
