'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('stash service', function() {
  it('registered the stashes service', () => {
    assert.ok(app.service('stashes'));
  });
});
