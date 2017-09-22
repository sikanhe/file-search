export function debounce(f, wait) {
  let timeout;

  return (...args) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      f(...args);
      timeout = null;
    }, wait);
  };
}