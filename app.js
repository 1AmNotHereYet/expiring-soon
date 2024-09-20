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

  const now = new Date(year, monthNumber - 1, dayNumber);
  now.setHours(currentTime.hours);
  now.setMinutes(currentTime.minutes);
  now.setSeconds(currentTime.seconds);

  const lastDayOfMonth = new Date(year, monthNumber, 0);
  lastDayOfMonth.setHours(23, 59, 59);

  const timeDifference = lastDayOfMonth - now;
  
  const secondsLeft = Math.floor((timeDifference / 1000) % 60);
  const minutesLeft = Math.floor((timeDifference / (1000 * 60)) % 60);
  const hoursLeft = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
  return {
    days: daysLeft,
    hours: hoursLeft,
    minutes: minutesLeft,
    seconds: secondsLeft
  };
}

const EndOfMonth = timeUntilEndOfMonth(date, time);
console.log(EndOfMonth);
