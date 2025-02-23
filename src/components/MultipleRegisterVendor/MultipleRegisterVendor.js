// import React, { useState } from "react";
// import Swal from "sweetalert2";
// import "../../Assests/CSS/MultipleRegisterVendor.css";
// import Header2 from "../../Layouts/Headers/Header2";
// import axios from "axios";

// const MultipleRegisterVendor = () => {
//   const [rows, setRows] = useState([
//     {
//       vendorName: "",
//       vendorEmail: "",
//       phoneNumber: "",
//       vendorIndustryName: "",
//       validationErrors: {
//         vendorName: "",
//         vendorEmail: "",
//         phoneNumber: "",
//         vendorIndustryName: "",
//       },
//     },
//   ]);

//   const handleValidation = (index) => {
//     const updatedRows = [...rows];
//     const vendor = rows[index];

//     updatedRows[index].validationErrors = {
//       vendorName: /^[A-Za-z\s]+$/.test(vendor.vendorName)
//         ? ""
//         : "Vendor name must contain only letters.",
//       vendorEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
//         vendor.vendorEmail
//       )
//         ? ""
//         : "Invalid email format.",
//       phoneNumber: /^[0-9]{10}$/.test(vendor.phoneNumber)
//         ? ""
//         : "Phone number must be exactly 10 digits.",
//       vendorIndustryName: /^[A-Za-z\s]+$/.test(vendor.vendorIndustryName)
//         ? ""
//         : "Industry name must contain only letters.",
//     };

//     setRows(updatedRows);

