function getCurrentTime() {
  const now = new Date();

  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds()
  };
}

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

function timeUntilEndOfDay(currentTime) {
  
  const totalHoursInDay = 24;
  const totalMinutesInHour = 60;
  const totalSecondsInMinute = 60;

  const hoursPassed = currentTime.hours;
  const minutesPassed = currentTime.minutes;
  const secondsPassed = currentTime.seconds;

  const hoursLeft = totalHoursInDay - hoursPassed - 1;
  const minutesLeft = totalMinutesInHour - minutesPassed - 1;
  const secondsLeft = totalSecondsInMinute - secondsPassed;

  const adjustedMinutesLeft = secondsLeft === 60 ? minutesLeft + 1 : minutesLeft;
  const adjustedHoursLeft = adjustedMinutesLeft === 60 ? hoursLeft + 1 : hoursLeft;

  const totalMinutesLeft = (adjustedHoursLeft * totalMinutesInHour) + adjustedMinutesLeft;
  const totalSecondsLeft = (totalMinutesLeft * totalSecondsInMinute) + (secondsLeft === 60 ? 0 : secondsLeft);

  return {
    hours: adjustedHoursLeft < 0 ? 0 : adjustedHoursLeft,
    minutes: totalMinutesLeft < 0 ? 0 : totalMinutesLeft,
    seconds: totalSecondsLeft < 0 ? 0 : totalSecondsLeft
  };
}

function timeUntilEndOfMonth(currentDate, currentTime) {

  const { year, monthNumber, dayNumber } = currentDate;

  const now = new Date(year, monthNumber - 1, dayNumber);
  now.setHours(currentTime.hours);
  now.setMinutes(currentTime.minutes);
  now.setSeconds(currentTime.seconds);

  const lastDayOfMonth = new Date(year, monthNumber, 0);
  lastDayOfMonth.setHours(23, 59, 59);

  const timeDifference = lastDayOfMonth - now;
  
  const totalSecondsLeft = Math.floor(timeDifference / 1000);
  const totalMinutesLeft = Math.floor(totalSecondsLeft / 60);
  const totalHoursLeft = Math.floor(totalMinutesLeft / 60);
  const totalDaysLeft = Math.floor(totalHoursLeft / 24);

  const hoursLeft = totalHoursLeft % 24;
  const minutesLeft = totalMinutesLeft % 60;
  const secondsLeft = totalSecondsLeft % 60;

  return {
    days: totalDaysLeft,
    hours: totalHoursLeft,
    minutes: totalMinutesLeft,
    seconds: totalSecondsLeft
  };
}

function timeUntilEndOfYear(currentDate, currentTime) {
  const { year, monthNumber, dayNumber } = currentDate;

  const now = new Date(year, monthNumber - 1, dayNumber);
  now.setHours(currentTime.hours);
  now.setMinutes(currentTime.minutes);
  now.setSeconds(currentTime.seconds);

  const lastDayOfYear = new Date(year, 11, 31, 23, 59, 59);

  function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  let remainingMonths = 11 - (monthNumber - 1);

  const daysInCurrentMonth = daysInMonth(year, monthNumber - 1);
  const daysLeftInCurrentMonth = daysInCurrentMonth - dayNumber;

  let totalDaysLeft = daysLeftInCurrentMonth;

  for (let i = monthNumber; i < 11; i++) {
    totalDaysLeft += daysInMonth(year, i);
  }

  totalDaysLeft += daysInMonth(year, 11);

  const totalHoursLeft = totalDaysLeft * 24;
  const totalMinutesLeft = totalHoursLeft * 60;
  const totalSecondsLeft = totalMinutesLeft * 60;

  const currentTimeSeconds = currentTime.hours * 3600 + currentTime.minutes * 60 + currentTime.seconds;
  const endOfDaySeconds = 24 * 3600;
  const secondsLeftToday = endOfDaySeconds - currentTimeSeconds;

  return {
    months: remainingMonths,
    days: totalDaysLeft,
    hours: totalHoursLeft + Math.floor(secondsLeftToday / 3600),
    minutes: totalMinutesLeft + Math.floor((secondsLeftToday % 3600) / 60),
    seconds: totalSecondsLeft + secondsLeftToday % 60
  };
}

function openTab(event, tabName) {

  var i, tabContent, tabButtons;

  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
      tabContent[i].classList.remove("active");
  }

  tabButtons = document.getElementsByClassName("tab-button");
  for (i = 0; i < tabButtons.length; i++) {
      tabButtons[i].classList.remove("active");
  }

  document.getElementById(tabName).classList.add("active");

  event.currentTarget.classList.add("active");
}

function ButtonLabels() {

  function UpdateLabels() {
    const date = getCurrentDate();

    const dayButton = document.querySelector('#day-button');
    dayButton.textContent = `${date.dayName} ${date.dayNumber}`;

    const monthButton = document.querySelector('#month-button');
    monthButton.textContent = `${date.monthName}`;

    const yearButton = document.querySelector('#year-button');
    yearButton.textContent = `${date.year}`;

    setTimeout(UpdateLabels, 1000);
  }

  UpdateLabels();
}

function displayEndOfDay() {

  const endOfDay = document.querySelector('#day-tab');

  function updateEndOfDay() {
    const currentTime = getCurrentTime();
    const remainingTime = timeUntilEndOfDay(currentTime);

    endOfDay.children[0].textContent = `Hours: ${remainingTime.hours}`;
    endOfDay.children[1].textContent = `Minutes: ${remainingTime.minutes}`;
    endOfDay.children[2].textContent = `Seconds: ${remainingTime.seconds}`;

    setTimeout(updateEndOfDay, 1000);
  }

  updateEndOfDay();
}

function displayEndOfMonth() {

  const endOfMonth = document.querySelector('#month-tab');

  function updateEndOfMonth() {
    const currentTime = getCurrentTime();
    const currentDate = getCurrentDate();
    const remainingTime = timeUntilEndOfMonth(currentDate, currentTime);

    endOfMonth.children[0].textContent = `Days: ${remainingTime.days}`;
    endOfMonth.children[1].textContent = `Hours: ${remainingTime.hours}`;
    endOfMonth.children[2].textContent = `Minutes: ${remainingTime.minutes}`;
    endOfMonth.children[3].textContent = `Seconds: ${remainingTime.seconds}`;

    setTimeout(updateEndOfMonth, 1000);
  }

  updateEndOfMonth();
}

function displayEndOfYear() {

  const endOfYear = document.querySelector('#year-tab');

  function updateEndOfYear() {
    const currentTime = getCurrentTime();
    const currentDate = getCurrentDate();
    const remainingTime = timeUntilEndOfYear(currentDate, currentTime);

    endOfYear.children[0].textContent = `Months: ${remainingTime.months} +`;
    endOfYear.children[1].textContent = `Days: ${remainingTime.days}`;
    endOfYear.children[2].textContent = `Hours: ${remainingTime.hours}`;
    endOfYear.children[3].textContent = `Minutes: ${remainingTime.minutes}`;
    endOfYear.children[4].textContent = `Seconds: ${remainingTime.seconds}`;

    setTimeout(updateEndOfYear, 1000);
  }

  updateEndOfYear();
}

ButtonLabels();

displayEndOfDay();

displayEndOfMonth();

displayEndOfYear();
