# babel-plugin-pipe-composition

Overload the bitwise operators (`<<`) and (`>>`) to provide to provide F# like pipe forward/backward behavior

This is an alternative to [babel-plugin-pipe-operator](https://github.com/miraks/babel-plugin-pipe-operator) and [babel-plugin-pipe-operator-curry](https://github.com/miraks/babel-plugin-pipe-operator-curry) and favors the currying approach.

## Examples

```javascript
import { map, filter } from 'lodash';

const array = [1, 2, 3, 4, 5];

let result = array
  >> map(n => n * 2)
  >> filter(n => n % 3 == 0);

let result = filter(n => n % 3 == 0)
  << map(n => n * 2)
  << array;
```

## Disabling in current scope

If you want to use the original bitwise operators, you can disable this plugin in current scope (and child scopes) using `"no pipe"` directive

```javascript
const fn = () => {
  const arr = [1, 2, 3] >> map(n => n + 1);

  return () => {
    "no pipe";

    arr.map(n => n >> 1);
  };
};

const fn = () => {
  const arr =  map(n => n + 1) << [1, 2, 3];

  return () => {
    "no pipe";

    arr.map(n => 1 << n);
  };
};
```

## Installation

```sh
$ npm install --save-dev babel-plugin-pipe-composition
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["pipe-composition"]
}
```

### Via CLI

```sh
$ babel --plugins pipe-composition script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["pipe-composition"]
});
```

# License

MIT
