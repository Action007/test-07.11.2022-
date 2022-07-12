const validateLink = (value, type) => {
  let urlTest;

  switch (type) {
    case "facebook":
      urlTest = /http(?:s)?:\/\/(?:www\.)?facebook\.com\/([a-zA-Z0-9_]+)/;
      break;

    case "instagram":
      urlTest = /http(?:s)?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9_]+)/;
      break;

    case "twitter":
      urlTest = /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/;
      break;

    default:
      urlTest =
        // eslint-disable-next-line no-useless-escape
        /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
      break;
  }

  const isValidUrl = urlTest.test(value);

  return isValidUrl;
};

export default validateLink;
