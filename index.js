const axios = require("axios");
const userData = require("./config.js");

const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
const formatDayOrMonth = (month) => (String(month).length == 1 ? "0" + String(month) : String(month));
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

(async () => {
    // Prepare initial vars by current time
    const date = new Date();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear();
    let firstDayOfCurrentMonth = "1";
    let lastDayOfCurrentMonth = daysInMonth(currentYear, currentMonth);

    // Create array of dates for current month
    let daysOfCurrentMonthAsDates = [];
    for (let i = firstDayOfCurrentMonth; i <= lastDayOfCurrentMonth; i++) {
        daysOfCurrentMonthAsDates.push(new Date(String(currentYear) + "-" + formatDayOrMonth(currentMonth) + "-" + formatDayOrMonth(i)));
    }

    // Filter out weekends
    let workDaysOfCurrentMonth = [];
    daysOfCurrentMonthAsDates.forEach((day) => {
        if (dayNames[day.getDay()] != "saturday" && dayNames[day.getDay()] != "sunday") {
            workDaysOfCurrentMonth.push(day);
        }
    });

    // Fill timesheet workdays
    // workDaysOfCurrentMonth.forEach(async (day) => {
    for (const day of workDaysOfCurrentMonth) {
        let tmpDay = new Date(day).toUTCString();
        let dateToSet = String(formatDayOrMonth(new Date(day).getDate()) + "." + formatDayOrMonth(new Date(day).getMonth() + 1) + "." + new Date(day).getFullYear());

        // Send "Kommt"
        fetch(
            `https://836.timo24.de/timo/services/rest/wtoverview/saveattendancetime?${userData.id}&mitarbeiter${userData.userId}&art=1&datum=${dateToSet}&zeit=08%3A00&description&noTimezones=true`,
            {
                method: "PUT",
                headers: {
                    Cookie: `JSESSIONID=${userData.jsessionid};`,
                },
            },
        ).then((res) => {
            console.log(res.status + " - Pause Start at " + dateToSet);
        });
        await sleep(1000);

        // Send "Pause Start"
        fetch(
            `https://836.timo24.de/timo/services/rest/wtoverview/saveattendancetime?${userData.id}&mitarbeiter${userData.userId}&art=3&datum=${dateToSet}&zeit=11%3A30&description&noTimezones=true`,
            {
                method: "PUT",
                headers: {
                    Cookie: `JSESSIONID=${userData.jsessionid};`,
                },
            },
        ).then((res) => {
            console.log(res.status + " - Pause Ende at " + dateToSet);
        });
        await sleep(1000);

        // Send "Pause Ende"
        fetch(
            `https://836.timo24.de/timo/services/rest/wtoverview/saveattendancetime?${userData.id}&mitarbeiter${userData.userId}&art=4&datum=${dateToSet}&zeit=12%3A00&description&noTimezones=true`,
            {
                method: "PUT",
                headers: {
                    Cookie: `JSESSIONID=${userData.jsessionid};`,
                },
            },
        ).then((res) => {
            console.log(res.status + " - Pause Ende at " + dateToSet);
        });
        await sleep(1000);

        // Send "Geht"
        fetch(
            `https://836.timo24.de/timo/services/rest/wtoverview/saveattendancetime?${userData.id}&mitarbeiter${userData.userId}&art=2&datum=${dateToSet}&zeit=16%3A30&description&noTimezones=true`,
            {
                method: "PUT",
                headers: {
                    Cookie: `JSESSIONID=${userData.jsessionid};`,
                },
            },
        ).then((res) => {
            console.log(res.status + " - Geht at " + dateToSet);
        });
        await sleep(1000);

        // Send "Projekt Stunden"
        fetch("https://836.timo24.de/timo/services/rest/wtoverview/saveworkingtimeform?tabular=true&central=false", {
            method: "POST",
            headers: {
                Cookie: `JSESSIONID=${userData.jsessionid};`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: userData.id,
                userId: userData.userId,
                date: dateToSet.split(".").reverse().join("-"),
                dateTo: null,
                from: "00:00",
                to: "08:00",
                hours: "08:00", // this param is stoopid, don't parameterize but calculate by geht - kommt
                hoursDropdown: null,
                projectId: userData.projectId,
                taskId: userData.taskId,
                customerId: userData.customerId,
                orderNo: "",
                units: null,
                teamId: userData.teamId,
                ticketId: null,
                activityTypeEntry: "",
                activityType: userData.activityType,
                activityTypeMatrix: "null",
                skilllevel: "null",
                description: "",
                leistungsort: "",
                journey: "null",
                fahrtzeit: null,
                fahrtkm: "",
                vehicle: false,
                abschaetzung: null,
                abrechenbar: true,
                premiumable: false,
                applicationId: null,
            }),
        }).then((res) => {
            console.log(res.status + " - Projekt Stunden at " + dateToSet);
        });
        await sleep(1000);
    }
})();
