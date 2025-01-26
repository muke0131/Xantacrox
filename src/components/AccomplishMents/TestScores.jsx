import { useState } from "react";
import testScores from "../../json-content/Accomplishments/test-scores.json";
import TestScoreDialog from "./TestScoreDialog";

const TestScores = () => {
  const [scores, setScores] = useState(testScores);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentScore, setCurrentScore] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddScore = () => {
    setCurrentScore(null);
    setEditIndex(null);
    setIsDialogOpen(true);
  };

  const handleSaveScore = (score) => {
    if (editIndex !== null) {
      const updatedScores = [...scores];
      updatedScores[editIndex] = score;
      setScores(updatedScores);
    } else {
      setScores([...scores, score]);
    }
    setIsDialogOpen(false);
  };

  const handleEditScore = (index) => {
    setCurrentScore(scores[index]);
    setEditIndex(index);
    setIsDialogOpen(true);
  };

  const handleDeleteScore = (index) => {
    setScores(scores.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold">Test Scores</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleAddScore}
      >
        Add Test Score
      </button>
      <div className="mt-4">
        {scores.length === 0 && <p>No test scores added yet.</p>}
        {scores.map((score, index) => (
          <div
            key={index}
            className="border p-4 rounded mt-4 bg-gray-100 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{score.title}</h3>
              <p className="text-sm">Type: {score.scoreType}</p>
              {score.scoreType === "Percentile" && (
                <p className="text-sm">Percentile: {score.percentile}</p>
              )}
              {score.scoreType === "Rank" && (
                <p className="text-sm">Rank: {score.rank}</p>
              )}
              {score.scoreType === "Score" && (
                <>
                  <p className="text-sm">
                    Score: {score.yourScore} / {score.maxScore} (
                    {score.percentage}%)
                  </p>
                </>
              )}
              <p className="text-sm">Associated With: {score.associatedWith}</p>
              <p className="text-sm">Exam Date: {score.examDate}</p>
              <div
                className="text-sm mt-2"
                dangerouslySetInnerHTML={{ __html: score.description }}
              ></div>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => handleEditScore(index)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDeleteScore(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {isDialogOpen && (
        <TestScoreDialog
          score={currentScore}
          onSave={handleSaveScore}
          onCancel={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default TestScores;
