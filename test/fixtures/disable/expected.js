const fn = () => {
  const arr = map([1, 2, 3], n => n + 1);

  return () => {
    "no pipe";

    arr.map(n => n | 1);
  };
};
