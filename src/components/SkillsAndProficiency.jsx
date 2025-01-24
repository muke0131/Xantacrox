import React, { useReducer } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { v4 as uuidv4 } from "uuid";
import initialState from "../json-content/skill-proficiency";
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        [action.section]: [
          ...state[action.section],
          { id: uuidv4(), ...action.payload },
        ],
      };
    case "EDIT_ITEM":
      return {
        ...state,
        [action.section]: state[action.section].map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.fields }
            : item
        ),
      };
    case "DELETE_ITEM":
      return {
        ...state,
        [action.section]: state[action.section].filter(
          (item) => item.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

const SkillsAndProficiency = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [editableRow, setEditableRow] = React.useState({});

  const handleEditClick = (section, id) => {
    setEditableRow({ ...editableRow, [section]: id });
  };

  const handleSaveClick = (section) => {
    setEditableRow({ ...editableRow, [section]: null });
  };

  const handleInputChange = (section, id, field, value) => {
    dispatch({
      type: "EDIT_ITEM",
      section,
      payload: { id, fields: { [field]: value } },
    });
  };

  const handleAddItem = (section, fields) => {
    const newId = uuidv4();
    dispatch({
      type: "ADD_ITEM",
      section,
      payload: { id: newId, ...fields },
    });
    setEditableRow({ ...editableRow, [section]: newId });
  };

  const handleDeleteItem = (section, id) => {
    dispatch({
      type: "DELETE_ITEM",
      section,
      payload: { id },
    });
    if (editableRow[section] === id) {
      setEditableRow({ ...editableRow, [section]: null });
    }
  };

  const renderTable = (section, columns) => (
    <div>
      <h2 className="text-xl font-semibold mb-4 capitalize">{section}</h2>
      <button
        onClick={() =>
          handleAddItem(
            section,
            columns.reduce((acc, col) => ({ ...acc, [col.key]: "" }), {})
          )
        }
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add {section} +
      </button>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="p-2 border">
                  {col.label}
                </th>
              ))}
              <th className="p-2 border">Edit</th>
              <th className="p-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {state[section].map((item) => (
              <tr key={item.id}>
                {columns.map((col) => (
                  <td key={col.key} className="p-2 border">
                    {col.key === "certificate" ? (
                      <input
                        type="file"
                        onChange={(e) =>
                          handleInputChange(
                            section,
                            item.id,
                            col.key,
                            e.target.files[0]?.name || ""
                          )
                        }
                        disabled={editableRow[section] !== item.id}
                        className="w-full p-1"
                      />
                    ) : (
                      <input
                        type="text"
                        value={item[col.key]}
                        onChange={(e) =>
                          handleInputChange(
                            section,
                            item.id,
                            col.key,
                            e.target.value
                          )
                        }
                        disabled={editableRow[section] !== item.id}
                        className={`w-full p-1 ${
                          editableRow[section] === item.id
                            ? "border-blue-500"
                            : "border-transparent"
                        }`}
                      />
                    )}
                  </td>
                ))}
                <td className="p-2 border text-center">
                  <button
                    onClick={() =>
                      editableRow[section] === item.id
                        ? handleSaveClick(section)
                        : handleEditClick(section, item.id)
                    }
                    className="text-xl text-blue-500"
                  >
                    <i
                      className={`fas ${
                        editableRow[section] === item.id
                          ? "fa-save"
                          : "fa-pencil-alt"
                      }`}
                    />
                  </button>
                </td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => handleDeleteItem(section, item.id)}
                    className="text-red-500"
                  >
                    <i className="fas fa-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold text-center">Skills and Proficiency</h1>
      {renderTable("technicalSkill", [
        { key: "skillName", label: "Skill Name" },
        { key: "proficiency", label: "Proficiency" },
        { key: "certificate", label: "Certificate" },
      ])}
      {renderTable("communicationLanguage", [
        { key: "name", label: "Language Name" },
        { key: "proficiency", label: "Proficiency" },
      ])}
      {renderTable("courseList", [
        { key: "subCode", label: "Sub Code" },
        { key: "subName", label: "Sub Name" },
        { key: "sem", label: "Semester" },
        { key: "credit", label: "Credit" },
      ])}
    </div>
  );
};

export default SkillsAndProficiency;
