const getTag = (value) => {
  const isTag = value.match(/#[\s\S]*$/g);

  return isTag[0].substring(1);
};

export default getTag;
