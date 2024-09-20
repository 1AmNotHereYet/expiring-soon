function getCurrentTime() {
  const now = new Date();

  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds()
  };
}

const time = getCurrentTime();
console.log(time);

function getCurrentDate() {
  const now = new Date();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return {
    dayName: days[now.getDay()],
    dayNumber: now.getDate(),
    monthName: months[now.getMonth()],
    monthNumber: now.getMonth() + 1,
    year: now.getFullYear()
  };
}

const date = getCurrentDate();
console.log(date);

function timeUntilEndOfDay(currentTime) {
  
  const totalHoursInDay = 24;
  const totalMinutesInHour = 60;
  const totalSecondsInMinute = 60;

  const hoursPassed = currentTime.hours;
  const minutesPassed = currentTime.minutes;
  const secondsPassed = currentTime.seconds;

  // Calculate hours, minutes, and seconds left in the day
  const hoursLeft = totalHoursInDay - hoursPassed - 1;
  const minutesLeft = totalMinutesInHour - minutesPassed - 1;
  const secondsLeft = totalSecondsInMinute - secondsPassed;

  // Adjusting minutes and hours based on seconds and minutes overflow
  const adjustedMinutesLeft = secondsLeft === 60 ? minutesLeft + 1 : minutesLeft;
  const adjustedHoursLeft = adjustedMinutesLeft === 60 ? hoursLeft + 1 : hoursLeft;

  // Convert the remaining hours into minutes and seconds
  const totalMinutesLeft = (adjustedHoursLeft * totalMinutesInHour) + adjustedMinutesLeft;
  const totalSecondsLeft = (totalMinutesLeft * totalSecondsInMinute) + (secondsLeft === 60 ? 0 : secondsLeft);

  return {
    hours: adjustedHoursLeft < 0 ? 0 : adjustedHoursLeft,
    minutes: totalMinutesLeft < 0 ? 0 : totalMinutesLeft,
    seconds: totalSecondsLeft < 0 ? 0 : totalSecondsLeft
  };
}

const EndOfDay = timeUntilEndOfDay(time);
console.log(EndOfDay);

function timeUntilEndOfMonth(currentDate, currentTime) {

  const { year, monthNumber, dayNumber } = currentDate;

  // Set the current date and time
  const now = new Date(year, monthNumber - 1, dayNumber);
  now.setHours(currentTime.hours);
  now.setMinutes(currentTime.minutes);
  now.setSeconds(currentTime.seconds);

  // Get the last day of the month at 23:59:59
  const lastDayOfMonth = new Date(year, monthNumber, 0);
  lastDayOfMonth.setHours(23, 59, 59);

  // Calculate the time difference in milliseconds
  const timeDifference = lastDayOfMonth - now;
  
  // Convert the time difference into days, hours, minutes, and seconds
  const totalSecondsLeft = Math.floor(timeDifference / 1000);
  const totalMinutesLeft = Math.floor(totalSecondsLeft / 60);
  const totalHoursLeft = Math.floor(totalMinutesLeft / 60);
  const totalDaysLeft = Math.floor(totalHoursLeft / 24);

  const hoursLeft = totalHoursLeft % 24;
  const minutesLeft = totalMinutesLeft % 60;
  const secondsLeft = totalSecondsLeft % 60;

  return {
    days: totalDaysLeft,
    hours: totalHoursLeft,     // Total hours left (including days converted to hours)
    minutes: totalMinutesLeft, // Total minutes left (including hours converted to minutes)
    seconds: totalSecondsLeft  // Total seconds left (including minutes converted to seconds)
  };
}

const EndOfMonth = timeUntilEndOfMonth(date, time);
console.log(EndOfMonth);

function timeUntilEndOfYear(currentDate, currentTime) {
  const { year, monthNumber, dayNumber } = currentDate;

  // Set the current date and time
  const now = new Date(year, monthNumber - 1, dayNumber);
  now.setHours(currentTime.hours);
  now.setMinutes(currentTime.minutes);
  now.setSeconds(currentTime.seconds);

  // Get the last day of the year at 23:59:59
  const lastDayOfYear = new Date(year, 11, 31, 23, 59, 59);

  // Helper function to calculate the exact number of days in a given month
  function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  // Step 1: Calculate the total months remaining
  let remainingMonths = 11 - (monthNumber - 1);

  // Step 2: Calculate the remaining days in the current month and future months
  const daysInCurrentMonth = daysInMonth(year, monthNumber - 1);
  const daysLeftInCurrentMonth = daysInCurrentMonth - dayNumber;

  // Initialize totalDaysLeft with the days remaining in the current month
  let totalDaysLeft = daysLeftInCurrentMonth;

  // Add the remaining days of the upcoming months until December
  for (let i = monthNumber; i < 11; i++) {
    totalDaysLeft += daysInMonth(year, i);
  }

  // Also add the days in December
  totalDaysLeft += daysInMonth(year, 11);

  // Step 3: Convert days to total hours, minutes, and seconds
  const totalHoursLeft = totalDaysLeft * 24;  // Convert days to hours
  const totalMinutesLeft = totalHoursLeft * 60; // Convert hours to minutes
  const totalSecondsLeft = totalMinutesLeft * 60; // Convert minutes to seconds

  // Now calculate the remaining hours, minutes, and seconds left in the current day
  const currentTimeSeconds = currentTime.hours * 3600 + currentTime.minutes * 60 + currentTime.seconds;
  const endOfDaySeconds = 24 * 3600;
  const secondsLeftToday = endOfDaySeconds - currentTimeSeconds;

  return {
    months: remainingMonths,          // Total months left until the end of the year
    days: totalDaysLeft,              // Total days left until the end of the year
    hours: totalHoursLeft + Math.floor(secondsLeftToday / 3600),     // Total hours left
    minutes: totalMinutesLeft + Math.floor((secondsLeftToday % 3600) / 60), // Total minutes left
    seconds: totalSecondsLeft + secondsLeftToday % 60  // Total seconds left
  };
}

const EndOfYear = timeUntilEndOfYear(date, time);
console.log(EndOfYear);
