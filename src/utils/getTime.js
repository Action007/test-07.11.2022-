const getTime = (createdTime) => {
  const time = new Date(createdTime);
  const date = time.toISOString().slice(0, 10).split("-").reverse().join("-");
  let getHours = time.getHours();
  let getMinutes = time.getMinutes();
  const amPM = getHours >= 12 ? "PM" : "AM";
  getHours %= 12;
  getHours = getHours || 12; // the hour '0' should be '12'
  getMinutes = getMinutes < 10 ? `0${getMinutes}` : getMinutes;
  const hours = `${getHours}:${getMinutes}${amPM}`;

  return { date, hours };
};

export default getTime;
