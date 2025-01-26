/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { FaTimes } from "react-icons/fa";

const ConferenceDialog = ({ conference, onSave, onCancel }) => {
  const [formState, setFormState] = useState({
    title: "",
    organiser: "",
    event_address: "",
    event_date: "",
    google_drive_link: "",
    description: "",
  });
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (conference) {
      setFormState(conference);
    } else {
      setFormState({
        title: "",
        organiser: "",
        event_address: "",
        event_date: "",
        google_drive_link: "",
        description: "",
      });
    }
  }, [conference]);

  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Enter description...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ link: true }],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        },
      });

      quillRef.current.on("text-change", () => {
        setFormState((prev) => ({
          ...prev,
          description: quillRef.current.root.innerHTML,
        }));
      });
    }

    if (
      quillRef.current &&
      quillRef.current.root.innerHTML !== formState.description
    ) {
      quillRef.current.root.innerHTML = formState.description;
    }
  }, [formState.description]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => onSave(formState);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-md w-full sm:max-w-full md:max-w-lg lg:max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onCancel}
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4">Add/Edit Conference/Workshop</h2>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-sm font-semibold">Title:</label>
            <input
              type="text"
              name="title"
              value={formState.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Organiser:</label>
            <input
              type="text"
              name="organiser"
              value={formState.organiser}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Event Address:</label>
            <input
              type="text"
              name="event_address"
              value={formState.event_address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Event Date:</label>
            <input
              type="date"
              name="event_date"
              value={formState.event_date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-semibold">Google Drive Link:</label>
            <input
              type="url"
              name="google_drive_link"
              value={formState.google_drive_link}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm font-semibold">Description:</label>
          <div
            ref={editorRef}
            className="border rounded p-2 mt-2 bg-white max-h-60 overflow-auto"
            style={{ minHeight: "100px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ConferenceDialog;
