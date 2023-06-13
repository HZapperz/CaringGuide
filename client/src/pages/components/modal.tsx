import React, { useState, ChangeEvent, FormEvent } from "react";

type ModalProps = {
  onClose: () => void;
  onSave: (title: string, description: string) => void;
};

const Modal = ({ onClose, onSave }: ModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">New Entry</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            Title:
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="border rounded-lg px-2 py-1 w-full"
            />
          </label>
          <label className="block mb-4">
            Description:
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="border rounded-lg px-2 py-1 w-full"
            ></textarea>
          </label>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
