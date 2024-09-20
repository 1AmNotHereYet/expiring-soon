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

  const hoursLeft = totalHoursInDay - hoursPassed - 1;
  const minutesLeft = totalMinutesInHour - minutesPassed - 1;
  const secondsLeft = totalSecondsInMinute - secondsPassed;

  const adjustedMinutesLeft = secondsLeft === 60 ? minutesLeft + 1 : minutesLeft;
  const adjustedHoursLeft = adjustedMinutesLeft === 60 ? hoursLeft + 1 : hoursLeft;

  return {
    hours: adjustedHoursLeft < 0 ? 0 : adjustedHoursLeft,
    minutes: adjustedMinutesLeft < 0 ? 0 : adjustedMinutesLeft,
    seconds: secondsLeft === 60 ? 0 : secondsLeft
  };
}

const EndOfDay = timeUntilEndOfDay(time);
console.log(EndOfDay);
