import { useState } from "react";
import CommonDialog from "../CommonDialogs/PubScho";
import publicationData from "../../json-content/Accomplishments/publication-data.json";

const AddPublication = () => {
  const [data, setData] = useState(publicationData);
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
      <h2 className="text-2xl font-bold">Publications</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleAddItem}
      >
        Add Publication
      </button>
      <div className="mt-4">
        {data.length === 0 && <p>No publications added yet.</p>}
        {data.map((item, index) => (
          <div
            key={index}
            className="border p-4 rounded mt-4 bg-gray-100 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm">{item.publisher}</p>
              <p className="text-sm">Publication Date: {item.publicationdate}</p>
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
          type="publication"
        />
      )}
    </div>
  );
};

export default AddPublication;



// import { useState } from "react";
// import PublicationDialog from "./PublicationDialog";
// import publicationData from "../../json-content/Accomplishments/publication-data.json"; // Import the sample data

// const AddPublication = () => {
//   const [publications, setPublications] = useState(publicationData);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [currentPublication, setCurrentPublication] = useState(null);
//   const [editIndex, setEditIndex] = useState(null);

//   const handleAddPublication = () => {
//     setCurrentPublication(null);
//     setEditIndex(null);
//     setIsDialogOpen(true);
//   };

//   const handleSavePublication = (publication) => {
//     if (editIndex !== null) {
//       const updatedPublications = [...publications];
//       updatedPublications[editIndex] = publication;
//       setPublications(updatedPublications);
//     } else {
//       setPublications([...publications, publication]);
//     }
//     setIsDialogOpen(false);
//   };

//   const handleEditPublication = (index) => {
//     setCurrentPublication(publications[index]);
//     setEditIndex(index);
//     setIsDialogOpen(true);
//   };

//   const handleDeletePublication = (index) => {
//     setPublications(publications.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold">Publications</h2>
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
//         onClick={handleAddPublication}
//       >
//         Add Publication
//       </button>
//       <div className="mt-4">
//         {publications.length === 0 && <p>No publications added yet.</p>}
//         {publications.map((publication, index) => (
//           <div
//             key={index}
//             className="border p-4 rounded mt-4 bg-gray-100 flex justify-between items-center"
//           >
//             <div>
//               <h3 className="font-semibold">{publication.title}</h3>
//               <p className="text-sm">{publication.publisher}</p>
//               <p className="text-sm">Publication Date: {publication.publicationdate}</p>
//               <div
//                 className="text-sm mt-2"
//                 dangerouslySetInnerHTML={{ __html: publication.description }}
//               ></div>
//             </div>
//             <div className="flex space-x-2">
//               <button
//                 className="bg-blue-500 text-white px-2 py-1 rounded"
//                 onClick={() => handleEditPublication(index)}
//               >
//                 Edit
//               </button>
//               <button
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//                 onClick={() => handleDeletePublication(index)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       {isDialogOpen && (
//         <PublicationDialog
//           publication={currentPublication}
//           onSave={handleSavePublication}
//           onCancel={() => setIsDialogOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default AddPublication;
