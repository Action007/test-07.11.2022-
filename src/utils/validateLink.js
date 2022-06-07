const validateLink = (value) => {
  const urlTest =
    /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
  const isValidUrl = urlTest.test(value);

  return isValidUrl;
};

export default validateLink;
