import { useState } from "react";
import CompetitionDialog from "./CompetitionDialog";
import competitionData from "../../json-content/Accomplishments/competitions-data.json"; // Import the sample data

const AddCompetition = () => {
  const [competitions, setCompetitions] = useState(competitionData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCompetition, setCurrentCompetition] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddCompetition = () => {
    setCurrentCompetition(null);
    setEditIndex(null);
    setIsDialogOpen(true);
  };

  const handleSaveCompetition = (competition) => {
    if (editIndex !== null) {
      const updatedCompetitions = [...competitions];
      updatedCompetitions[editIndex] = competition;
      setCompetitions(updatedCompetitions);
    } else {
      setCompetitions([...competitions, competition]);
    }
    setIsDialogOpen(false);
  };

  const handleEditCompetition = (index) => {
    setCurrentCompetition(competitions[index]);
    setEditIndex(index);
    setIsDialogOpen(true);
  };

  const handleDeleteCompetition = (index) => {
    setCompetitions(competitions.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold">Competitions</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleAddCompetition}
      >
        Add Competition
      </button>
      <div className="mt-4">
        {competitions.length === 0 && <p>No competitions added yet.</p>}
        {competitions.map((competition, index) => (
          <div
            key={index}
            className="border p-4 rounded mt-4 bg-gray-100 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{competition.title}</h3>
              <p className="text-sm">Rank: {competition.position_rank}</p>
              <p className="text-sm">Competition: {competition.associated_with}</p>
              <p className="text-sm">Date: {competition.competition_date}</p>
              <a
                href={competition.award_proof_pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm"
              >
                View Award Proof
              </a>
              <div
                className="text-sm mt-2"
                dangerouslySetInnerHTML={{ __html: competition.description }}
              ></div>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => handleEditCompetition(index)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDeleteCompetition(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {isDialogOpen && (
        <CompetitionDialog
          competition={currentCompetition}
          onSave={handleSaveCompetition}
          onCancel={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default AddCompetition;
