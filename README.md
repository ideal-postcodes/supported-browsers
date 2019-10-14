# Supported Browsers

> Matrix of supported browsers for automated javascript testing

[![CircleCI](https://circleci.com/gh/ideal-postcodes/supported-browsers.svg?style=svg)](https://circleci.com/gh/ideal-postcodes/supported-browsers)
![Dependency Status](https://david-dm.org/ideal-postcodes/supported-browsers.svg)
[![npm version](https://badge.fury.io/js/%40ideal-postcodes%2Fsupported-browsers.svg)](https://badge.fury.io/js/%40ideal-postcodes%2Fsupported-browsers)

`@ideal-postcodes/supported-browsers` exports a matrix of supported browsers

- Browser exports for [Cross Browser Testing](https://crossbrowsertesting.com)

## Links

- [Documentation](https://supported-browsers.ideal-postcodes.dev)
- [@ideal-postcodes/core-interface](https://github.com/ideal-postcodes/core-interface)
- [@ideal-postcodes/core-browser](https://github.com/ideal-postcodes/core-browser)

## Documentation

### Configuration & Usage

```bash
npm install @ideal-postcodes/supported-browsers
```

```javascript
// Retrieve tested browser matrix
import { browsers, toCbtLaunchers } from "@ideal-postcodes/supported-browsers";

// Generate CBT launchers
toCbtLaunchers(browsers, { 
  name: "core-interface",
  build: "gitsha",
});
```

## Test

```bash
npm test
```

## Licence

MIT
