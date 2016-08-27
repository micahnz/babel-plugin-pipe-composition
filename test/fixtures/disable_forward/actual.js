const fn = () => {
  const arr = [1, 2, 3] >> (_ => map(_, n => n + 1))

  return () => {
    "no pipe"

    arr.map(n => n >> 1)
  }
}
