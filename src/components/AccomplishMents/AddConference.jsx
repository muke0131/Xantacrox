import { useState } from "react";
import ConferenceDialog from "./ConferenceDialog";
import conferenceData from "../../json-content/Accomplishments/conferences-data.json";

const AddConference = () => {
  const [conferences, setConferences] = useState(conferenceData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentConference, setCurrentConference] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddConference = () => {
    setCurrentConference(null);
    setEditIndex(null);
    setIsDialogOpen(true);
  };

  const handleSaveConference = (conference) => {
    if (editIndex !== null) {
      const updatedConferences = [...conferences];
      updatedConferences[editIndex] = conference;
      setConferences(updatedConferences);
    } else {
      setConferences([...conferences, conference]);
    }
    setIsDialogOpen(false);
  };

  const handleEditConference = (index) => {
    setCurrentConference(conferences[index]);
    setEditIndex(index);
    setIsDialogOpen(true);
  };

  const handleDeleteConference = (index) => {
    setConferences(conferences.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold">Conferences & Workshops</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleAddConference}
      >
        Add Conference/Workshop
      </button>
      <div className="mt-4">
        {conferences.length === 0 && <p>No conferences or workshops added yet.</p>}
        {conferences.map((conference, index) => (
          <div
            key={index}
            className="border p-4 rounded mt-4 bg-gray-100 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{conference.title}</h3>
              <p className="text-sm">Organiser: {conference.organiser}</p>
              <p className="text-sm">Address: {conference.event_address}</p>
              <p className="text-sm">Date: {conference.event_date}</p>
              <a
                href={conference.google_drive_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm"
              >
                View Resources
              </a>
              <div
                className="text-sm mt-2"
                dangerouslySetInnerHTML={{ __html: conference.description }}
              ></div>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => handleEditConference(index)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDeleteConference(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {isDialogOpen && (
        <ConferenceDialog
          conference={currentConference}
          onSave={handleSaveConference}
          onCancel={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default AddConference;
