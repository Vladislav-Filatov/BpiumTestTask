const maskIsValid = mask => {
  if (typeof mask !== "string" || mask.length === 0) return false;

  return ["*", "A", "a", "1", "#"].some(char =>
    mask.includes(char)
  );
};

export default maskIsValid;
  