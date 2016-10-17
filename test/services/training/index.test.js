'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('training service', function() {
  it('registered the trainings service', () => {
    assert.ok(app.service('trainings'));
  });
});
