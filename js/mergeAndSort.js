export function mergeAndSort(movies, series) {
  const combined = [...movies, ...series];

  combined.sort((a, b) => {
    const dateA = new Date(a.release_date || a.first_air_date);
    const dateB = new Date(b.release_date || b.first_air_date);
    return dateB - dateA;
  });

  return combined;
}