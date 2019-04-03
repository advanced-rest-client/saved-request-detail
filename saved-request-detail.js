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
import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import {mixinBehaviors} from '../../@polymer/polymer/lib/legacy/class.js';
import {afterNextRender} from '../../@polymer/polymer/lib/utils/render-status.js';
import {IronResizableBehavior} from '../../@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import '../../@api-components/http-method-label/http-method-label.js';
import '../../@advanced-rest-client/date-time/date-time.js';
import '../../@advanced-rest-client/arc-icons/arc-icons.js';
import '../../@polymer/paper-button/paper-button.js';
import '../../@polymer/iron-icon/iron-icon.js';
import '../../@polymer/marked-element/marked-element.js';
import '../../@advanced-rest-client/markdown-styles/markdown-styles.js';
import '../../@advanced-rest-client/paper-chip/paper-chip.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
/**
 * Details applet for saved request object.
 *
 * If the request is a history item the set `isHistory` property to `true`.
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
 * @polymer
 * @customElement
 * @memberof UiElements
 * @demo demo/index.html
 * @appliesMixin Polymer.IronResizableBehavior
 */
class SavedRequestDetail extends
  mixinBehaviors([IronResizableBehavior], PolymerElement) {
  static get template() {
    return html`
    <style include="markdown-styles"></style>
    <style>
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

    .actions paper-button {
      color: var(--saved-request-detail-action-button-color, var(--primary-color));
      background-color: var(--saved-request-detail-action-button-background-color);
      padding-left: 12px;
      padding-right: 12px;
    }

    paper-button iron-icon {
      margin-right: 12px;
      color: var(--saved-request-detail-action-icon-color, rgba(0, 0, 0, 0.54));
    }

    marked-element {
      margin-top: 20px;
    }

    .project-link {
      color: var(--arc-link-color, #00A1DF);
    }

    paper-chip {
      cursor: pointer;
    }

    paper-chip[disabled] {
      --paper-chip-container: {
        border: 1px var(--error-color) solid;
      };
    }
    </style>
    <template is="dom-if" if="[[isHistory]]">
      <h2>Request details</h2>
    </template>
    <template is="dom-if" if="[[!isHistory]]">
      <h2>[[request.name]]</h2>
    </template>
    <div class="address-detail">
      <http-method-label method="[[request.method]]"></http-method-label>
      <span class="url-label">[[request.url]]</span>
    </div>
    <template is="dom-if" if="[[request.description]]">
      <marked-element markdown="[[request.description]]">
        <div class="markdown-html markdown-body description"></div>
      </marked-element>
    </template>

    <template is="dom-if" if="[[request.created]]">
      <div class="meta-row">
        <div class="label">
          Created
        </div>
        <div class="value">
          <date-time date="[[request.created]]" year="numeric" month="numeric" day="numeric" hour="numeric" minute="numeric"></date-time>
        </div>
      </div>
    </template>

    <template is="dom-if" if="[[_computeHasUpdated(request.updated, request.created)]]">
      <div class="meta-row">
        <div class="label">
          Updated
        </div>
        <div class="value">
          <date-time date="[[request.updated]]" year="numeric" month="numeric" day="numeric" hour="numeric" minute="numeric"></date-time>
        </div>
      </div>
    </template>

    <template is="dom-if" if="[[request.driveId]]">
      <div class="meta-row">
        <div class="label">
          Drive file
        </div>
        <div class="value">
          [[request.driveId]]
        </div>
      </div>
    </template>
    <template is="dom-if" if="[[_projects]]">
      <div class="meta-row">
        <div class="label">
          Projects
        </div>
        <div class="value">
          <template is="dom-repeat" items="[[_projects]]">
            <paper-chip disabled\$="[[item.missing]]" title="Open project details" on-click="_openProject" data-action="open-project">[[item.name]]</paper-chip>
          </template>
        </div>
      </div>
    </template>
    <div class="actions">
      <template is="dom-if" if="[[isSaved]]">
        <paper-button on-click="_deleteRequest" data-action="delete-request" title="Removes request from the data store">
          <iron-icon icon="arc:delete"></iron-icon>
          Delete
        </paper-button>
      </template>
      <paper-button on-click="_editRequest" data-action="edit-request" title="Opens request editor">
        <iron-icon icon="arc:edit"></iron-icon>
        Edit
      </paper-button>
    </div>
`;
  }

  static get properties() {
    return {
      // Request object to render.
      request: {
        type: Object,
        observer: '_requestChanged'
      },
      // True if current item represent a history item.
      isHistory: {
        type: Boolean,
        value: false
      },
      /**
       * Projects data associated with the request.
       * @type {Array<Object>}
       */
      _projects: Array,
      /**
       * Computed value, true if the request has been saved in the data store
       * whether it's saved or history.
       * Because request object can have `_id` generated before saving it to
       * the store this relays on checking both `_id` and `_rev`
       */
      isSaved: {
        type: Boolean,
        value: false,
        computed: '_computeIsSaved(request)'
      }
    };
  }
  /**
   * Dispatches bubbling and composed custom event.
   * By default the event is cancelable until `cancelable` property is set to false.
   * @param {String} type Event type
   * @param {?any} detail A detail to set
   * @return {CustomEvent}
   */
  _dispatch(type, detail) {
    const e = new CustomEvent(type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail
    });
    this.dispatchEvent(e);
    return e;
  }
  /**
   * Disaptches `project-model-query` custom event.
   * @param {Array<String>} keys List of project IDs to retreive.
   * @return {CustomEvent}
   */
  _disaptchQueryModel(keys) {
    return this._dispatch('project-model-query', {
      keys
    });
  }
  /**
   * Sets project data when `request` object change.
   *
   * @param {Object} request
   */
  _requestChanged(request) {
    this._projects = undefined;
    if (!request) {
      return;
    }
    if (request.projects) {
      this._readProjects(request.projects);
    } else if (request.legacyProject) {
      this._readProjects([request.legacyProject]);
    }
  }
  /**
   * Reads related project data.
   * @param {Array<String>} keys List of project IDs to read.
   * @return {Promise}
   */
  _readProjects(keys) {
    if (!keys || !keys.length) {
      this._projects = undefined;
      return Promise.resolve();
    }
    const e = this._disaptchQueryModel(keys);
    if (!e.defaultPrevented) {
      console.warn('Project model not in the DOM.');
      return Promise.reject(new Error('Model not found'));
    }
    return e.detail.result
    .then((data) => {
      this._projects = this._processProjectsResponse(data, keys);
      afterNextRender(this, () => this.notifyResize());
    });
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
   * @return {CustomEvent} Sent `navigate` event
   */
  _openProject(e) {
    e.preventDefault();
    e.stopPropagation();
    const id = e.model.get('item._id');
    return this._dispatch('navigate', {
      base: 'project',
      id
    });
  }
  /**
   * Sends non-bubbling `delete-request` event to the parent element to perform
   * delete action.
   */
  _deleteRequest() {
    this.dispatchEvent(new CustomEvent('delete-request', {
      composed: true,
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
      composed: true,
      detail: {
        item: this.request
      }
    }));
  }

  _computeHasUpdated(updated, created) {
    if (!updated) {
      return false;
    }
    return updated !== created;
  }
  /**
   * Computes value for `isSaved` property.
   * @param {Object} request Passed request object
   * @return {Boolean} True if request has both `_id` and `_rev`.
   */
  _computeIsSaved(request) {
    if (!request) {
      return false;
    }
    return !!(request._id && request._rev);
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
window.customElements.define('saved-request-detail', SavedRequestDetail);
