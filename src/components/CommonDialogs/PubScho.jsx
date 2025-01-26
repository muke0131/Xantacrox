/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { FaTimes } from "react-icons/fa";

const CommonDialog = ({ item, onSave, onCancel, type }) => {
  const [formState, setFormState] = useState(item || {});
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    setFormState(item || {});
  }, [item]);

  // Initialize Quill editor
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

    if (quillRef.current && quillRef.current.root.innerHTML !== formState.description) {
      quillRef.current.root.innerHTML = formState.description;
    }
  }, [formState.description]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => onSave(formState);

  const renderInputField = (key, value) => {
    if (key === "dateAwarded" || key === "publicationdate") {
      return (
        <div key={key} className="mt-4">
          <label className="text-sm font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
          <input
            type="date"
            name={key}
            value={value || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      );
    }

    // Default text input for other fields
    return (
      <div key={key} className="mt-4">
        <label className="text-sm font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
        <input
          type="text"
          name={key}
          value={value}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
    );
  };

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
        <h2 className="text-xl font-bold mb-4">{`Add/Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`}</h2>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
        {Object.keys(formState).map((key) => {
          if (key === "description") {
            return (
              <div key={key}>
                <label className="text-sm font-semibold">Description:</label>
                <div ref={editorRef} />
              </div>
            );
          }
          return renderInputField(key, formState[key]);
        })}
      </div>
    </div>
  );
};

export default CommonDialog;
