/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import { LitElement, html, css } from 'lit-element';
import { ArcResizableMixin } from '@advanced-rest-client/arc-resizable-mixin/arc-resizable-mixin.js';
import markdownStyles from '@advanced-rest-client/markdown-styles/markdown-styles.js';
import '@api-components/http-method-label/http-method-label.js';
import '@advanced-rest-client/date-time/date-time.js';
import { deleteIcon, edit } from '@advanced-rest-client/arc-icons/ArcIcons.js';
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
import '@advanced-rest-client/arc-marked/arc-marked.js';
import '@anypoint-web-components/anypoint-chip/anypoint-chip.js';
import '@advanced-rest-client/arc-models/project-model.js';
/**
 * Details applet for saved request object.
 *
 * The applet doesn't support data edit. Element / app hosting this element
 * must handle events sent by this element and support edit action.
 *
 * ### Example
 *
 * ```html
 * <saved-request-detail request="{...}"></saved-request-detail>
 * ```
 *
 * ### Styling
 *
 * `<saved-request-detail>` provides the following custom properties and
 * mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--saved-request-detail-color` | Color of the element | `inherit`
 * `--saved-request-detail-background-color` | Background color of the element | `inherit`
 * `--saved-request-detail-padding` | Padding of the element. | ``
 * `--saved-request-detail-description-max-width` | Max width of the description element | `700px`
 * `--saved-request-detail-description-color` | Color of the request description | `rgba(0, 0, 0, 0.64)`
 * `--saved-request-detail-action-icon-color` | Color of the icon in the action button | `rgba(0, 0, 0, 0.54)`
 * `--saved-request-detail-data-list-color` | Color of propery items | `rgba(0, 0, 0, 0.87)`,
 * `--saved-request-detail-action-button-color` | Color of action button | `--primary-color`
 * `--saved-request-detail-action-button-background-color` | Background color of action button | ``
 *
 * @customElement
 * @memberof UiElements
 * @demo demo/index.html
 * @appliesMixin Polymer.IronResizableBehavior
 */
export class SavedRequestDetail extends ArcResizableMixin(LitElement) {
  static get styles() {
    return [
      markdownStyles,
      css`
      :host {
        display: block;
        color: var(--saved-request-detail-color, inherit);
        background-color: var(--saved-request-detail-background-color, inherit);
        padding: var(--saved-request-detail-padding);
        box-sizing: border-box;
        font-size: var(--arc-font-body1-font-size);
        font-weight: var(--arc-font-body1-font-weight);
        line-height: var(--arc-font-body1-line-height);
      }

      h2 {
        font-size: var(--arc-font-headline-font-size);
        font-weight: var(--arc-font-headline-font-weight);
        letter-spacing: var(--arc-font-headline-letter-spacing);
        line-height: var(--arc-font-headline-line-height);
      }

      .address-detail {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .url-label {
        font-size: 16px;
        white-space: var(--arc-font-nowrap-white-space);
        overflow: var(--arc-font-nowrap-overflow);
        text-overflow: var(--arc-font-nowrap-text-overflow);
      }

      http-method-label {
        font-size: 13px;
        margin-right: 12px;
        padding: 8px;
      }

      .description {
        max-width: var(--saved-request-detail-description-max-width, 700px);
        color: var(--saved-request-detail-description-color, rgba(0, 0, 0, 0.64));
      }

      .meta-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: var(--saved-request-detail-data-list-color, rgba(0, 0, 0, 0.87));
        height: 40px;
      }

      .meta-row .label {
        width: 160px;
      }

      .meta-row .value {
        white-space: var(--arc-font-nowrap-white-space);
        overflow: var(--arc-font-nowrap-overflow);
        text-overflow: var(--arc-font-nowrap-text-overflow);
      }

      .actions {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: 20px;
      }

      .actions anypoint-button {
        padding-left: 12px;
        padding-right: 12px;
      }

      anypoint-button .icon {
        margin-right: 12px;
        fill: var(--saved-request-detail-action-icon-color, rgba(0, 0, 0, 0.54));
        display: inline-block;
        width: 24px;
        height: 24px;
      }

      marked-element {
        margin-top: 20px;
      }

      .project-link {
        color: var(--arc-link-color, #00A1DF);
      }

      anypoint-chip {
        cursor: pointer;
      }

      anypoint-chip[disabled] {
        --anypoint-chip-border: 1px var(--error-color) solid;
      }
      `
    ];
  }

