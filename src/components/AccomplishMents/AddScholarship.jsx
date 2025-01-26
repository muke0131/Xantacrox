import { useState } from "react";
import CommonDialog from "../CommonDialogs/PubScho";
import scholarshipData from "../../json-content/Accomplishments/scholarship-data.json";

const AddScholarship = () => {
  const [data, setData] = useState(scholarshipData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddItem = () => {
    setCurrentItem(null);
    setEditIndex(null);
    setIsDialogOpen(true);
  };

  const handleSaveItem = (item) => {
    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = item;
      setData(updatedData);
    } else {
      setData([...data, item]);
    }
    setIsDialogOpen(false);
  };

  const handleEditItem = (index) => {
    setCurrentItem(data[index]);
    setEditIndex(index);
    setIsDialogOpen(true);
  };

  const handleDeleteItem = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold">Scholarships</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleAddItem}
      >
        Add Scholarship
      </button>
      <div className="mt-4">
        {data.length === 0 && <p>No scholarships added yet.</p>}
        {data.map((item, index) => (
          <div
            key={index}
            className="border p-4 rounded mt-4 bg-gray-100 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm">Awarded By: {item.awardedBy}</p>
              <p className="text-sm">Amount: {item.amount}</p>
              <p className="text-sm">Date Awarded: {item.dateAwarded}</p>
              <div
                className="text-sm mt-2"
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></div>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => handleEditItem(index)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDeleteItem(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {isDialogOpen && (
        <CommonDialog
          item={currentItem}
          onSave={handleSaveItem}
          onCancel={() => setIsDialogOpen(false)}
          type="scholarship"
        />
      )}
    </div>
  );
};

export default AddScholarship;
