export const debounce = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
