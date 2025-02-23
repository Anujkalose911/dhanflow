import React, { useState, useEffect } from "react";
import Joyride, { STATUS } from 'react-joyride';
import Header2 from "../../Layouts/Headers/Header2";
import "../../Assests/CSS/Calendar.css";
import axios from '../../utils/axios';

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState("");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 101 },
    (_, i) => today.getFullYear() - 50 + i
  );

  // Update tutorial state to check localStorage
  const [runTutorial, setRunTutorial] = useState(() => {
    // Check if user has seen tutorial before
    const hasSeenTutorial = localStorage.getItem('hasSeenCalendarTutorial');
    return !hasSeenTutorial; // Run tutorial only if user hasn't seen it
  });

  const steps = [
    {
      target: '.calendar-container',
      content: 'Welcome to the Installments Calendar! This tool helps you manage and track your installments efficiently.',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.box.container-calendar',
      content: 'This is your calendar view. You can select dates to view associated installments.',
      placement: 'bottom',
    },
    {
      target: '.current-date',
      content: 'Today\'s date is highlighted in blue.',
      placement: 'bottom',
    },
    {
      target: '.footer-container-calendar',
      content: 'Use these controls to navigate between different months and years.',
      placement: 'top',
    },
    {
      target: '#monthSelect',
      content: 'Select a specific month from this dropdown.',
      placement: 'bottom',
    },
    {
      target: '#yearSelect',
      content: 'Choose any year to view historical or future installments.',
      placement: 'bottom',
    },
    {
      target: '.container-installments',
      content: 'When you select a date, all installments for that date will appear here.',
      placement: 'top',
    },
    {
      target: '.installments-table',
      content: 'This table shows detailed information about each installment including invoice numbers, amounts, and vendor details.',
      placement: 'top',
    }
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTutorial(false);
      // Mark tutorial as seen in localStorage
      localStorage.setItem('hasSeenCalendarTutorial', 'true');
    }
  };

  // Add this near your other JSX, perhaps next to the header
  const TutorialButton = () => (
    <button 
      className="tutorial-button"
      onClick={() => {
        setRunTutorial(true);
        // Don't update localStorage when manually starting tutorial
      }}
    >
      Show Tutorial
    </button>
  );

  useEffect(() => {
    renderCalendar(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

  const renderCalendar = (month, year) => {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calendarBody = document.getElementById("calendar-body");
    if (calendarBody) {
      calendarBody.innerHTML = "";
    }
    let date = 1;

    // Get current date for initial highlighting
    const currentDate = new Date();
    const isCurrentMonth = currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear();

    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");
        if (i === 0 && j < firstDay) {
          cell.innerText = "";
        } else if (date > daysInMonth) {
          break;
        } else {
          cell.innerHTML = `<span class="calendar-date">${date}</span>`;
          cell.classList.add("date-cell");

          const cellDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

          // Add current-date class only if it's today and no date is selected
          if (isCurrentMonth && date === currentDate.getDate() && !selectedDate) {
            cell.classList.add("current-date");
          }

          // Add selected-date class if this date is selected
          if (cellDate === selectedDate) {
            cell.classList.add("selected-date");
          }

          cell.setAttribute("data-date", cellDate);
          cell.addEventListener("click", () => {
            // Remove both current-date and selected-date classes from all cells
            document.querySelectorAll(".current-date, .selected-date").forEach(el => {
              el.classList.remove("current-date", "selected-date");
            });
            // Add selected-date class to clicked cell
            cell.classList.add("selected-date");
            handleDateSelection(cellDate);
          });
          date++;
        }
        row.appendChild(cell);
      }
      calendarBody?.appendChild(row);
    }
  };

  const handleDateSelection = async (date) => {
    setSelectedDate(date);
    document.getElementById("installment-date").value = date;

    

    try {
        const response = await axios.get(`/get-installments`, {
            params: { selectedDate: date }
        });

        const tbody = document.getElementById("installments-body");
        tbody.innerHTML = ""; // Clear previous data

        if (response.data.success && response.data.data.length > 0) {
            response.data.data.forEach((installment) => {
                const formattedDate = new Date(installment.date)
                    .toISOString()
                    .split("T")[0];
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${installment.invoice_number}</td>
                    <td>${formattedDate}</td>
                    <td>${installment.amount}</td>
                    <td>${installment.status}</td>
                    <td>${installment.vendor_name}</td>
                    <td>${installment.invoice_total_amount}</td>
                `;
                tbody.appendChild(row);
            });
        } else {
            tbody.innerHTML =
                '<tr><td colspan="6" class="no-data" style="text-align:center">No Installment Data Available</td></tr>';
        }
    } catch (error) {
        console.error("Error fetching installment data:", error);
        const tbody = document.getElementById("installments-body");
        tbody.innerHTML =
            '<tr><td colspan="6" class="no-data" style="text-align:center">Error loading installment data</td></tr>';
    }
  };

  const previous = () => {
    setCurrentYear(currentMonth === 0 ? currentYear - 1 : currentYear);
    setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
  };

  const next = () => {
    setCurrentYear(currentMonth === 11 ? currentYear + 1 : currentYear);
    setCurrentMonth((currentMonth + 1) % 12);
  };

  const updateCalendar = (event) => {
    const { name, value } = event.target;
    if (name === "month") setCurrentMonth(parseInt(value));
    if (name === "year") setCurrentYear(parseInt(value));
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
            backgroundColor: 'var(--text-white)',
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

      <div className="calendar-container">
        <h2>INSTALLMENTS</h2>

        <div className="calendar-content">
          <div className="box container-calendar">
            <div id="right">
              <h3 id="monthAndYear">
                {months[currentMonth]} {currentYear}
              </h3>

              <table className="table-calendar" id="calendar" data-lang="en">
                <thead id="thead-month"></thead>
                <tbody id="calendar-body"></tbody>
              </table>

              <div className="footer-container-calendar">
                <label htmlFor="monthSelect">Month:</label>
                <select
                  id="monthSelect"
                  name="month"
                  value={currentMonth}
                  onChange={updateCalendar}
                >
                  {months.map((month, index) => (
                    <option key={index} value={index}>
                      {month}
                    </option>
                  ))}
                </select>

                <label htmlFor="yearSelect">Year:</label>
                <select
                  id="yearSelect"
                  name="year"
                  value={currentYear}
                  onChange={updateCalendar}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="container-installments">
          <label
            htmlFor="installment-date"
            style={{ color: "var(--text-black)", fontWeight: "bolder" }}
          >
            SELECTED DATE:
          </label>
          <input
            type="date"
            id="installment-date"
            readOnly
            style={{ marginLeft: "10px" }}
          />
          <table className="installments-table">
            <thead>
              <tr>
                <th>Invoice Number</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Vendor Name</th>
                <th>Invoice Total Amount</th>
              </tr>
            </thead>
            <tbody id="installments-body">
              <tr>
                <td
                  colSpan="6"
                  className="no-data"
                  style={{ textAlign: "center" }}
                >
                  No Installment Data Available
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Calendar;
