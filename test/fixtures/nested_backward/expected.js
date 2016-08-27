(_ => filter(n => n % 2 == 0))((_ => map(_, n => addOne(n)))(array));
