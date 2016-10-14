'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('v1stash service', function() {
  it('registered the v1stashes service', () => {
    assert.ok(app.service('v1stashes'));
  });
});
