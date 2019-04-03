[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/saved-request-detail.svg)](https://www.npmjs.com/package/@advanced-rest-client/saved-request-detail)

[![Build Status](https://travis-ci.org/advanced-rest-client/saved-request-detail.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/saved-request-detail)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/saved-request-detail)


# &lt;saved-request-detail&gt;

Details applet for saved request object.

## Example:

```html
<saved-request-detail request='{"method":"GET","name":"Demo request","legacyProject":"A project (collection)","url":"https://api.domain.com/endpoint","created":1532573782247}'></saved-request-detail>
```

## API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)

## Usage

### Installation
```
npm install --save @advanced-rest-client/saved-request-detail
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import './node_modules/@advanced-rest-client/saved-request-detail/saved-request-detail.js';
    </script>
  </head>
  <body>
    <saved-request-detail></saved-request-detail>
  </body>
</html>
```

### In a Polymer 3 element

```js
import {PolymerElement, html} from './node_modules/@polymer/polymer/polymer-element.js';
import './node_modules/@advanced-rest-client/saved-request-detail/saved-request-detail.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
    <saved-request-detail></saved-request-detail>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

### Installation

```sh
git clone https://github.com/advanced-rest-client/saved-request-detail
cd api-url-editor
npm install
npm install -g polymer-cli
```

### Running the demo locally

```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```