//     // Return true if no errors, otherwise false
//     return (
//       !updatedRows[index].validationErrors.vendorName &&
//       !updatedRows[index].validationErrors.vendorEmail &&
//       !updatedRows[index].validationErrors.phoneNumber &&
//       !updatedRows[index].validationErrors.vendorIndustryName
//     );
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedRows = rows.map((row, i) =>
//       i === index ? { ...row, [field]: value } : row
//     );
//     setRows(updatedRows);
//   };

//   const handleAddRow = () => {
//     const lastRowIndex = rows.length - 1;
//     // Validate the last row before adding a new row
//     if (!handleValidation(lastRowIndex)) {
//       Swal.fire({
//         icon: "error",
//         title: "Incomplete Row",
//         text: "Please fill out the current row completely before adding a new one.",
//         confirmButtonText: "OK",
//       });
//       return;
//     }

//     setRows([
//       ...rows,
//       {
//         vendorName: "",
//         vendorEmail: "",
//         phoneNumber: "",
//         vendorIndustryName: "",
//         paymentMode: "",
//         otherPaymentMode: "",
//         validationErrors: {
//           vendorName: "",
//           vendorEmail: "",
//           phoneNumber: "",
//           vendorIndustryName: "",
//           paymentMode: "",
//           otherPaymentMode: "",
//         },
//       },
//     ]);
//   };

//   const handleDeleteRow = (index) => {
//     if (rows.length === 1) {
//       Swal.fire({
//         icon: "warning",
//         title: "Cannot Delete",
//         text: "There must be at least one row.",
//         confirmButtonText: "OK",
//       });
//       return;
//     }

//     const newRows = [...rows];
//     newRows.splice(index, 1);
//     setRows(newRows);
//   };

//   const isFormValid = () => {
//     return rows.every(
//       (row) =>
//         row.vendorName &&
//         /^[A-Za-z\s]+$/.test(row.vendorName) &&
//         row.vendorEmail &&
//         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
//           row.vendorEmail
//         ) &&
//         row.phoneNumber &&
//         /^[0-9]{10}$/.test(row.phoneNumber) &&
//         row.vendorIndustryName &&
//         /^[A-Za-z\s]+$/.test(row.vendorIndustryName)
//     );
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isFormValid()) {
//       Swal.fire({
//         icon: "error",
//         title: "Missing or Invalid Information",
//         text: "Please fill out all required fields with valid data.",
//         confirmButtonText: "OK",
//       });
//     } else {
//       try {
//         const response = await axios.post(
//           "http://localhost:8080/supplierRoutes/addvendors",
//           rows
//         );
//         Swal.fire({
//           icon: "success",
//           title: "Vendors Registered",
//           text: "All vendors were successfully registered.",
//           confirmButtonText: "OK",
//         });
//         console.log("Registered vendors:", response.data);
//       } catch (error) {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Could not register vendors. Please try again.",
//           confirmButtonText: "OK",
//         });
//       }
//     }
//   };

//   return (
//     <div>
//       <Header2 />
//       <h1 className="header-bar">Multiple Vendor Registration</h1>

//       <div className="table-container">
//         <form onSubmit={handleSubmit}>
//           <table>
//             <thead>
//               <tr>
//                 <th>Vendor Name</th>
//                 <th>Email</th>
//                 <th>Phone Number</th>
//                 <th>Vendor Industry Name</th>
//                 <th>PaymentMode</th>
//                 <th>Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rows.map((row, index) => (
//                 <tr key={index} className="entry-row">
//                   <td>
//                     <input
//                       type="text"
//                       placeholder="Vendor Name"
//                       value={row.vendorName}
//                       onBlur={() => handleValidation(index)}
//                       onChange={(e) =>
//                         handleInputChange(index, "vendorName", e.target.value)
//                       }
//                       pattern="^[A-Za-z\s]+$"
//                       required
//                     />
//                     <span className="error-text">
//                       {row.validationErrors.vendorName}
//                     </span>
//                   </td>
//                   <td>
//                     <input
//                       type="email"
//                       placeholder="Email"
//                       value={row.vendorEmail}
//                       onBlur={() => handleValidation(index)}
//                       onChange={(e) =>
//                         handleInputChange(index, "vendorEmail", e.target.value)
//                       }
//                       pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
//                       required
//                     />
//                     <span className="error-text">
//                       {row.validationErrors.vendorEmail}
//                     </span>
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       placeholder="Phone"
//                       value={row.phoneNumber}
//                       onBlur={() => handleValidation(index)}
//                       onChange={(e) =>
//                         handleInputChange(index, "phoneNumber", e.target.value)
//                       }
//                       pattern="^\d{10}$"
//                       maxLength="10"
//                       required
//                     />
//                     <span className="error-text">
//                       {row.validationErrors.phoneNumber}
//                     </span>
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       placeholder="Vendor Industry Name"
//                       value={row.vendorIndustryName}
//                       onBlur={() => handleValidation(index)}
//                       onChange={(e) =>
//                         handleInputChange(
//                           index,
//                           "vendorIndustryName",
//                           e.target.value
//                         )
//                       }
//                       pattern="^[A-Za-z\s]+$"
//                       required
//                     />
//                     <span className="error-text">
//                       {row.validationErrors.vendorIndustryName}
//                     </span>
//                   </td>
//                   <td>
//                     <select
//                       value={row.paymentMode}
//                       onChange={(e) =>
//                         handleInputChange(index, "paymentMode", e.target.value)
//                       }
//                       required
//                     >
//                       <option value="" disabled>
//                         Select Payment Mode
//                       </option>
//                       <option value="Cash">Cash</option>
//                       <option value="Bank Transfer">Bank Transfer</option>
//                       <option value="Cheque">Cheque</option>
//                       <option value="Others">Others</option>
//                     </select>
//                     {row.paymentMode === "Others" && (
//                       <input
//                         type="text"
//                         placeholder="Specify Payment Mode"
//                         value={row.otherPaymentMode}
//                         onChange={(e) =>
//                           handleInputChange(
//                             index,
//                             "otherPaymentMode",
//                             e.target.value
//                           )
//                         }
//                         required
//                       />
//                     )}
//                   </td>

//                   <td>
//                     <button
//                       className="delete-btn"
//                       onClick={() => handleDeleteRow(index)}
//                       type="button"
//                     >
//                       &#10006;
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button type="button" id="addRowButton" onClick={handleAddRow}>
//             Add Vendor
//           </button>

//           <button type="submit" id="submitButton">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default MultipleRegisterVendor;
