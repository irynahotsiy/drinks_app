export function selectedFilters(category, filters) {
  if (filters.includes(category)) {
    const index = filters.indexOf(category);
    if (index > -1) {
      filters.splice(index, 1);
      return filters.slice();
    }
  } else {
    filters.push(category);
    return filters.slice();
  }
}

export function checkIfSelected(category, filters) {
  return filters.includes(category);
}