  _titleTemplate(request) {
    const title = request.name || 'Request details'
    return html`<h2 id="title">${title}</h2>`;
  }

  _addressTemplate(request) {
    if (!request.method) {
      return;
    }
    return html`<div class="address-detail">
      <http-method-label method="${request.method}"></http-method-label>
      <span class="url-label">${request.url || ''}</span>
    </div>`;
  }

  _descriptionTemplate(request) {
    if (!request.description) {
      return '';
    }
    return html`<arc-marked markdown="${request.description}" sanitize>
      <div class="markdown-html markdown-body description"></div>
    </arc-marked>`;
  }

  _timeTemplate(label, value, other) {
    if (!value || value === other) {
      return;
    }
    return html`<div class="meta-row">
      <div class="label">
        ${label}
      </div>
      <div class="value">
        <date-time
          .date="${value}"
          year="numeric"
          month="numeric"
          day="numeric"
          hour="numeric"
          minute="numeric"></date-time>
      </div>
    </div>`;
  }

  _driveTemplate(request) {
    if (!request.driveId) {
      return '';
    }
    return html`<div class="meta-row">
      <div class="label">
        Drive file
      </div>
      <div class="value">
        ${request.driveId}
      </div>
    </div>`;
  }

  _projectsTemplate() {
    const _projects = this._projects;
    if (!_projects || !_projects.length) {
      return;
    }
    const { compatibility } = this;
    return html`<div class="meta-row">
      <div class="label">
        Projects
      </div>
      <div class="value">
      ${_projects.map((item, index) => html`
        <anypoint-chip
          ?disabled="${item.missing}"
          title="Open project details"
          @click="${this._openProject}"
          data-index="${index}"
          data-action="open-project"
          ?compatibility="${compatibility}">${item.name}</anypoint-chip>`)}
      </div>
    </div>`;
  }

  _deleteButtonTemplate() {
    if (!this._isSaved) {
      return '';
    }
    return html`<anypoint-button
      @click="${this._deleteRequest}"
      data-action="delete-request"
      title="Removes request from the data store"
      aria-label="Activate to remove the request"
      ?compatibility="${this.compatibility}"
    >
      <span class="icon">${deleteIcon}</span>
      Delete
    </anypoint-button>`;
  }

  _actionsTemplate() {
    return html`
    ${this._deleteButtonTemplate()}
    <anypoint-button
      @click="${this._editRequest}"
      data-action="edit-request"
      title="Opens request editor"
      aria-label="Activate to edit request"
      ?compatibility="${this.compatibility}"
    >
      <span class="icon">${edit}</span>
      Edit
    </anypoint-button>
    `;
  }

  _modelTemplate() {
    return html`<project-model></project-model>`;
  }

  render() {
    const request = this.request || {};
    return html`
    ${this._modelTemplate()}
    ${this._titleTemplate(request)}
    ${this._addressTemplate(request)}
    ${this._descriptionTemplate(request)}
    ${this._timeTemplate('Created', request.created)}
    ${this._timeTemplate('Updated', request.updated, request.created)}
    ${this._driveTemplate(request)}
    ${this._projectsTemplate()}
    <div class="actions">
      ${this._actionsTemplate()}
    </div>`;
  }

  static get properties() {
    return {
      // Request object to render.
      request: { type: Object },
      /**
       * Enables compatibility with Anypoint platform
       */
      compatibility: { type: Boolean },
      /**
       * Projects data associated with the request.
       * @type {Array<Object>}
       */
      _projects: Array
    };
  }

