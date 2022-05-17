export const removeSearchParamsValue = (params, key, valueToRemove) => {
  const values = params.getAll(key);
  if (values.length) {
    params.delete(key);
    values.forEach((value) => {
      if (+value !== +valueToRemove) {
        params.append(key, value);
      }
    });
  }
  return params;
};

export const changeSearchParamsValue = (
  params,
  key,
  valueToRemove,
  isResetPage = true
) => {
  if (isResetPage) {
    params.delete("page");
    params.append("page", 1);
  }
  params.delete(key);
  params.append(key, valueToRemove);
  return params;
};
