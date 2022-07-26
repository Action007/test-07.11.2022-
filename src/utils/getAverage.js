const getAverage = (array) => {
  const summary = array.reduce((a, b) => a + b, 0);
  const average = summary / array.length || 0;

  return average;
};

export default getAverage;