  get request() {
    return this._request;
  }

  set request(value) {
    const old = this._request;
    if (old === value) {
      return;
    }
    this._request = value;
    this.requestUpdate('request', old);
    this._requestChanged(value);
  }
  /**
   * Computed value, true if the request has been saved in the data store
   * whether it's saved or history.
   * Because request object can have `_id` generated before saving it to
   * the store this relays on checking both `_id` and `_rev`
   */
  get _isSaved() {
    const { request } = this;
    if (!request) {
      return false;
    }
    return !!(request._id && request._rev);
  }

  get projectModel() {
    if (!this.__projectModel) {
      this.__projectModel = this.shadowRoot.querySelector('project-model');
    }
    return this.__projectModel;
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this.setAttribute('role', 'dialog');
    this.setAttribute('aria-label', 'Request details dialog');
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
    this.__projectModel = null;
  }

  firstUpdated() {
    if (this.request) {
      this._requestChanged(this.request);
    }
  }

  /**
   * Sets project data when `request` object change.
   *
   * @param {Object} request
   */
  async _requestChanged(request) {
    this._projects = undefined;
    if (!request) {
      return;
    }
    let keys;
    if (request.projects) {
      keys = request.projects;
    } else if (request.legacyProject) {
      keys = [request.legacyProject];
    }
    if (keys) {
      await this._readProjects(keys);
    }
  }
  /**
   * Reads related project data.
   * @param {Array<String>} keys List of project IDs to read.
   * @return {Promise}
   */
  async _readProjects(keys) {
    if (!keys || !keys.length) {
      this._projects = undefined;
      return;
    }
    const model = this.projectModel;
    if (!model) {
      // The element is initializing. Once upgraded it will re-query.
      return;
    }
    const data = await model.listProjects(keys);
    this._projects = this._processProjectsResponse(data, keys);
    setTimeout(() => this.notifyResize());
  }
  /**
   * Processes query response from the model.
   * @param {?Array<Object>} data The response
   * @param {Array<String>} keys Requested keys
   * @return {Array<Object>|undefined} Processed response or undefined.
   */
  _processProjectsResponse(data, keys) {
    if (!data || !data.length) {
      return;
    }
    return data.map((item, i) => {
      if (!item) {
        item = {
          missing: true,
          name: keys[i]
        };
      } else {
        item.missing = false;
      }
      return item;
    });
  }
  /**
   * Sends `navigate` event set to current read project.
   *
   * @param {ClickEvent} e
   */
  _openProject(e) {
    e.preventDefault();
    e.stopPropagation();
    const index = Number(e.currentTarget.dataset.index);
    const id = this._projects[index]._id;
    this.dispatchEvent(new CustomEvent('navigate', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        base: 'project',
        id
      }
    }));
  }
  /**
   * Sends non-bubbling `delete-request` event to the parent element to perform
   * delete action.
   */
  _deleteRequest() {
    this.dispatchEvent(new CustomEvent('delete-request', {
      detail: {
        item: this.request
      }
    }));
  }

  /**
   * Sends non-bubbling `edit-request` event to the parent element to perform
   * edit action.
   */
  _editRequest() {
    this.dispatchEvent(new CustomEvent('edit-request', {
      detail: {
        item: this.request
      }
    }));
  }
  /**
   * Fired when the user click on the "edit" action button.
   *
   * This event does not bubbles.
   *
   * @event edit-request
   * @param {Object} item The request object
   */
  /**
   * Fired when the user click on the "delete" action button.
   *
   * This event does not bubbles.
   *
   * @event delete-request
   * @param {Object} item The request object
   */
  /**
   * Fired when the user opens the project item.
   *
   * This event can be fired only if the request has a project.
   *
   * @event navigate
   * @param {String} base Always `project`
   * @param {String} id Project ID
   */
}
