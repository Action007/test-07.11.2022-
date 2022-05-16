const getPercent = (completedCount, totalCount) => {
  return ((100 * completedCount) / totalCount).toFixed();
};

export default getPercent;
