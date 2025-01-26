/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { FaTimes } from "react-icons/fa";

const TestScoreDialog = ({ score, onSave, onCancel }) => {
  const [formState, setFormState] = useState({
    title: "",
    scoreType: "Percentile",
    percentile: "",
    rank: "",
    yourScore: "",
    maxScore: "",
    percentage: "",
    associatedWith: "",
    examDate: "",
    description: "",
  });

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  // Initialize formState with passed score
  useEffect(() => {
    if (score) {
      setFormState(score);
    } else {
      setFormState({
        title: "",
        scoreType: "Percentile",
        percentile: "",
        rank: "",
        yourScore: "",
        maxScore: "",
        percentage: "",
        associatedWith: "",
        examDate: "",
        description: "",
      });
    }
  }, [score]);

  // Initialize Quill editor
  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Enter description...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
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

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate percentage for "Score" type
  const calculatePercentage = () => {
    if (formState.yourScore && formState.maxScore) {
      const percentage =
        (parseFloat(formState.yourScore) / parseFloat(formState.maxScore)) *
        100;
      setFormState((prev) => ({
        ...prev,
        percentage: percentage.toFixed(2),
      }));
    }
  };

  useEffect(() => {
    if (formState.scoreType === "Score") {
      calculatePercentage();
    }
  }, [formState.yourScore, formState.maxScore]);

  // Handle form save
  const handleSave = () => {
    onSave(formState);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onCancel}
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4">
          {score ? "Edit Test Score" : "Add Test Score"}
        </h2>

        {/* Save Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            Save
          </button>
        </div>

        {/* Title and Score Type Row */}
        <div className="grid grid-cols-2 gap-4">
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
            <label className="text-sm font-semibold">Score Type:</label>
            <select
              name="scoreType"
              value={formState.scoreType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Percentile">Percentile</option>
              <option value="Rank">Rank</option>
              <option value="Score">Score</option>
            </select>
          </div>
        </div>

        {/* Percentile, Rank, or Score Fields */}
        {formState.scoreType === "Percentile" && (
          <div>
            <label className="text-sm font-semibold">
              Percentile (out of 100):
            </label>
            <input
              type="number"
              name="percentile"
              value={formState.percentile}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        )}
        {formState.scoreType === "Rank" && (
          <div>
            <label className="text-sm font-semibold">Rank:</label>
            <input
              type="number"
              name="rank"
              value={formState.rank}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        )}
        {formState.scoreType === "Score" && (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold">Your Score:</label>
              <input
                type="number"
                name="yourScore"
                value={formState.yourScore}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Max Score:</label>
              <input
                type="number"
                name="maxScore"
                value={formState.maxScore}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Percentage:</label>
              <input
                type="number"
                name="percentage"
                value={formState.percentage}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
          </div>
        )}

        {/* Associated With and Exam Date Row */}
        <div className="grid grid-cols-2 gap-4">
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
            <label className="text-sm font-semibold">Exam Date:</label>
            <input
              type="date"
              name="examDate"
              value={formState.examDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-semibold">Description:</label>
          <div
            ref={editorRef}
            className="border rounded p-2 mt-2 bg-white"
            style={{ minHeight: "100px", maxHeight: "180px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TestScoreDialog;
