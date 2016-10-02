'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('catalog service', function() {
  it('registered the catalogs service', () => {
    assert.ok(app.service('catalogs'));
  });
});
