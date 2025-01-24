import { useState } from "react";
import about_data from "../json-content/student-profile";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Student_Details = () => {
  const [abfoda, setAbfoda] = useState(about_data);

  const handleEditClick = (section) => {
    const sectionRef = document.getElementById(`${section}-first-input`);
    if (sectionRef) {
      sectionRef.focus(); // Focus on the first input field of the section
    }
    setAbfoda({
      ...abfoda,
      [0]: {
        ...abfoda[0],
        [section]: { ...abfoda[0][section], isEditable: true }, // Enable editing for this section
      },
    });
  };

  const handleSaveClick = (section) => {
    setAbfoda({
      ...abfoda,
      [0]: {
        ...abfoda[0],
        [section]: { ...abfoda[0][section], isEditable: false }, // Disable editing after saving
        about: section === "about" ? { ...abfoda[0].about, isFreezed: true ,isEditable:false} : abfoda[0].about, // Freeze About section after save
        summary: section === "summary" ? { ...abfoda[0].summary, isEditable: false } : abfoda[0].summary, // Keep Summary editable after save
        address: section === "address" ? { ...abfoda[0].address, isEditable: false } : abfoda[0].address, // Keep Address editable after save
      },
    });
  };

  const handleInputChange = (e, id, section, field) => {
    const { value } = e.target;

    if (section === "about" || section === "summary" || section === "address") {
      setAbfoda({
        ...abfoda,
        [0]: {
          ...abfoda[0],
          [section]: { ...abfoda[0][section], [field]: value },
        },
      });
    } else if (section === "socialMedia") {
      setAbfoda({
        ...abfoda,
        [0]: {
          ...abfoda[0],
          socialMedia: {
            ...abfoda[0].socialMedia,
            list: abfoda[0].socialMedia.list.map((sm) =>
              sm.id === id ? { ...sm, [field]: value } : sm
            ),
          },
        },
      });
    }
  };

  const addSocialMedia = () => {
    const newId = Date.now();
    setAbfoda({
      ...abfoda,
      [0]: {
        ...abfoda[0],
        socialMedia: {
          ...abfoda[0].socialMedia,
          list: [
            ...abfoda[0].socialMedia.list,
            { id: newId, platform: "", link: "" },
          ],
        },
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <form>
        {/* Basic Details */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">
            About
            <i
              className={`fas ${
                abfoda[0].about.isFreezed
                  ? "fa-lock text-gray-500"
                  : "fa-pencil-alt text-blue-500"
              } float-right h-6 cursor-pointer`}
              onClick={() => {
                if (!abfoda[0].about.isFreezed) {
                  handleEditClick("about");
                }
              }}
            />
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Full Name:</label>
              <input
                id="about-first-input"
                type="text"
                value={abfoda[0].about.Full_Name}
                onChange={(e) => handleInputChange(e, null, "about", "Full_Name")}
                className="p-2 mt-2 border border-gray-300 rounded"
                disabled={!abfoda[0].about.isEditable}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Date of Birth:</label>
              <input
                type="text"
                value={abfoda[0].about.DateOfBirth}
                onChange={(e) => handleInputChange(e, null, "about", "DateOfBirth")}
                className="p-2 mt-2 border border-gray-300 rounded"
                disabled={!abfoda[0].about.isEditable}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Gender:</label>
              <input
                type="text"
                value={abfoda[0].about.Gender}
                onChange={(e) => handleInputChange(e, null, "about", "Gender")}
                className="p-2 mt-2 border border-gray-300 rounded"
                disabled={!abfoda[0].about.isEditable}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Current/Latest College:</label>
              <input
                type="text"
                value={abfoda[0].about.College}
                onChange={(e) => handleInputChange(e, null, "about", "College")}
                className="p-2 mt-2 border border-gray-300 rounded"
                disabled={!abfoda[0].about.isEditable}
              />
            </div>
          </div>
          {abfoda[0].about.isEditable && (
            <button
              type="button"
              onClick={() => handleSaveClick("about")}
              className="bg-green-500 text-white px-8 py-2 rounded-full shadow-lg mt-4"
            >
              Save
            </button>
          )}
        </section>

        {/* Summary */}
        <section className="space-y-6 mt-6">
          <h2 className="text-2xl font-bold">
            Summary
            <i
              className={`fas ${
                abfoda[0].summary.isEditable
                  ? "fa-pencil-alt text-blue-500"
                  : "fa-pencil-alt text-blue-500"
              } float-right h-6 cursor-pointer`}
              onClick={() => {
                if (!abfoda[0].summary.isEditable) {
                  handleEditClick("summary");
                }
              }}
            />
          </h2>
          <textarea
            value={abfoda[0].summary.text}
            onChange={(e) => handleInputChange(e, null, "summary", "text")}
            className="w-full p-4 border border-gray-300 rounded-md"
            rows="5"
            disabled={!abfoda[0].summary.isEditable}
          ></textarea>
          {abfoda[0].summary.isEditable && (
            <button
              type="button"
              onClick={() => handleSaveClick("summary")}
              className="bg-green-500 text-white px-8 py-2 rounded-full shadow-lg mt-4"
            >
              Save
            </button>
          )}
        </section>

        {/* Address */}
        <section className="space-y-6 mt-6">
          <h2 className="text-2xl font-bold">
            Address
            <i
              className={`fas ${
                abfoda[0].address.isEditable
                  ? "fa-pencil-alt text-blue-500"
                  : "fa-pencil-alt text-blue-500"
              } float-right h-6 cursor-pointer`}
              onClick={() => {
                if (!abfoda[0].address.isEditable) {
                  handleEditClick("address");
                }
              }}
            />
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Permanent Address:</label>
              <input
                type="text"
                value={abfoda[0].address.Permanent_Address}
                onChange={(e) => handleInputChange(e, null, "address", "Permanent_Address")}
                className="p-2 mt-2 border border-gray-300 rounded"
                disabled={!abfoda[0].address.isEditable}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Current Address:</label>
              <input
                type="text"
                value={abfoda[0].address.Current_Address}
                onChange={(e) => handleInputChange(e, null, "address", "Current_Address")}
                className="p-2 mt-2 border border-gray-300 rounded"
                disabled={!abfoda[0].address.isEditable}
              />
            </div>
          </div>
          {abfoda[0].address.isEditable && (
            <button
              type="button"
              onClick={() => handleSaveClick("address")}
              className="bg-green-500 text-white px-8 py-2 rounded-full shadow-lg mt-4"
            >
              Save
            </button>
          )}
        </section>

        {/* Social Media Accounts */}
        <section className="space-y-6 mt-6">
          <h2 className="text-2xl font-bold">Social Media Accounts</h2>
          {abfoda[0].socialMedia.list.map((sm) => (
            <div key={sm.id} className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold">Platform:</label>
                <input
                  type="text"
                  name="platform"
                  value={sm.platform}
                  onChange={(e) =>
                    handleInputChange(e, sm.id, "socialMedia", "platform")
                  }
                  className="p-2 mt-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold">Link:</label>
                <input
                  type="text"
                  name="link"
                  value={sm.link}
                  onChange={(e) =>
                    handleInputChange(e, sm.id, "socialMedia", "link")
                  }
                  className="p-2 mt-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          ))}
        </section>

        {/* Add New Social Media Button */}
        <button
          type="button"
          onClick={addSocialMedia}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg mt-4"
        >
          + Add New
        </button>
      </form>
    </div>
  );
};

export default Student_Details;
