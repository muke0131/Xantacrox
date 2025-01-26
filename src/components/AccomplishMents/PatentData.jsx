import { useState } from "react";
import PatentDialog from "./PatentDialog";
import patentData from "../../json-content/Accomplishments/patent-data.json"; // Import the sample data

const AddPatent = () => {
  const [patents, setPatents] = useState(patentData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPatent, setCurrentPatent] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddPatent = () => {
    setCurrentPatent(null);
    setEditIndex(null);
    setIsDialogOpen(true);
  };

  const handleSavePatent = (patent) => {
    if (editIndex !== null) {
      const updatedPatents = [...patents];
      updatedPatents[editIndex] = patent;
      setPatents(updatedPatents);
    } else {
      setPatents([...patents, patent]);
    }
    setIsDialogOpen(false);
  };

  const handleEditPatent = (index) => {
    setCurrentPatent(patents[index]);
    setEditIndex(index);
    setIsDialogOpen(true);
  };

  const handleDeletePatent = (index) => {
    setPatents(patents.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold">Patents</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleAddPatent}
      >
        Add Patent
      </button>
      <div className="mt-4">
        {patents.length === 0 && <p>No patents added yet.</p>}
        {patents.map((patent, index) => (
          <div
            key={index}
            className="border p-4 rounded mt-4 bg-gray-100 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{patent.patenttitle}</h3>
              <p className="text-sm">{patent.patentoffice}</p>
              <p className="text-sm">Application Status: {patent.applicationstatus}</p>
              <p className="text-sm">Patent Status: {patent.patentstatus}</p>
              <p className="text-sm">Filing Date: {patent.filingdate}</p>
              <p className="text-sm">Issue Date: {patent.issuedate}</p>
              <div
                className="text-sm mt-2"
                dangerouslySetInnerHTML={{ __html: patent.description }}
              ></div>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => handleEditPatent(index)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDeletePatent(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {isDialogOpen && (
        <PatentDialog
          patent={currentPatent}
          onSave={handleSavePatent}
          onCancel={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default AddPatent;
