const fn = () => {
  const arr = [1, 2, 3] | map(n => n + 1)

  return () => {
    "no pipe"

    arr.map(n => n | 1)
  }
}
