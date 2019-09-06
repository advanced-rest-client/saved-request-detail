import { fixture, assert, html } from '@open-wc/testing';
import * as sinon from 'sinon/pkg/sinon-esm.js';
import { DataGenerator } from '@advanced-rest-client/arc-data-generator/arc-data-generator.js';
// import * as MockInteractions from '@polymer/iron-test-helpers/mock-interactions.js';
import '../saved-request-detail.js';

describe('<saved-request-detail>', function() {
  async function projectFixture(request, ids) {
    if (ids) {
      request.projects = ids;
    }
    const element = await fixture(html`<saved-request-detail></saved-request-detail>`);
    element._request = request;
    await element._requestChanged(request);
    return element;
  }

  async function basicFixture() {
    return await fixture(html`<saved-request-detail></saved-request-detail>`);
  }

  let project;
  before(async () => {
    const data = await DataGenerator.insertProjectsData({
      projectsSize: 1
    });
    project = data[0];
  });

  after(async () => {
    await DataGenerator.destroySavedRequestData();
  });

  describe('basics', () => {
    it('reads project data', async () => {
      const request = DataGenerator.generateSavedItem({});
      const element = await projectFixture(request, [project._id]);
      assert.typeOf(element._projects, 'array');
      const p = element._projects[0];
      assert.typeOf(p.name, 'string', 'Project has name');
      assert.isFalse(p.missing, 'Project is not missing');
    });

    it('reads legacy project data', async () => {
      const request = DataGenerator.generateSavedItem({});
      request.legacyProject = project._id;
      const element = await projectFixture(request);
      assert.typeOf(element._projects, 'array');
    });

    it('Keeps non exiting project on the list', async () => {
      const request = DataGenerator.generateSavedItem({});
      const element = await projectFixture(request, [project._id, 'non-exiting']);
      assert.typeOf(element._projects, 'array', 'Projects is computed');
      assert.lengthOf(element._projects, 2, 'Has 2 projects on the list');
      const p = element._projects[1];
      assert.equal(p.name, 'non-exiting', 'Non exiting project has name');
      assert.isTrue(p.missing, 'Non exiting project is missing');
    });

    it('Fires navigate event for project', async () => {
      const request = DataGenerator.generateSavedItem({});
      const element = await projectFixture(request, [project._id]);
      const node = element.shadowRoot.querySelector('[data-action="open-project"]');
      const spy = sinon.spy();
      element.addEventListener('navigate', spy);
      assert.ok(node, 'Has project open button');
      node.click();
      assert.isTrue(spy.called);
    });

    it('Renders delete button when saved', async () => {
      const request = DataGenerator.generateSavedItem({});
      request._rev = 'test';
      const element = await projectFixture(request, [project._id]);
      const node = element.shadowRoot.querySelector('[data-action="delete-request"]');
      assert.ok(node);
    });

    it('Fires delete-request event', async () => {
      const request = DataGenerator.generateSavedItem({});
      request._rev = 'test';
      const element = await projectFixture(request, [project._id]);
      let eventData;
      element.addEventListener('delete-request', function(e) {
        eventData = e.detail;
        assert.isFalse(e.bubbles);
      });
      const node = element.shadowRoot.querySelector('[data-action="delete-request"]');
      node.click();
      assert.typeOf(eventData, 'object');
      assert.typeOf(eventData.item, 'object');
    });

    it('Fires edit-request event', async () => {
      const request = DataGenerator.generateSavedItem({});
      request._rev = 'test';
      const element = await projectFixture(request, [project._id]);
      let eventData;
      element.addEventListener('edit-request', function(e) {
        eventData = e.detail;
        assert.isFalse(e.bubbles);
      });
      const node = element.shadowRoot.querySelector('[data-action="edit-request"]');
      node.click();
      assert.typeOf(eventData, 'object');
      assert.typeOf(eventData.item, 'object');
    });
  });

  describe('_processProjectsResponse()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns undefined when no argument', () => {
      const result = element._processProjectsResponse();
      assert.isUndefined(result);
    });

    it('Returns undefined when empty array', () => {
      const result = element._processProjectsResponse([]);
      assert.isUndefined(result);
    });

    it('Returns array of items', () => {
      const result = element._processProjectsResponse([{ _id: 'test' }]);
      assert.typeOf(result, 'array');
      assert.lengthOf(result, 1);
    });

    it('Adds "missing" property with false to an existing item', () => {
      const result = element._processProjectsResponse([{}]);
      assert.isFalse(result[0].missing);
    });

    it('Adds "missing" property with true to empty item', () => {
      const result = element._processProjectsResponse([undefined], ['test']);
      assert.isTrue(result[0].missing);
    });

    it('Adds "name" property to empty item', () => {
      const result = element._processProjectsResponse([undefined], ['test']);
      assert.equal(result[0].name, 'test');
    });
  });

  describe('_readProjects()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Sets `_projects` to `undefined` when no argument', async () => {
      element._projects = [];
      await element._readProjects();
      assert.isUndefined(element._projects);
    });

    it('Sets _projects property', async () => {
      await element._readProjects([project._id])
      assert.typeOf(element._projects, 'array');
      assert.lengthOf(element._projects, 1);
    });
  });

  describe('_requestChanged()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Sets `_projects` to `undefined` when no argument', async () => {
      element._projects = [];
      await element._requestChanged();
      assert.isUndefined(element._projects);
    });

    it('reads project data', async () => {
      await element._requestChanged({
        projects: [project._id]
      })
      assert.typeOf(element._projects, 'array');
      assert.lengthOf(element._projects, 1);
    });
  });
});
