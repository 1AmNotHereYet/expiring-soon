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
