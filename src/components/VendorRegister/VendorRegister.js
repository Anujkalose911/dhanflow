import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios"; // Make sure to import axios
import "../../Assests/CSS/VendorRegister.css";
import Header2 from "../../Layouts/Headers/Header2";

const VendorRegister = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [msmeId, setMsmeId] = useState(""); // State for MSME ID
  const [loading, setLoading] = useState(false); // Add loading state
  const [vendors, setVendors] = useState([
    {
      vendorName: "",
      phoneNumber: "",
      vendorEmail: "",
      vendorIndustryName: "",
      paymentMode: "",
      otherPaymentMode: "",
      validationErrors: {
        vendorName: "",
        phoneNumber: "",
        vendorEmail: "",
        vendorIndustryName: "",
        otherPaymentMode: "",
      },
    },
  ]);

  const isVendorNameDuplicate = (name) => {
    return vendors.some((vendor) => vendor.vendorName === name);
  };

  const handleAddVendor = () => {
    if (!isCurrentVendorValid(0)) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Information",
        text: "Please fill out all the required fields correctly before adding a new vendor.",
        confirmButtonText: "OK",
      });
      return;
    }

    if (vendors.length < 3) {
      setVendors([
        ...vendors,
        {
          vendorName: "",
          phoneNumber: "",
          vendorEmail: "",
          vendorIndustryName: "",
          paymentMode: "",
          otherPaymentMode: "",
          validationErrors: {
            vendorName: "",
            phoneNumber: "",
            vendorEmail: "",
            vendorIndustryName: "",
            otherPaymentMode: "",
          },
        },
      ]);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Limit Reached",
        text: "You can only add up to three vendors.",
        confirmButtonText: "OK",
      });
    }
  };
  const isCurrentVendorValid = (index) => {
    const vendor = vendors[index];
    return (
      vendor.vendorName &&
      /^[0-9]{10}$/.test(vendor.phoneNumber) &&
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        vendor.vendorEmail
      ) &&
      vendor.vendorIndustryName &&
      (vendor.paymentMode !== "Others" || vendor.otherPaymentMode)
    );
  };

  const handleRemoveVendor = (indexToRemove) => {
    setVendors(vendors.filter((_, index) => index !== indexToRemove));
  };

  const handleVendorChange = (index, field, value) => {
    if (field === "vendorName" && isVendorNameDuplicate(value)) {
      Swal.fire({
        icon: "error",
        title: "Duplicate Vendor Name",
        text: "This vendor name already exists. Please choose another.",
        confirmButtonText: "OK",
      });
      return;
    }
    const updatedVendors = vendors.map((vendor, i) =>
      i === index ? { ...vendor, [field]: value } : vendor
    );
    setVendors(updatedVendors);
  };

  const handlePaymentModeChange = (index, value) => {
    const updatedVendors = vendors.map((vendor, i) =>
      i === index
        ? { ...vendor, paymentMode: value, otherPaymentMode: "" }
        : vendor
    );
    setVendors(updatedVendors);
  };

  const handleValidation = (index) => {
    const updatedVendors = [...vendors];
    const vendor = vendors[index];

    updatedVendors[index].validationErrors = {
      vendorName: vendor.vendorName ? "" : "Vendor name is required.",
      phoneNumber: /^[0-9]{10}$/.test(vendor.phoneNumber)
        ? ""
        : "Phone number must be 10 digits.",
      vendorEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        vendor.vendorEmail
      )
        ? ""
        : "Invalid email format.",
      vendorIndustryName: vendor.vendorIndustryName
        ? ""
        : "Industry name is required.",
      otherPaymentMode:
        vendor.paymentMode === "Others" && !vendor.otherPaymentMode
          ? "Please specify payment mode."
          : "",
    };

    setVendors(updatedVendors);
  };

  const isFormValid = () => {
    for (const vendor of vendors) {
      if (
        !vendor.vendorName ||
        !vendor.phoneNumber ||
        !vendor.vendorEmail ||
        !vendor.vendorIndustryName ||
        !vendor.paymentMode
      ) {
        return false;
      }
      if (vendor.paymentMode === "Others" && !vendor.otherPaymentMode) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill out all required fields.",
        confirmButtonText: "OK",
      });
    } else {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8080/vendors/register",
          vendors
        );
        //console.log("efetg", vendors);
        Swal.fire({
          icon: "success",
          title: "Vendor Registered",
          text: response.data.message,
          confirmButtonText: "OK",
        });
        // Optionally reset vendors or redirect
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message || "An error occurred!",
          confirmButtonText: "OK",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddMultipleVendors = () => {
    navigate("/multiplevendor"); // Redirect to the Add Multiple Vendors page
  };

  const isRemoveButtonEnabled = (index) => {
    return vendors.length > 1 && vendors[index].vendorName !== "";
  };
  useEffect(() => {
    const storedMsmeId = localStorage.getItem("msmeId"); // Retrieve msmeId from localStorage
    if (storedMsmeId) {
      setMsmeId(storedMsmeId); // Set the state with the retrieved msmeId
    } else {
      console.error("MSME ID not found in localStorage.");
    }
  }, []);

  return (
    <section>
      <Header2 />
      <Card style={{ width: "30rem" }} className="Vendor-register-body">
        <Card.Body>
          <div className="Vendor-register-main-content">
            <div className="Vendor-register-container">
              <form onSubmit={handleSubmit}>
                <h2>Vendor Registration</h2>
                <div id="vendorContainer">
                  {vendors.map((vendor, index) => (
                    <div className="vendor-fields" key={index}>
                      <div className="form-row">
                        <label>Vendor Name</label>
                        <input
                          type="text"
                          className="vendorName"
                          placeholder="Enter Your Vendor Name"
                          value={vendor.vendorName}
                          onBlur={() => handleValidation(index)} // Validate on blur
                          onChange={(e) =>
                            handleVendorChange(
                              index,
                              "vendorName",
                              e.target.value
                            )
                          }
                          pattern="^[A-Za-z\s]+$"
                          required
                        />
                        <span className="error-text">
                          {vendor.validationErrors.vendorName}
                        </span>
                      </div>
                      <div className="form-row">
                        <label>Phone Number</label>
                        <input
                          type="text"
                          className="phoneNumber"
                          placeholder="Enter Your Vendor Number"
                          maxLength="10"
                          value={vendor.phoneNumber}
                          onBlur={() => handleValidation(index)} // Validate on blur
                          onChange={(e) =>
                            handleVendorChange(
                              index,
                              "phoneNumber",
                              e.target.value
                            )
                          }
                          pattern="^\d{10}$"
                          required
                        />
                        <span className="error-text">
                          {vendor.validationErrors.phoneNumber}
                        </span>
                      </div>
                      <div className="form-row">
                        <label>Vendor Email</label>
                        <input
                          type="email"
                          className="vendorEmail"
                          placeholder="Enter Your Vendor E-mail"
                          value={vendor.vendorEmail}
                          onBlur={() => handleValidation(index)} // Validate on blur
                          onChange={(e) =>
                            handleVendorChange(
                              index,
                              "vendorEmail",
                              e.target.value
                            )
                          }
                          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                          required
                        />
                        <span className="error-text">
                          {vendor.validationErrors.vendorEmail}
                        </span>
                      </div>
                      <div className="form-row">
                        <label>Vendor Industry Name (as in tally)</label>
                        <input
                          type="text"
                          className="vendorIndustryName"
                          placeholder="Enter Your Vendor Industry Name"
                          value={vendor.vendorIndustryName}
                          onBlur={() => handleValidation(index)} // Validate on blur
                          onChange={(e) =>
                            handleVendorChange(
                              index,
                              "vendorIndustryName",
                              e.target.value
                            )
                          }
                          pattern="^[A-Za-z\s]+$"
                          required
                        />
                        <span className="error-text">
                          {vendor.validationErrors.vendorIndustryName}
                        </span>
                      </div>
                      <div className="form-row">
                        <label>Preferred Payment Mode</label>
                        <select
                          value={vendor.paymentMode}
                          onChange={(e) =>
                            handlePaymentModeChange(index, e.target.value)
                          }
                          required
                        >
                          <option value="" disabled>
                            Select Payment Mode
                          </option>
                          <option value="Cash">Cash</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Cheque">Cheque</option>
                          <option value="Others">Others</option>
                        </select>
                        {vendor.paymentMode === "Others" && (
                          <input
                            type="text"
                            className="otherPaymentMode"
                            placeholder="Specify Payment Mode"
                            value={vendor.otherPaymentMode}
                            onChange={(e) =>
                              handleVendorChange(
                                index,
                                "otherPaymentMode",
                                e.target.value
                              )
                            }
                            required
                          />
                        )}
                      </div>
                      <button
                        type="button"
                        className="Vendor-register-remove-btn"
                        onClick={() => handleRemoveVendor(index)}
                        disabled={!isRemoveButtonEnabled(index)}
                      >
                        Remove Vendor
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleAddVendor}
                  className="Vendor-register-remove-btn"
                >
                  Add Vendor
                </button>
                <button
                  type="button"
                  onClick={handleAddMultipleVendors}
                  className="Vendor-register-remove-btn"
                >
                  Add Multiple Vendors
                </button>
                <button type="submit" className="Vendor-register-remove-btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
};

export default VendorRegister;
