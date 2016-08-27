const fn = () => {
  const arr = (_ => map(_, n => n + 1))([1, 2, 3]);

  return () => {
    "no pipe";

    arr.map(n => n << 1);
  };
};
