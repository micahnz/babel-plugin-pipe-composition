[![github tag](https://img.shields.io/github/tag/michaelmitchell/babel-plugin-pipe-composition.svg?maxAge=2592000)]()
[![npm version](https://badge.fury.io/js/babel-plugin-pipe-composition.svg)](https://badge.fury.io/js/babel-plugin-pipe-composition)
[![npm license](https://img.shields.io/npm/l/babel-plugin-pipe-composition.svg?maxAge=2592000)]()
[![build status](https://travis-ci.org/michaelmitchell/babel-plugin-pipe-composition.svg?branch=master)](https://travis-ci.org/michaelmitchell/babel-plugin-pipe-composition)
[![known vulnerabilities](https://snyk.io/test/npm/babel-plugin-pipe-composition/badge.svg)](https://snyk.io/test/npm/babel-plugin-pipe-composition)

# babel-plugin-pipe-composition

Overload the bitwise operators (`<<`) and (`>>`) to provide F# like pipe forward/backward behavior.

This is an alternative to [babel-plugin-pipe-operator](https://github.com/miraks/babel-plugin-pipe-operator) and [babel-plugin-pipe-operator-curry](https://github.com/Swizz/babel-plugin-pipe-operator-curry) and favours the currying approach instead of using the first callable argument.

## Examples

```javascript
import { mean, round } from 'lodash';

const array = [1, 2, 3, 4, 5];

// regular javascript
round(mean(array));

// typical composition helpers
pipe(mean, round)(array);
compose(round, mean)(array);

// composition with pipe operators
array
 >> mean
 >> round

round
  << mean
  << array
```

```javascript
import { map, filter } from 'ramda';

const array = [1, 2, 3, 4, 5];

// regular javascript
filter(n => n % 3 == 0)(map(n => n * 2)(array))

// typical composition with javascript
pipe(map(n => n * 2), filter(n => n % 3 == 0))(array);
compose(filter(n => n % 3 == 0), map(n => n * 2))(array);

// composition with pipe operators
let result = array
  >> map(n => n * 2)
  >> filter(n => n % 3 == 0);

let result = filter(n => n % 3 == 0)
  << map(n => n * 2)
  << array;
```

## Disabling in current scope

If you want to use the original bitwise operators, you can disable this plugin in current scope (and child scopes) using the `"no pipe"` directive.

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
