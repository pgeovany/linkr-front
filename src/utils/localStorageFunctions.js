const getLocal = (key) => JSON.parse(localStorage.getItem(key));

const setLocal = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

const deleteLocal = (key) => localStorage.removeItem(key);

export { getLocal, setLocal, deleteLocal };
