export function getKeyFromLs(key, defaultValue) {
  return new Promise((resolve) => {
    const result = localStorage.getItem(key);
    if (result) {
      try {
        const parsed = JSON.parse(result);
        resolve(parsed);
      } catch (e) {
        resolve(result);
      }
    }
    resolve(defaultValue);
  });
}

export function setItemToLS(key, value) {
  return new Promise((resolve) => {
    localStorage.setItem(key, JSON.stringify(value));
    resolve();
  });
}
