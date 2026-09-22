import {formatCharsInput} from "./maskFormat.js";

export const getPlaceHolderMask = mask => {
  const charsEditableMask =  Object.keys(formatCharsInput).join("");
  let placeholder = "";
  let shielding = false;

  for (let i = 0; i < mask.length; i++) {
    if (shielding) {
      shielding = false;
      placeholder += mask[i];
      continue;
    }
    if (mask[i] == "\\") {
      shielding = true;
      continue;
    }
    if (charsEditableMask.includes(mask[i])) {
      placeholder += "_";
      continue;
    }
    placeholder += mask[i];
  }
  return placeholder;
};