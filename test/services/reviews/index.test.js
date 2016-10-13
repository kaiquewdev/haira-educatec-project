'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('reviews service', function() {
  it('registered the reviews service', () => {
    assert.ok(app.service('reviews'));
  });
});
