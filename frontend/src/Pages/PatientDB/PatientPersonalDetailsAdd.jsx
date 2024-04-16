import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt,
    faCloudUploadAlt,
    faUser,
    faSearch,
    faEye,
} from "@fortawesome/free-solid-svg-icons";
import "./patient.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"

const PatientPersonalDetailsAdd = ({patientId, setPatientId, doctorId}) => {

    const navigate = useNavigate()

    const [patientFirstname, setPatientFirstname] = useState('');
    const [patientLastname, setPatientLastname] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setExpiryDate] = useState(null);
    const [age, setAge] = useState(null);
    
    const [contactNo, setContactNo] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [patientImage, setPatientImage] = useState(null);
    const [patientImagePath, setPatientImagePath] = useState(null)

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();

        if (
            today.getMonth() < birthDateObj.getMonth() ||
            (today.getMonth() === birthDateObj.getMonth() &&
                today.getDate() < birthDateObj.getDate())
        ) {
            age--;
        }

        return age;
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setPatientImage(selectedImage)
        setPatientImagePath(URL.createObjectURL(selectedImage))
    }

    const handleAddPatient = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8080/addpatient/${doctorId}`, {
                patientFirstname : patientFirstname,
                patientLastname : patientLastname,
                patientGender : gender,
                patientDOB : birthDate,
                patientIdNIC : patientId,
                patientPhoneNumber : contactNo,
                patientAddress : address,
                patientDescription : description,
                patientImagePath : patientImagePath
            })
            alert("Successfully added patient")
            // navigate(`/${doctorId}/patientDB#clinic-data`)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <form>
                <div className="above-form-and-table">
                    <p>
                        <b>PERSONAL DETAILS</b>
                    </p>
                </div>
                <div className="form-group">
                    <label htmlFor="name" className="label">
                        First Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="lInput"
                        placeholder="Enter first name"
                        value={patientFirstname}
                        onChange={(e) => setPatientFirstname(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name" className="label">
                        Last Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="lInput"
                        placeholder="Enter last name"
                        value={patientLastname}
                        onChange={(e) => setPatientLastname(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sex" className="label">
                        Gender:
                    </label>
                    <div className="sex-options">
                        <label>
                            <input
                                type="radio"
                                name="sex"
                                value="female"
                                checked={gender === 'female'}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            Female
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="sex"
                                value="male"
                                checked={gender === 'male'}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            Male
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="birthday" className="label">
                        Date of Birth:
                    </label>
                    <div className="date-input1">
                        <DatePicker
                            selected={birthDate}
                            onChange={(date) => {
                                setExpiryDate(date);
                                const age = calculateAge(date);
                                setAge(age);
                            }}
                            placeholderText="Select date YYYY/MM/DD/"
                            className="lInput"
                            dateFormat="yyyy/MM/dd/"
                            portalId="your-unique-portal-id"
                        />
                        <FontAwesomeIcon
                            icon={faCalendarAlt}
                            style={{
                                fontSize: "1.5em",
                                color: "#6FA1EE",
                                marginLeft: "0px",
                            }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="age" className="label">
                        Age:
                    </label>
                    <input
                        type="text"
                        id="age"
                        className="lInput"
                        value={age !== null ? age : ""}
                        placeholder="Automatically calculated"
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="patientId" className="label">
                        Patient ID:
                    </label>
                    <input
                        type="text"
                        id="patientId"
                        className="lInput"
                        placeholder="Enter NIC number"
                        
                        onChange={(e) => setPatientId(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contactNumber" className="label">
                        Contact Number:
                    </label>
                    <input
                        type="text"
                        id="contactNumber"
                        className="lInput"
                        placeholder="Enter contact number"
                        value={contactNo}
                        onChange={(e) => setContactNo(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address" className="label">
                        Address:
                    </label>
                    <input
                        type="text"
                        id="address"
                        className="lInput"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="label">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        className="lInput"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div className="form-group button-group">
                    <label
                        htmlFor="imageUpload"
                        className="insert-image-text"
                    >
                        Upload Patient's Image
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
                        onChange={handleImageChange}
                    />
                    <button
                        type="button"
                        className="button-img"
                        onClick={() =>
                            document.getElementById("imageUpload").click()
                        }
                    >
                        Upload Image
                    </button>
                    {patientImage && (
                        <div>
                            <h2>Selected Image Preview:</h2>
                            <img src={URL.createObjectURL(patientImage)} alt="Patient" />
                        </div>
                    )}
                </div>
                <div className="form-group button-group">
                <button type="submit" className="button"
                    onClick={handleAddPatient}
                    >
                    Add Patient
                </button>
            </div>

            </form>
        </div>
    )
}

export default PatientPersonalDetailsAdd;