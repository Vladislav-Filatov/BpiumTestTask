export default function filterSelectOption(input, option) {
  const label = option?.label;

  const searchText =
    typeof label === "string" || typeof label === "number"
      ? String(label)
      : String(option?.value ?? "");

  return searchText
    .toLowerCase()
    .includes(input.toLowerCase());
}
