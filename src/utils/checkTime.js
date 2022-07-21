const checkTime = (date) => {
  const then = new Date(date);
  const now = new Date();

  const msBetweenDates = Math.abs(then.getTime() - now.getTime());
  const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

  return hoursBetweenDates < 2;
};

export default checkTime;
