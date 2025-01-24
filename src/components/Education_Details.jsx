import { useState } from "react";
import educa_details from "../json-content/education-details.json";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Education_Details = () => {
  const [edData, setEdData] = useState(educa_details);
  const [editedSections, setEditedSections] = useState({});

  const handleEditClick = (section, index = null) => {
    if (index !== null) {
      // Prevent multiple edits for the same item in lists
      if (
        editedSections[`${section}-${index}`] ||
        edData[section][index].isFrozen
      )
        return;

      setEdData({
        ...edData,
        [section]: edData[section].map((item, idx) =>
          idx === index ? { ...item, isEditable: true, isFrozen: false } : item
        ),
      });
    } else {
      if (editedSections[section] || edData[section].isFrozen) return;

      setEdData({
        ...edData,
        [section]: {
          ...edData[section],
          isEditable: true,
          isFrozen: false,
        },
      });
    }
  };

  const handleSaveClick = (section, index = null) => {
    setEditedSections({
      ...editedSections,
      [`${section}-${index !== null ? index : ""}`]: true,
    });

    if (section === "education") {
      setEdData({
        ...edData,
        education: {
          ...edData.education,
          isEditable: false, // Mark it as not editable
          isFrozen: true, // Set this to true to prevent further edits
        },
      });
    } else {
      if (index !== null) {
        setEdData({
          ...edData,
          [section]: edData[section].map((item, idx) =>
            idx === index
              ? { ...item, isEditable: false, isFrozen: true }
              : item
          ),
        });
      } else {
        setEdData({
          ...edData,
          [section]: {
            ...edData[section],
            isEditable: false, // Mark the section as not editable
            isFrozen: true, // Set this to true to prevent further edits
          },
        });
      }
    }
  };

  const handleInputChange = (e, section, field, index = null) => {
    const { value } = e.target;
    if (index !== null) {
      setEdData({
        ...edData,
        [section]: edData[section].map((item, idx) =>
          idx === index ? { ...item, [field]: value } : item
        ),
      });
    } else {
      setEdData({
        ...edData,
        [section]: {
          ...edData[section],
          [field]: value,
        },
      });
    }
  };

  const handleFileUpload = (e, section, index = null) => {
    const file = e.target.files[0];
    if (file) {
      if (index !== null) {
        setEdData({
          ...edData,
          [section]: edData[section].map((item, idx) =>
            idx === index ? { ...item, document: file.name } : item
          ),
        });
      } else {
        setEdData({
          ...edData,
          [section]: {
            ...edData[section],
            document: file.name,
          },
        });
      }
    }
  };

  if (!edData) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <form>
        {/* Current/Most Recent Course */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">
            Current/Most Recent Course
            <i
              className={`fas ${
                edData.education.isFrozen
                  ? "fa-lock text-gray-500"
                  : "fa-pencil-alt text-blue-500"
              } float-right h-6 cursor-pointer`}
              onClick={() => handleEditClick("education")}
            />
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Program:</label>
              <input
                type="text"
                value={edData.education.program}
                onChange={(e) => handleInputChange(e, "education", "program")}
                className="p-2 mt-2 border border-gray-300 rounded"
                disabled={!edData.education.isEditable}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Institution:</label>
              <input
                type="text"
                value={edData.education.institution}
                onChange={(e) =>
                  handleInputChange(e, "education", "institution")
                }
                className="p-2 mt-2 border border-gray-300 rounded"
                disabled={!edData.education.isEditable}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Campus:</label>
              <input
                type="text"
                value={edData.education.campus}
                onChange={(e) => handleInputChange(e, "education", "campus")}
                className="p-2 mt-2 border border-gray-300 rounded"
                disabled={!edData.education.isEditable}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Department:</label>
              <input
                type="text"
                value={edData.education.department}
                onChange={(e) =>
                  handleInputChange(e, "education", "department")
                }
                className="p-2 mt-2 border border-gray-300 rounded"
                disabled={!edData.education.isEditable}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Specialization:</label>
              <input
                type="text"
                value={edData.education.specialization}
                onChange={(e) =>
                  handleInputChange(e, "education", "specialization")
                }
                className="p-2 mt-2 border border-gray-300 rounded"
                disabled={!edData.education.isEditable}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Section:</label>
              <input
                type="text"
                value={edData.education.sec}
                onChange={(e) => handleInputChange(e, "education", "sec")}
                className="p-2 mt-2 border border-gray-300 rounded"
                disabled={!edData.education.isEditable}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Start Year:</label>
              <input
                type="text"
                value={edData.education.startYear}
                onChange={(e) => handleInputChange(e, "education", "startYear")}
                className="p-2 mt-2 border border-gray-300 rounded"
                disabled={!edData.education.isEditable}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold">End Year:</label>
              <input
                type="text"
                value={edData.education.endYear}
                onChange={(e) => handleInputChange(e, "education", "endYear")}
                className="p-2 mt-2 border border-gray-300 rounded"
                disabled={!edData.education.isEditable}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold">CGPA:</label>
              <input
                type="text"
                value={edData.education.cgpa}
                onChange={(e) => handleInputChange(e, "education", "cgpa")}
                className="p-2 mt-2 border border-gray-300 rounded"
                disabled={!edData.education.isEditable}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Percentage:</label>
              <input
                type="text"
                value={edData.education.percentage}
                onChange={(e) =>
                  handleInputChange(e, "education", "percentage")
                }
                className="p-2 mt-2 border border-gray-300 rounded"
                disabled={!edData.education.isEditable}
              />
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-sm font-semibold">
              Upload Degree (PDF):
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileUpload(e, "education")}
              disabled={!edData.education.isEditable}
              className="p-2 mt-2 border border-gray-300 rounded"
            />
          </div>

          {edData.education.isEditable && (
            <button
              type="button"
              onClick={() => handleSaveClick("education")}
              className="bg-green-500 text-white px-8 py-2 rounded-full shadow-lg mt-4"
            >
              Save
            </button>
          )}
        </section>

        {/* Previous Educations */}
        <section className="space-y-6 mt-6">
          <h2 className="text-2xl font-bold">Previous Educations</h2>
          {edData.previousEducation.map((education, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-xl font-semibold">{education.program}</h3>
              <div className="flex justify-between">
                <span>Institution: {education.institution}</span>
                <span>Year: {education.year}</span>
              </div>
              <div className="flex justify-between">
                <span>Percentage: {education.percentage}</span>
                <span>Board: {education.board}</span>
              </div>

              <i
                className={`fas ${
                  education.isFrozen
                    ? "fa-lock text-gray-500"
                    : "fa-pencil-alt text-blue-500"
                } float-right h-6 cursor-pointer`}
                onClick={() => handleEditClick("previousEducation", index)}
              />

              {education.isEditable && (
                <button
                  type="button"
                  onClick={() => handleSaveClick("previousEducation", index)}
                  className="bg-green-500 text-white px-8 py-2 rounded-full shadow-lg mt-4"
                >
                  Save
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Semester-wise Scores */}
        <section className="space-y-6 mt-6">
          <h2 className="text-2xl font-bold">Semester-wise Scores</h2>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Semester</th>
                <th className="border border-gray-300 p-2">CGPA</th>
                <th className="border border-gray-300 p-2">SGPA</th>
                <th className="border border-gray-300 p-2">Backlogs</th>
                <th className="border border-gray-300 p-2">Upload Degree</th>
              </tr>
            </thead>
            <tbody>
              {edData.semesterScores.map((score, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    {score.semester}
                  </td>
                  <td className="border border-gray-300 p-2">{score.cgpa}</td>
                  <td className="border border-gray-300 p-2">{score.sgpa}</td>
                  <td className="border border-gray-300 p-2">
                    {score.backlogs}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) =>
                        handleFileUpload(e, `semesterScores`, index)
                      }
                      disabled={!score.isEditable}
                      className="p-2 border border-gray-300 rounded"
                    />
                  </td>
                  <i
                    className={`fas ${
                      score.isFrozen
                        ? "fa-lock text-gray-500"
                        : "fa-pencil-alt text-blue-500"
                    } float-right h-6 cursor-pointer mt-6`}
                    onClick={() => handleEditClick("semesterScores", index)}
                  />
                  {score.isEditable && (
                    <button
                      type="button"
                      onClick={() => handleSaveClick("semesterScores", index)}
                      className="bg-green-500 text-white px-8 py-2 rounded-full shadow-lg mt-4"
                    >
                      Save
                    </button>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </form>
    </div>
  );
};

export default Education_Details;
