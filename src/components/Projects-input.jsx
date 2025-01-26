/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import projectinformation from "../json-content/projects-information";

const Projects = () => {
  const [projects, setProjects] = useState(projectinformation);

  const handleEditToggle = (index) => {
    const updatedProjects = projects.map((proj, i) =>
      i === index ? { ...proj, isEditable: !proj.isEditable } : proj
    );
    setProjects(updatedProjects);
  };

  const handleSave = (index, updatedProject) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProject, isEditable: false };
    setProjects(updatedProjects);
  };

  const handleDelete = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleAddProject = () => {
    setProjects([
      ...projects,
      {
        title: "",
        domain: "",
        startDate: "",
        endDate: "",
        currentlyWorkingOnIt: false,
        githubUrl: "",
        workingUrl: "",
        associatedWith: "",
        description: "",
        isEditable: true,
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold">Projects</h2>
      {projects.map((proj, index) => (
        <ProjectForm
          key={index}
          index={index}
          project={proj}
          onSave={handleSave}
          onDelete={handleDelete}
          onEditToggle={handleEditToggle}
        />
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleAddProject}
      >
        Add Project
      </button>
    </div>
  );
};

const ProjectForm = ({ index, project, onSave, onDelete, onEditToggle }) => {
  const [editableProj, setEditableProj] = useState({ ...project });
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Enter project description...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ link: true }],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        },
      });
      quillRef.current.on("text-change", () => {
        setEditableProj((prev) => ({
          ...prev,
          description: quillRef.current.root.innerHTML,
        }));
      });
    }

    if (
      quillRef.current &&
      quillRef.current.root.innerHTML !== project.description
    ) {
      quillRef.current.root.innerHTML = project.description;
    }
  }, [project.description]);

  const handleSaveClick = () => onSave(index, editableProj);

  return (
    <div className="bg-gray-100 p-4 rounded mt-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">
          {editableProj.title || "New Project"}
        </h3>
        {project.isEditable ? (
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
          <label className="text-sm font-semibold">Title:</label>
          <input
            type="text"
            value={editableProj.title}
            onChange={(e) =>
              setEditableProj({ ...editableProj, title: e.target.value })
            }
            className="w-full p-2 mt-1 border rounded"
            disabled={!project.isEditable}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Domain:</label>
          <input
            type="text"
            value={editableProj.domain}
            onChange={(e) =>
              setEditableProj({ ...editableProj, domain: e.target.value })
            }
            className="w-full p-2 mt-1 border rounded"
            disabled={!project.isEditable}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Start Date:</label>
          <input
            type="date"
            value={editableProj.startDate}
            onChange={(e) =>
              setEditableProj({ ...editableProj, startDate: e.target.value })
            }
            className="w-full p-2 mt-1 border rounded"
            disabled={!project.isEditable}
          />
        </div>
        {!editableProj.currentlyWorkingOnIt && (
          <div>
            <label className="text-sm font-semibold">End Date:</label>
            <input
              type="date"
              value={editableProj.endDate || ""}
              onChange={(e) =>
                setEditableProj({ ...editableProj, endDate: e.target.value })
              }
              className="w-full p-2 mt-1 border rounded"
              disabled={!project.isEditable}
            />
          </div>
        )}
        <div className="col-span-2 flex items-center">
          <input
            type="checkbox"
            checked={editableProj.currentlyWorkingOnIt}
            onChange={(e) =>
              setEditableProj({
                ...editableProj,
                currentlyWorkingOnIt: e.target.checked,
              })
            }
            disabled={!project.isEditable}
          />
          <label className="ml-2 text-sm font-semibold">
            Currently Working On It
          </label>
        </div>
        <div>
          <label className="text-sm font-semibold">GitHub URL: </label>
          {project.isEditable ? (
            <input
              type="url"
              value={editableProj.githubUrl}
              onChange={(e) =>
                setEditableProj({ ...editableProj, githubUrl: e.target.value })
              }
              className="w-full p-2 mt-1 border rounded"
            />
          ) : (
            editableProj.githubUrl && (
              <a
                href={editableProj.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
                style={
                    {wordBreak:'break-word'}
                }
              >
                {editableProj.githubUrl}
              </a>
            )
          )}
        </div>
        <div>
          <label className="text-sm font-semibold">Working URL: </label>
          {project.isEditable ? (
            <input
              type="url"
              value={editableProj.workingUrl}
              onChange={(e) =>
                setEditableProj({ ...editableProj, workingUrl: e.target.value })
              }
              style={
                {wordBreak:'break-word'}
            }
              className="w-full p-2 mt-1 border rounded"
            />
          ) : (
            editableProj.workingUrl && (
              <a
                href={editableProj.workingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {editableProj.workingUrl}
              </a>
            )
          )}
        </div>
        <div className="col-span-2">
          <label className="text-sm font-semibold">Associated With:</label>
          <input
            type="text"
            value={editableProj.associatedWith}
            onChange={(e) =>
              setEditableProj({
                ...editableProj,
                associatedWith: e.target.value,
              })
            }
            className="w-full p-2 mt-1 border rounded"
            disabled={!project.isEditable}
          />
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

export default Projects;
