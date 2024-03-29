// LensDB.jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faUser,
  faSearch,
  faEye,
  faCloudDownloadAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import "./surgeryDB.css";

const LensDB = () => {
  const handleExamHoursChange = (e) => setExamHours(e.target.value);
  const handleExamMinutesChange = (e) => setExamMinutes(e.target.value);
  const handleExamAMPMChange = (e) => setExamAMPM(e.target.value);
  const [activeButton, setActiveButton] = useState("add");
  const [examDate, setExamDate] = useState(null);
  const [examHours, setExamHours] = useState(null);
  const [examMinutes, setExamMinutes] = useState(null);
  const [examAMPM, setExamAMPM] = useState(null);
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
  const hoursOptions = Array.from({ length: 12 }, (_, index) =>
    (index + 1).toString(),
  );
  const minutesOptions = Array.from({ length: 60 }, (_, index) =>
    index.toString().padStart(2, "0"),
  );

  const imageUrl = null;
  const eyeImages = null;
  const handleSearch = (searchValue) => {
    console.log("Search value:", searchValue);
  };
  return (
    <div>
      <header className="header">
        <h1>Appointment Handling Dashboard</h1>
      </header>
      <div className="extra-blue-bar"></div>
      <div className="content-container">
        <div className="container">
          <div className="left-panel">
            <button
              className={`rounded-button ${activeButton === "add" ? "active" : ""}`}
              onClick={() => handleButtonClick("add")}
            >
              Add
            </button>
            <button
              className={`rounded-button ${activeButton === "view" ? "active" : ""}`}
              onClick={() => handleButtonClick("view")}
            >
              View
            </button>
          </div>
          <div className="right-panel">
            {activeButton === "add" && (
              <form>
                <div className="above-form-and-table">
                  <p>
                    <b>APPOINTMENT DETAILS</b>
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="patientID" className="label">
                    Patient ID:
                  </label>
                  <input
                    type="text"
                    id="patientID"
                    className="lInput"
                    placeholder="Enter Patient ID"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date" className="label">
                    Surgery Date:
                  </label>
                  <div className="date-input">
                    <DatePicker
                      selected={examDate}
                      onChange={(date) => setExamDate(date)}
                      placeholderText="Select Date"
                      className="lInput"
                      dateFormat="yyyy/MM/dd"
                    />
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      style={{
                        fontSize: "1.5em",
                        color: "#6FA1EE",
                        marginLeft: "8px",
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="time" className="label">
                    Surgery Time:
                  </label>
                  <div className="time-input">
                    <select
                      id="hours"
                      className="lInputt"
                      value={examHours || ""}
                      onChange={(e) => handleExamHoursChange(e)}
                    >
                      <option value="" disabled>
                        --
                      </option>
                      {hoursOptions.map((hour) => (
                        <option key={hour} value={hour}>
                          {hour}
                        </option>
                      ))}
                    </select>{" "}
                    hours
                    <select
                      id="minutes"
                      className="lInputt"
                      value={examMinutes || ""}
                      onChange={(e) => handleExamMinutesChange(e)}
                    >
                      <option value="" disabled>
                        --
                      </option>
                      {minutesOptions.map((minute) => (
                        <option key={minute} value={minute}>
                          {minute}
                        </option>
                      ))}
                    </select>{" "}
                    minutes
                    <select
                      id="ampm"
                      className="lInputt"
                      value={examAMPM || ""}
                      onChange={(e) => handleExamAMPMChange(e)}
                    >
                      <option value="" disabled>
                        --
                      </option>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                    AM/PM
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description" className="label">
                    Description:
                  </label>
                  <textarea
                    id="description"
                    className="lInput"
                    placeholder="Enter description"
                  ></textarea>
                </div>

                <div className="form-group button-group">
                  <label htmlFor="imageUpload" className="insert-image-text">
                    Upload Medical Report
                    <FontAwesomeIcon
                      icon={faCloudUploadAlt}
                      style={{ fontSize: "1.5em", color: "#6FA1EE" }}
                      className="cloud-icon"
                    />
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const selectedImage = e.target.files[0];
                      console.log("Selected Image:", selectedImage);
                    }}
                  />
                  <button
                    type="button"
                    className="button-img"
                    onClick={() =>
                      document.getElementById("imageUpload").click()
                    }
                  >
                    Upload Document
                  </button>
                </div>
                <div className="form-group button-group">
                  <label htmlFor="imageUpload" className="insert-image-text">
                    Medical Images
                    <FontAwesomeIcon
                      icon={faCloudUploadAlt}
                      style={{ fontSize: "1.5em", color: "#6FA1EE" }}
                      className="cloud-icon"
                    />
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const selectedImage = e.target.files[0];
                      console.log("Selected Image:", selectedImage);
                    }}
                  />
                  <button
                    type="button"
                    className="button-img"
                    onClick={() =>
                      document.getElementById("imageUpload").click()
                    }
                  >
                    Upload Image (Medical Images)
                  </button>
                </div>
                <div className="form-group button-group">
                  <label htmlFor="imageUpload" className="insert-image-text">
                    Patient's Image
                    <FontAwesomeIcon
                      icon={faCloudUploadAlt}
                      style={{ fontSize: "1.5em", color: "#6FA1EE" }}
                      className="cloud-icon"
                    />
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const selectedImage = e.target.files[0];
                      console.log("Selected Image:", selectedImage);
                    }}
                  />
                  <button
                    type="button"
                    className="button-img"
                    onClick={() =>
                      document.getElementById("imageUpload").click()
                    }
                  >
                    Upload Patient's Image
                  </button>
                </div>
                <div className="form-group button-group">
                  <button type="submit" className="button">
                    Submit
                  </button>
                </div>
              </form>
            )}

            {activeButton === "view" && (
              <div>
                <div className="above-form-and-table">
                  <p>
                    <b>VIEW APPOINTMENT DETAILS</b>
                  </p>
                </div>
                <div className="search-section1">
                  <div className="search-input">
                    <input
                      type="text"
                      id="searchPatientId"
                      className="lInput"
                      placeholder="Enter Patient ID"
                      onChange={(e) => handleSearch(e.target.value)}
                    />

                    <button
                      type="button"
                      className="search-icon"
                      onClick={() => handleSearch()}
                    >
                      <FontAwesomeIcon
                        icon={faSearch}
                        style={{ fontSize: "1.5em", color: "#6FA1EE" }}
                      />
                    </button>
                  </div>
                </div>

                <div className="columns-container">
                  {activeButton === "view" && (
                    <>
                      <div className="column">
                        <div className="image-container">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt="User"
                              className="user-image"
                            />
                          ) : (
                            <div
                              className="user-icon"
                              style={{ width: "200px", height: "200px" }}
                            >
                              <FontAwesomeIcon
                                icon={faUser}
                                size="8x"
                                color="black"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="column second-column">
                        <div className="label-value-pair-P">
                          <span className="labelP">Patient ID:</span>
                          <span className="valueP"></span>
                        </div>

                        <div className="label-value-pair-P">
                          <span className="labelP">Surgery Date:</span>
                          <span className="valueP"></span>
                        </div>
                        <div className="label-value-pair-P">
                          <span className="labelP">Surgery Time:</span>
                          <span className="valueP"></span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="label-value-pair">
                  <span className="label">Description:</span>
                  <span className="value2"></span>
                </div>
                <div className="form-group button-group">
                  <label htmlFor="imageUpload" className="insert-image-text">
                    <b>Download Medical Report</b>
                    <FontAwesomeIcon
                      icon={faCloudDownloadAlt}
                      style={{ fontSize: "1.5em", color: "#6FA1EE" }}
                      className="cloud-icon"
                    />
                  </label>

                  <button
                    type="button"
                    className="button-img"
                    onClick={() => {
                      alert("Downloading your medical report...");
                    }}
                  >
                    Download Document
                  </button>
                </div>
                <div className="form-group button-group">
                  <span>
                    <h4>Uploaded Eye Images : </h4>
                  </span>
                  {eyeImages === null ? (
                    <span>
                      <h4 className="eye-text"> No Uploaded Eye Images</h4>
                    </span>
                  ) : (
                    // Render the uploaded eye images if eyeImages is not null
                    <div className="eye-images-section">
                      <h2>Uploaded Eye Images</h2>
                      <div className="columns-container">
                        {eyeImages.map((image, index) => (
                          <div className="column" key={index}>
                            <div className="eye-image-container">
                              <img
                                src={image}
                                alt={`Eye ${index}`}
                                className="eye-image"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="empty-row"></div>
      </div>
    </div>
  );
};

export default LensDB;
