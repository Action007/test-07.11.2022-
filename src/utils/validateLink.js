const validateLink = (value) => {
  const urlTest =
    // eslint-disable-next-line no-useless-escape
    /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
  const isValidUrl = urlTest.test(value);

  return isValidUrl;
};

export default validateLink;
