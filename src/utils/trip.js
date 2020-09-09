export const sortPrice = (a, b) => {
  if (a.price > b.price) {
    return 1;
  }
  if (a.price < b.price) {
    return -1;
  }
  return 0;
};

export const sortTime = (a, b) => {
  if (a.start > b.start) {
    return 1;
  }
  if (a.start < b.start) {
    return -1;
  }
  return 0;
};

export const sortEvent = (a, b) => {
  if (a.city > b.city) {
    return 1;
  }
  if (a.city < b.city) {
    return -1;
  }
  return 0;
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
};
