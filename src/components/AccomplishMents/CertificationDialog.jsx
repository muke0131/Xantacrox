/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { FaTimes } from "react-icons/fa"; // Import X icon

const CertificationDialog = ({ certification, onSave, onCancel }) => {
  const [formState, setFormState] = useState({
    name: "",
    authority: "",
    url: "",
    license_number: "",
    issue_date: "",
    expiry_date: "",
    score: "",
    description: "",
  });
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  // Set form state when certification data is passed (for editing)
  useEffect(() => {
    if (certification) {
      setFormState(certification);
    } else {
      setFormState({
        name: "",
        authority: "",
        url: "",
        license_number: "",
        issue_date: "",
        expiry_date: "",
        score: "",
        description: "",
      });
    }
  }, [certification]);

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

  const handleSave = () => onSave(formState); // Call onSave function when saving the certification

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
        <h2 className="text-xl font-bold mb-4">Add/Edit Certification</h2>
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
            <label className="text-sm font-semibold">Certification Name:</label>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Authority:</label>
            <input
              type="text"
              name="authority"
              value={formState.authority}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">URL:</label>
            <input
              type="url"
              name="url"
              value={formState.url}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">License Number:</label>
            <input
              type="text"
              name="license_number"
              value={formState.license_number}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Issue Date:</label>
            <input
              type="date"
              name="issue_date"
              value={formState.issue_date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Expiry Date:</label>
            <input
              type="date"
              name="expiry_date"
              value={formState.expiry_date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Score (if any):</label>
            <input
              type="text"
              name="score"
              value={formState.score}
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

export default CertificationDialog;
