import { useState } from "react";
import { professionalExperiences } from "../json-content/professional-experience";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ProfessionalExperience = () => {
  const [editableIndex, setEditableIndex] = useState(null);
  const [experienceData, setExperienceData] = useState(professionalExperiences);

  const handleEditClick = (index) => {
    setEditableIndex(index);
  };

  const handleSaveClick = () => {
    setEditableIndex(null);
  };

  const handleInputChange = (e, index, field) => {
    const updatedExperiences = [...experienceData];
    updatedExperiences[index][field] =
      field === "currentlyWorking" ? e.target.checked : e.target.value;

    if (field === "currentlyWorking" && e.target.checked) {
      updatedExperiences[index].endDate = "";
    }

    setExperienceData(updatedExperiences);
  };

  return (
    <div className="space-y-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Professional Experience</h2>
      {experienceData.map((exp, index) => (
        <div
          key={index}
          className="p-6 border rounded-lg shadow-lg bg-white space-y-6"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">{exp.jobTitle}</h3>
            <button
              onClick={() =>
                editableIndex === index
                  ? handleSaveClick()
                  : handleEditClick(index)
              }
              className="text-2xl text-blue-500"
            >
              <i
                className={`fas ${
                  editableIndex === index ? "fa-sun" : "fa-pencil-alt"
                }`}
              />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold">Company Name:</label>
              <input
                type="text"
                value={exp.companyName}
                onChange={(e) => handleInputChange(e, index, "companyName")}
                disabled={editableIndex !== index}
                className={`w-full mt-2 p-2 border ${
                  editableIndex === index ? "border-blue-500" : "border-gray-300"
                } rounded`}
              />
            </div>
            {/* Company Sector */}
            <div>
              <label className="block text-sm font-semibold">Company Sector:</label>
              <input
                type="text"
                value={exp.companySector}
                onChange={(e) => handleInputChange(e, index, "companySector")}
                disabled={editableIndex !== index}
                className={`w-full mt-2 p-2 border ${
                  editableIndex === index ? "border-blue-500" : "border-gray-300"
                } rounded`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Job Location */}
            <div>
              <label className="block text-sm font-semibold">Job Location:</label>
              <input
                type="text"
                value={exp.jobLocation}
                onChange={(e) => handleInputChange(e, index, "jobLocation")}
                disabled={editableIndex !== index}
                className={`w-full mt-2 p-2 border ${
                  editableIndex === index ? "border-blue-500" : "border-gray-300"
                } rounded`}
              />
            </div>
            {/* Position Type */}
            <div>
              <label className="block text-sm font-semibold">Position Type:</label>
              <input
                type="text"
                value={exp.positionType}
                onChange={(e) => handleInputChange(e, index, "positionType")}
                disabled={editableIndex !== index}
                className={`w-full mt-2 p-2 border ${
                  editableIndex === index ? "border-blue-500" : "border-gray-300"
                } rounded`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-semibold">Start Date:</label>
              <input
                type="date"
                value={exp.startDate}
                onChange={(e) => handleInputChange(e, index, "startDate")}
                disabled={editableIndex !== index}
                className={`w-full mt-2 p-2 border ${
                  editableIndex === index ? "border-blue-500" : "border-gray-300"
                } rounded`}
              />
            </div>
            {/* End Date (conditionally hidden) */}
            {!exp.currentlyWorking && (
              <div>
                <label className="block text-sm font-semibold">End Date:</label>
                <input
                  type="date"
                  value={exp.endDate}
                  onChange={(e) => handleInputChange(e, index, "endDate")}
                  disabled={editableIndex !== index}
                  className={`w-full mt-2 p-2 border ${
                    editableIndex === index
                      ? "border-blue-500"
                      : "border-gray-300"
                  } rounded`}
                />
              </div>
            )}
          </div>

          {/* Currently Working */}
          <div>
            <label className="block text-sm font-semibold">
              Currently Working:
            </label>
            <input
              type="checkbox"
              checked={exp.currentlyWorking}
              onChange={(e) => handleInputChange(e, index, "currentlyWorking")}
              disabled={editableIndex !== index}
              className="mt-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold">Description:</label>
            <textarea
              value={exp.description}
              onChange={(e) => handleInputChange(e, index, "description")}
              disabled={editableIndex !== index}
              className={`w-full mt-2 p-2 border ${
                editableIndex === index ? "border-blue-500" : "border-gray-300"
              } rounded`}
              rows={4}
            />
          </div>

          {/* Save Button */}
          {editableIndex === index && (
            <div className="text-right">
              <button
                onClick={handleSaveClick}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfessionalExperience;
