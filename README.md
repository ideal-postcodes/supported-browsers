# Supported Browsers

> Matrix of supported browsers for automated javascript testing

[![npm version](https://badge.fury.io/js/%40ideal-postcodes%2Fsupported-browsers.svg)](https://badge.fury.io/js/%40ideal-postcodes%2Fsupported-browsers)
![Release](https://github.com/ideal-postcodes/supported-browsers/workflows/Release/badge.svg)
![CI](https://github.com/ideal-postcodes/supported-browsers/workflows/CI/badge.svg)

`@ideal-postcodes/supported-browsers` exports a matrix of supported browsers

## Documentation

Browser exports for [Saucelabs](https://saucelabs.com)

### Supported Browsers

#### Latest Desktop

- Chrome
- Safari
- Firefox
- Edge

#### Latest Mobile

- Safari (iOS)
- Chrome (Android)

#### Legacy Desktop

- Internet Explorer 11

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
