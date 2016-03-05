# babel-plugin-pipe-operator

Overload the pipe operator (`|`) to provide Elixir/F#/Shell-like behavior

## Examples

```javascript
import { map, filter } from 'lodash';

const array = [1, 2, 3, 4, 5];

array
| map(n => n * 2)
| filter(n => n % 3 == 0);
```

## Installation

```sh
$ npm install --save-dev babel-plugin-pipe-operator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["pipe-operator"]
}
```

### Via CLI

```sh
$ babel --plugins pipe-operator script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["pipe-operator"]
});
```

# License

MIT
