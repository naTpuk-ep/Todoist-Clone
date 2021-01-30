const { parse } = JSON;

const getContents = (namespace) => {
  const value = localStorage.getItem(namespace);

  return value ? parse(value) : undefined;
};

const setContents = (namespace, value) => {
  if (typeof value === 'undefined') {
    localStorage.removeItem(namespace);
  } else {
    localStorage.setItem(namespace, JSON.stringify(value));
  }
};

export {
  getContents,
  setContents,
};