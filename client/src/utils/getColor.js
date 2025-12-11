//Get color from css variables to js
export function getColor(color, opacity = '') {
  const value =
    getComputedStyle(document.documentElement).getPropertyValue(color).trim() +
    opacity;
  return value ? value : '#000';
}
