export const formatFecha = (date: Date): string => {
  const y = date.getFullYear();
  let m: string | number = date.getMonth() + 1;
  let d: string | number = date.getDate();

  if (m < 10) {
    m = `0${m}`;
  }

  if (d < 10) {
    d = `0${d}`;
  }

  return `${y}-${m}-${d}`;
};
