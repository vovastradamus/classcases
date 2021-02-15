export const pipe = (...funcs) => (value) =>
  funcs.reduce((acc, func) => func(acc), value);
