/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { FaTimes } from "react-icons/fa"; // Import X icon

const InputDialogAcco = ({ award, onSave, onCancel }) => {
  const [formState, setFormState] = useState({
    title: "",
    issuer: "",
    associatedWith: "",
    issueDate: "",
    description: "",
  });
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  // Set form state when award data is passed (for editing)
  useEffect(() => {
    if (award) {
      setFormState(award);
    } else {
      setFormState({
        title: "",
        issuer: "",
        associatedWith: "",
        issueDate: "",
        description: "",
      });
    }
  }, [award]);

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

    // Update Quill editor if formState.description changes
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

  const handleSave = () => onSave(formState); // Call onSave function when saving the award

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
          onClick={onCancel} // Close the dialog when clicking on the X icon
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4">Add/Edit Award/Recognition</h2>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={handleSave} // Trigger save on click
          >
            Save
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-sm font-semibold">Position/Title:</label>
            <input
              type="text"
              name="title"
              value={formState.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Issuer/Organizer:</label>
            <input
              type="text"
              name="issuer"
              value={formState.issuer}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Associated With:</label>
            <input
              type="text"
              name="associatedWith"
              value={formState.associatedWith}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Select Issue Date:</label>
            <input
              type="date"
              name="issueDate"
              value={formState.issueDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm font-semibold">Description:</label>
          <div
            ref={editorRef}
            className="border rounded p-2 mt-2 bg-white max-h-60 overflow-auto" // Set max-height to prevent overflow
            style={{ minHeight: "100px",maxHeight:"180px" }} // Ensure Quill editor is not too small
          />
        </div>
      </div>
    </div>
  );
};

export default InputDialogAcco;
