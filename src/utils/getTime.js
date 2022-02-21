const getTime = (createdTime) => {
  const time = new Date(createdTime);
  const date = time.toISOString().slice(0, 10).split("-").reverse().join(".");
  return { date };
};

export default getTime;
