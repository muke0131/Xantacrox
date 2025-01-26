/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import responsibilitiesjson from "../json-content/position-of-responsibilities";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "quill/dist/quill.snow.css";
import Quill from "quill";

const Responsibilities = () => {
  const [responsibilities, setResponsibilities] =
    useState(responsibilitiesjson);

  const handleEditToggle = (index) => {
    const updatedResponsibilities = responsibilities.map((resp, i) =>
      i === index ? { ...resp, isEditable: !resp.isEditable } : resp
    );
    setResponsibilities(updatedResponsibilities);
  };

  const handleSave = (index, updatedResponsibility) => {
    const updatedResponsibilities = [...responsibilities];
    updatedResponsibilities[index] = {
      ...updatedResponsibility,
      isEditable: false,
    };
    setResponsibilities(updatedResponsibilities);
  };

  const handleDelete = (index) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== index));
  };

  const handleAddResponsibility = () => {
    setResponsibilities([
      ...responsibilities,
      {
        position: "",
        organization: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
        isEditable: true,
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold">Positions of Responsibility</h2>
      {responsibilities.map((resp, index) => (
        <ResponsibilityForm
          key={index}
          index={index}
          responsibility={resp}
          onSave={handleSave}
          onDelete={handleDelete}
          onEditToggle={handleEditToggle}
        />
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleAddResponsibility}
      >
        Add Responsibility
      </button>
    </div>
  );
};

const ResponsibilityForm = ({
  index,
  responsibility,
  onSave,
  onDelete,
  onEditToggle,
}) => {
  const [editableResp, setEditableResp] = useState({ ...responsibility });
  const quillRef = useRef(null);
  const editorRef = useRef(null);

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
        setEditableResp((prev) => ({
          ...prev,
          description: quillRef.current.root.innerHTML,
        }));
      });
    }

    // Ensure Quill editor is always synced with the description
    if (
      quillRef.current &&
      quillRef.current.root.innerHTML !== responsibility.description
    ) {
      quillRef.current.root.innerHTML = responsibility.description;
    }
  }, [responsibility.description]);

  const handleSaveClick = () => onSave(index, editableResp);

  return (
    <div className="bg-gray-100 p-4 rounded mt-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">
          {editableResp.position || "New Responsibility"}
        </h3>
        {responsibility.isEditable ? (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSaveClick}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => onEditToggle(index)}
          >
            Edit
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="text-sm font-semibold">Position:</label>
          <input
            type="text"
            name="position"
            value={editableResp.position}
            onChange={(e) =>
              setEditableResp({ ...editableResp, position: e.target.value })
            }
            className="w-full p-2 mt-1 border rounded"
            disabled={!responsibility.isEditable}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Organization:</label>
          <input
            type="text"
            name="organization"
            value={editableResp.organization}
            onChange={(e) =>
              setEditableResp({ ...editableResp, organization: e.target.value })
            }
            className="w-full p-2 mt-1 border rounded"
            disabled={!responsibility.isEditable}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={editableResp.startDate}
            onChange={(e) =>
              setEditableResp({ ...editableResp, startDate: e.target.value })
            }
            className="w-full p-2 mt-1 border rounded"
            disabled={!responsibility.isEditable}
          />
        </div>
        {!editableResp.currentlyWorking && (
          <div>
            <label className="text-sm font-semibold">End Date:</label>
            <input
              type="date"
              name="endDate"
              value={editableResp.endDate || ""}
              onChange={(e) =>
                setEditableResp({ ...editableResp, endDate: e.target.value })
              }
              className="w-full p-2 mt-1 border rounded"
              disabled={!responsibility.isEditable}
            />
          </div>
        )}
        <div className="col-span-2 flex items-center">
          <input
            type="checkbox"
            name="currentlyWorking"
            checked={editableResp.currentlyWorking}
            onChange={(e) =>
              setEditableResp({
                ...editableResp,
                currentlyWorking: e.target.checked,
              })
            }
            disabled={!responsibility.isEditable}
          />
          <label className="ml-2 text-sm font-semibold">
            Currently Working
          </label>
        </div>
      </div>
      <div className="mt-4">
        <label className="text-sm font-semibold">Description:</label>
        <div
          ref={editorRef}
          className="border rounded p-2 mt-2 bg-white"
          style={{ minHeight: "100px" }}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className="bg-red-500 text-white px-2 py-1 rounded ml-2"
          onClick={() => onDelete(index)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Responsibilities;
