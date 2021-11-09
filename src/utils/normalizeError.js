const normalizeError = (rawError) => {
  return {
    ...rawError,
    normalized: true,
  };
};

export default normalizeError;
