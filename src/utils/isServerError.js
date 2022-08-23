const isServerError = (status) => {
  switch (status) {
    case 500:
      return true;

    case 502:
      return true;

    case 503:
      return true;

    case 504:
      return true;

    case 508:
      return true;

    default:
      return false;
  }
};

export default isServerError;
