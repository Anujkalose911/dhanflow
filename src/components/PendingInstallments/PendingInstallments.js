import React, { useState, useEffect } from "react";
import Joyride, { STATUS } from 'react-joyride';
import axios from '../../utils/axios';  // Use configured axios
import "../../Assests/CSS/PendingInstallments.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Header2 from "../../Layouts/Headers/Header2";

const PendingInstallments = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageSize, setPageSize] = useState(10);
    const [sortBy, setSortBy] = useState('installment_id');
    const [sortDirection, setSortDirection] = useState('asc');

    // Add tutorial state
    const [runTutorial, setRunTutorial] = useState(() => {
        const hasSeenTutorial = localStorage.getItem('hasSeenPendingInstallmentsTutorial');
        return !hasSeenTutorial;
    });

    const steps = [
        {
            target: '.content-container',
            content: 'Welcome to Pending Installments! Here you can view and manage all pending installment details.',
            placement: 'center',
            disableBeacon: true,
        },
        {
            target: '.search-container',
            content: 'Search for specific vendors by typing their name here.',
            placement: 'bottom',
        },
        {
            target: '.table-controls',
            content: 'Use these controls to sort your data and adjust how many entries you see per page.',
            placement: 'bottom',
        },
        {
            target: '.table-container',
            content: 'View all pending installments in this table. Click column headers to sort the data.',
            placement: 'top-start',  // Changed to top-start
            floaterProps: {
                disableAnimation: true,
                disableFlip: true,    // Prevent tooltip from flipping to bottom
                offset: 15
            },
            styles: {
                options: {
                    zIndex: 10000
                }
            }
        },
        {
            target: '.pagination',
            content: 'Navigate through multiple pages of installments using these controls.',
            placement: 'top',
        }
    ];
    const handleJoyrideCallback = (data) => {
        const { status } = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setRunTutorial(false);
            localStorage.setItem('hasSeenPendingInstallmentsTutorial', 'true');
        }
    };

    const TutorialButton = () => (
        <button 
            className="tutorial-button"
            onClick={() => setRunTutorial(true)}
        >
            Show Tutorial
        </button>
    );

    useEffect(() => {
        const fetchInstallments = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/get-pending-installments');
                
                if (response.data.success) {
                    setOriginalData(response.data.data);
                    setFilteredData(response.data.data);
                } else {
                    setError('Failed to fetch installments');
                }
            } catch (error) {
                console.error("Error fetching installments:", error);
                setError('Error loading installments');
            } finally {
                setLoading(false);
            }
        };

        fetchInstallments();
    }, []);

    const handleInputChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchTerm(query);

        if (query) {
            const filteredSuggestions = originalData.filter(
                (item) => item.vendor_name && 
                         item.vendor_name.toLowerCase().includes(query)
            );
            setSuggestions(filteredSuggestions);
            setFilteredData(filteredSuggestions);
            setCurrentPage(1);
        } else {
            setSuggestions([]);
            setFilteredData(originalData);
            setCurrentPage(1);
        }
    };

    const handleSuggestionClick = (vendorName) => {
        setSearchTerm(vendorName);
        setSuggestions([]);
        const filtered = originalData.filter(
            (item) =>
                item.vendor_name &&
                item.vendor_name.toLowerCase() === vendorName.toLowerCase()
        );
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to first page when selecting a suggestion
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDirection('asc');
        }
        
        const sortedData = [...filteredData].sort((a, b) => {
            let comparison = 0;
            if (a[field] > b[field]) comparison = 1;
            if (a[field] < b[field]) comparison = -1;
            return sortDirection === 'asc' ? comparison : -comparison;
        });
        
        setFilteredData(sortedData);
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(1);
    };

    // Calculate pagination
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / pageSize);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <section>
            <Header2 />
            <TutorialButton />
            
            <Joyride
                steps={steps}
                run={runTutorial}
                continuous={true}
                showProgress={true}
                showSkipButton={true}
                callback={handleJoyrideCallback}
                styles={{
                    options: {
                        primaryColor: 'var(--medium-blue)',
                        backgroundColor: '#ffffff',
                        textColor: '#333',
                        zIndex: 1000,
                    },
                    buttonNext: {
                        backgroundColor: 'var(--medium-blue)',
                    },
                    buttonBack: {
                        marginRight: 10,
                    },
                    buttonSkip: {
                        color: '#333',
                    }
                }}
                locale={{
                    last: "End Tutorial",
                    skip: "Skip Tutorial",
                    next: "Next",
                    back: "Back",
                }}
            />

            <div className="content-container">
                <h1>Pending Installments</h1>
                
                <div className="controls-container">
                    {/* Existing Search Box */}
                    <div className="search-container">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            placeholder="Search by Vendor Name"
                            autoComplete="off"
                        />
                        {suggestions.length > 0 && (
                            <div className="suggestions">
                                {suggestions.map((item, index) => (
                                    <div
                                        key={index}
                                        className="suggestion-item"
                                        onClick={() => handleSuggestionClick(item.vendor_name)}
                                    >
                                        {item.vendor_name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* New Sort and Page Size Controls */}
                    <div className="table-controls">
                        <select 
                            className="sort-select"
                            value={sortBy}
                            onChange={(e) => handleSort(e.target.value)}
                        >
                            <option value="">Sort by</option>
                            <option value="installment_id">Installment ID</option>
                            <option value="vendor_name">Vendor Name</option>
                            <option value="invoice_number">Invoice Number</option>
                            <option value="selected_date">Selected Date</option>
                            <option value="due_date">Due Date</option>
                            <option value="amount">Amount</option>
                        </select>

                        <select 
                            className="page-size-select"
                            value={pageSize}
                            onChange={handlePageSizeChange}
                        >
                            <option value="10">10 per page</option>
                            <option value="20">20 per page</option>
                            <option value="30">30 per page</option>
                        </select>
                    </div>
                </div>

                {/* Loading and Error States */}
                {loading && <div className="loading">Loading installments...</div>}
                {error && <div className="error">{error}</div>}

                {/* Table */}
                {!loading && !error && (
                    <div className="table-container">
                        <table id="installmentTable">
                            <thead>
                                <tr>
                                    <th>Installment ID</th>
                                    <th>Vendor Name</th>
                                    <th>Invoice Number</th>
                                    <th>Selected Date</th>
                                    <th>Due Date</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length > 0 ? (
                                    currentItems.map((item) => (
                                        <tr key={item.installment_id}>
                                            <td data-label="Installment ID">{item.installment_id}</td>
                                            <td data-label="Vendor Name">{item.vendor_name}</td>
                                            <td data-label="Invoice Number">{item.invoice_number}</td>
                                            <td data-label="Selected Date">{item.selected_date}</td>
                                            <td data-label="Due Date">{item.due_date}</td>
                                            <td data-label="Amount">₹{item.amount.toLocaleString('en-IN', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center' }}>No pending installments found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {!loading && !error && totalPages > 1 && (
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? "active" : ""}
                                aria-label={`Page ${index + 1}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default PendingInstallments;
