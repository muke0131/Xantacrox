import { useState } from "react";
import CertificationDialog from "./CertificationDialog";
import certificationData from "../../json-content/Accomplishments/certification-data.json"; // Import the sample data

const AddCertification = () => {
  const [certifications, setCertifications] = useState(certificationData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCertification, setCurrentCertification] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddCertification = () => {
    setCurrentCertification(null);
    setEditIndex(null);
    setIsDialogOpen(true);
  };

  const handleSaveCertification = (certification) => {
    if (editIndex !== null) {
      const updatedCertifications = [...certifications];
      updatedCertifications[editIndex] = certification;
      setCertifications(updatedCertifications);
    } else {
      setCertifications([...certifications, certification]);
    }
    setIsDialogOpen(false);
  };

  const handleEditCertification = (index) => {
    setCurrentCertification(certifications[index]);
    setEditIndex(index);
    setIsDialogOpen(true);
  };

  const handleDeleteCertification = (index) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold">Certifications</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleAddCertification}
      >
        Add Certification
      </button>
      <div className="mt-4">
        {certifications.length === 0 && <p>No certifications added yet.</p>}
        {certifications.map((certification, index) => (
          <div
            key={index}
            className="border p-4 rounded mt-4 bg-gray-100 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{certification.name}</h3>
              <p className="text-sm">{certification.authority}</p>
              <p className="text-sm">Issued: {certification.issue_date}</p>
              <p className="text-sm">Expires: {certification.expiry_date}</p>
              <p className="text-sm">Score: {certification.score}</p>
              <div
                className="text-sm mt-2"
                dangerouslySetInnerHTML={{ __html: certification.description }}
              ></div>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => handleEditCertification(index)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDeleteCertification(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {isDialogOpen && (
        <CertificationDialog
          certification={currentCertification}
          onSave={handleSaveCertification}
          onCancel={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default AddCertification;
