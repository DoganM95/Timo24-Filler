const axios = require("axios");

const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
const formatDayOrMonth = (month) => (String(month).length == 1 ? "0" + String(month) : String(month));
const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

(async () => {
    const date = new Date();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear();
    let firstDayOfCurrentMonth = "1";
    let lastDayOfCurrentMonth = daysInMonth(currentYear, currentMonth);

    let daysOfCurrentMonthAsDates = [];
    for (let i = firstDayOfCurrentMonth; i <= lastDayOfCurrentMonth; i++) {
        daysOfCurrentMonthAsDates.push(new Date(String(currentYear) + "-" + formatDayOrMonth(currentMonth) + "-" + formatDayOrMonth(i)));
    }
})();
