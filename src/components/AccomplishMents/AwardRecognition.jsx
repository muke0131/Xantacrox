import { useState } from "react";
import InputDialogAcco from "./InputDialogAcco";
import awardrecognition from "../../json-content/Accomplishments/award-recognition";

const AwardRecognition = () => {
  const [awards, setAwards] = useState(awardrecognition);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAward, setCurrentAward] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddAward = () => {
    setCurrentAward(null); // Set to null for new award
    setEditIndex(null); // Reset the editIndex for new award
    setIsDialogOpen(true); // Open the dialog
  };

  const handleSaveAward = (award) => {
    if (editIndex !== null) {
      const updatedAwards = [...awards];
      updatedAwards[editIndex] = award;
      setAwards(updatedAwards); // Update the award if editing
    } else {
      setAwards([...awards, award]); // Add new award if no editing
    }
    setIsDialogOpen(false); // Close the dialog
  };

  const handleEditAward = (index) => {
    setCurrentAward(awards[index]); // Load the award into the form for editing
    setEditIndex(index); // Set the index to edit
    setIsDialogOpen(true); // Open the dialog for editing
  };

  const handleDeleteAward = (index) => {
    setAwards(awards.filter((_, i) => i !== index)); // Delete the award
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold">Awards and Recognition</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition"
        onClick={handleAddAward}
      >
        Add Award/Recognition
      </button>
      <div className="mt-4">
        {awards.length === 0 && <p>No awards or recognition added yet.</p>}
        {awards.map((award, index) => (
          <div
            key={index}
            className="border p-4 rounded mt-4 bg-gray-100 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-xl">{award.title}</h3>
              <p className="text-sm text-gray-500">{award.issuer}</p>
              <p className="text-sm text-gray-500">{award.associatedWith}</p>
              <p className="text-sm text-gray-500">Issued: {award.issueDate}</p>
              <div
                className="text-sm mt-2 text-gray-700"
                dangerouslySetInnerHTML={{ __html: award.description }}
              ></div>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                onClick={() => handleEditAward(index)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                onClick={() => handleDeleteAward(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {isDialogOpen && (
        <InputDialogAcco
          award={currentAward} // Pass current award or null for new
          onSave={handleSaveAward}
          onCancel={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default AwardRecognition;
