const getPercent = (completedCount, totalCount) => {
  const percent = Number(((100 * completedCount) / totalCount).toFixed());

  // eslint-disable-next-line no-self-compare
  if (percent !== percent) {
    return 0;
  }
  return percent;
};

export default getPercent;
