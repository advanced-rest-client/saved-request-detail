[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/saved-request-detail.svg)](https://www.npmjs.com/package/@advanced-rest-client/saved-request-detail)

[![Build Status](https://travis-ci.org/advanced-rest-client/saved-request-detail.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/saved-request-detail)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/saved-request-detail)


# &lt;saved-request-detail&gt;

Details applet for saved request object.

## Example:

```html
<saved-request-detail
  request='{"method":"GET","name":"Demo request","legacyProject":"some-id","url":"https://api.domain.com/endpoint","created":1532573782247}'
></saved-request-detail>
```

## Usage

### Installation
```
npm install --save @advanced-rest-client/saved-request-detail
```

### In a LitElement

```js
import { LitElement, html } from 'lit-element';
import './node_modules/@advanced-rest-client/saved-request-detail/saved-request-detail.js';

class SampleElement extends LitElement {
  render() {
    return html`
    <saved-request-detail
      .request="${this.request}"
      @edit-request="${this._onEdit}"
      @delete-request="${this._onDelete}"
      @navigate="${this._onNavigate}"></saved-request-detail>
    `;
  }

  _onEdit() {
    ...
  }

  _onDelete() {
    ...
  }

  _onNavigate() {
    ...
  }
}
customElements.define('sample-element', SampleElement);
```

## Development

```sh
git clone https://github.com/advanced-rest-client/saved-request-detail
cd saved-request-detail
npm install
```

### Running the tests

```sh
npm test
```

## API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)
