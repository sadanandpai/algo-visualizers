export function convertInputToArrayString(input: string) {
  input = input.replace(/\s/g, "");
  input = input.replace(/\d{4}/g, "");
  input = input.replace(/\s\s/g, " ");
  input = input.replace(/\s,/g, ",");
  input = input.replace(/,,/g, ",");
  input = input.replace(/[^0-9,\s]/g, "");
  return input.split(",").join(", ").trim();
}

export function convertArrayStringToArray(input: string) {
  return input
    .split(",")
    .filter((v) => v !== "")
    .map((v) => +v);
}

export function getRndmNumInRange(lowerLimit = 0, upperLimit = 999) {
  return lowerLimit + Math.floor(Math.random() * upperLimit);
}
