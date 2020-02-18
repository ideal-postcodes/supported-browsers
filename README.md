# Supported Browsers

> Matrix of supported browsers for automated javascript testing

[![CircleCI](https://circleci.com/gh/ideal-postcodes/supported-browsers.svg?style=svg)](https://circleci.com/gh/ideal-postcodes/supported-browsers)
[![npm version](https://badge.fury.io/js/%40ideal-postcodes%2Fsupported-browsers.svg)](https://badge.fury.io/js/%40ideal-postcodes%2Fsupported-browsers)
[![Release](https://github.com/ideal-postcodes/supported-browsers/workflows/npm%20Release/badge.svg)](https://github.com/ideal-postcodes/supported-browsers/actions)

`@ideal-postcodes/supported-browsers` exports a matrix of supported browsers

- Browser exports for [Saucelabs](https://saucelabs.com)

## Links

- [Documentation](https://supported-browsers.ideal-postcodes.dev)
- [@ideal-postcodes/core-interface](https://github.com/ideal-postcodes/core-interface)
- [@ideal-postcodes/core-browser](https://github.com/ideal-postcodes/core-browser)

## Documentation

### Supported Browsers

#### Latest Desktop

- Chrome
- Safari
- Firefox
- Edge

#### Latest Mobile

- Safari (iOS 13.0)
- Chrome (Android)

#### Legacy Desktop

- Internet Explorer 11
- Firefox 48
- Chrome 43

#### Legacy Mobile

- Android Browser (Android 5.1)
- Safari (iOS 10.3)

### Configuration & Usage

```bash
npm install @ideal-postcodes/supported-browsers
```

```javascript
// Retrieve tested browser matrix
import { browsers } from "@ideal-postcodes/supported-browsers";
```

## Test

```bash
npm test
```

## Licence

MIT
